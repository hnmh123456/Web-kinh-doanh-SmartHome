import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import initializeDb from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'smarthome_super_secret_key_123';

// Initialize DB and start server
initializeDb().then(pool => {
    // --- AUTH ROUTES ---
    app.post('/api/auth/register', async (req, res) => {
        try {
            const { username, password, phone } = req.body;
            if (!username || !password || !phone) return res.status(400).json({ error: 'Missing fields' });

            const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            if (existing.length > 0) return res.status(400).json({ error: 'Username already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'INSERT INTO users (username, password, phone, role) VALUES (?, ?, ?, ?)',
                [username, hashedPassword, phone, 'user']
            );
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.post('/api/auth/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            if (users.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

            const user = users[0];
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
            res.json({ token, user: { id: user.id, username: user.username, phone: user.phone, role: user.role } });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    const verifyAdmin = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: 'No token provided' });
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err || decoded.role !== 'admin') return res.status(403).json({ error: 'Unauthorized. Admin only.' });
            req.user = decoded;
            next();
        });
    };

    const verifyManagerOrAdmin = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: 'No token provided' });
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err || (decoded.role !== 'admin' && decoded.role !== 'manager')) {
                return res.status(403).json({ error: 'Unauthorized. Managers/Admins only.' });
            }
            req.user = decoded;
            next();
        });
    };

    // --- PRODUCTS ROUTES (Public Read, Manager/Admin Write) ---
    app.get('/api/products', async (req, res) => {
        try {
            const [products] = await pool.query('SELECT * FROM products ORDER BY id DESC');
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.get('/api/products/:id', async (req, res) => {
        try {
            const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
            if (product.length === 0) return res.status(404).json({ error: 'Not found' });
            res.json(product[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.post('/api/products', verifyManagerOrAdmin, async (req, res) => {
        try {
            const { name, description, price, image } = req.body;
            const [result] = await pool.query(
                'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
                [name, description, price, image || '']
            );
            const [newProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
            res.status(201).json(newProduct[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.put('/api/products/:id', verifyManagerOrAdmin, async (req, res) => {
        try {
            const { name, description, price, image } = req.body;
            await pool.query(
                'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?',
                [name, description, price, image || '', req.params.id]
            );
            res.json({ message: 'Product updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.delete('/api/products/:id', verifyManagerOrAdmin, async (req, res) => {
        try {
            await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
            res.json({ message: 'Product deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // --- USERS ROUTES (Admin Only) ---
    app.get('/api/users', verifyAdmin, async (req, res) => {
        try {
            const [users] = await pool.query('SELECT id, username, phone, role, created_at FROM users ORDER BY id DESC');
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.put('/api/users/:id', verifyAdmin, async (req, res) => {
        try {
            const { username, phone, role } = req.body;
            await pool.query(
                'UPDATE users SET username = ?, phone = ?, role = ? WHERE id = ?',
                [username, phone, role, req.params.id]
            );
            res.json({ message: 'User updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.delete('/api/users/:id', verifyAdmin, async (req, res) => {
        try {
            await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // --- VOUCHERS ROUTES (Admin Only) ---
    app.get('/api/vouchers', verifyAdmin, async (req, res) => {
        try {
            const [vouchers] = await pool.query('SELECT * FROM vouchers ORDER BY id DESC');
            res.json(vouchers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.post('/api/vouchers', verifyAdmin, async (req, res) => {
        try {
            const { code, discount_percent, description } = req.body;
            const [result] = await pool.query(
                'INSERT INTO vouchers (code, discount_percent, description) VALUES (?, ?, ?)',
                [code, discount_percent, description]
            );
            const [newVoucher] = await pool.query('SELECT * FROM vouchers WHERE id = ?', [result.insertId]);
            res.status(201).json(newVoucher[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.put('/api/vouchers/:id', verifyAdmin, async (req, res) => {
        try {
            const { code, discount_percent, description } = req.body;
            await pool.query(
                'UPDATE vouchers SET code = ?, discount_percent = ?, description = ? WHERE id = ?',
                [code, discount_percent, description, req.params.id]
            );
            res.json({ message: 'Voucher updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.delete('/api/vouchers/:id', verifyAdmin, async (req, res) => {
        try {
            await pool.query('DELETE FROM vouchers WHERE id = ?', [req.params.id]);
            res.json({ message: 'Voucher deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
