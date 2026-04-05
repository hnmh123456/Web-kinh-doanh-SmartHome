import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const { register, user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user) return <Navigate to="/" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password, phone);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="flex-center">
            <div className="form-container">
                <h2 className="title" style={{ textAlign: 'center' }}>Create Account</h2>
                <p className="subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Join the Smarthome platform</p>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="johndoe"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            className="input-field"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="0123456789"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
                        <UserPlus size={18} /> Register
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 500 }}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
