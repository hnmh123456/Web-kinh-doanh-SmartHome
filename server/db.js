import mysql from 'mysql2/promise';

import dotenv from 'dotenv';
dotenv.config();

// Initial connection without database to create it if it doesn't exist
const initializeDb = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'smarthome_db'}\`;`);
    await connection.end();

    console.log('Database checked/created successfully.');

    // Now connect to the actual database
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'smarthome_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Alter users table to add manager role if not exists
    try {
      await pool.query("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'manager', 'user') DEFAULT 'user'");
      console.log('Role column updated to include manager.');
    } catch (e) {
      console.error('Error altering role column:', e.message);
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role ENUM('admin', 'manager', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS vouchers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        discount_percent INT NOT NULL,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Tables checked/created successfully.');

    // Insert dummy admin if no users exist
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM users');
    if (rows[0].count === 0) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.default.hash('123456', 10);
      await pool.query('INSERT INTO users (username, password, phone, role) VALUES (?, ?, ?, ?)', ['admin', hashedPassword, '0123456789', 'admin']);

      const managerPassword = await bcrypt.default.hash('123456', 10);
      await pool.query('INSERT INTO users (username, password, phone, role) VALUES (?, ?, ?, ?)', ['manager', managerPassword, '0987654321', 'manager']);

      // insert sample products
      await pool.query(`
        INSERT INTO products (name, description, price, image) VALUES 
        ('Smart LED Bulb', 'Wi-Fi enabled smart LED bulb with 16 million colors.', 15.99, 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400&auto=format&fit=crop'),
        ('Smart Plug', 'Control your appliances from anywhere using your smartphone.', 20.50, 'https://images.unsplash.com/photo-1558002038-1bc32204caba?q=80&w=400&auto=format&fit=crop'),
        ('Smart Lock', 'Keyless entry door lock with fingerprint and passcode.', 149.99, 'https://images.unsplash.com/photo-1558002038-db4acbcbc3bf?q=80&w=400&auto=format&fit=crop'),
        ('Smart Thermostat', 'Energy saving thermostat with voice control.', 199.00, 'https://images.unsplash.com/photo-1585807955562-520e7d942fb8?q=80&w=400&auto=format&fit=crop')
      `);
      console.log('Sample data inserted.');
    }

    return pool;
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

export default initializeDb;
