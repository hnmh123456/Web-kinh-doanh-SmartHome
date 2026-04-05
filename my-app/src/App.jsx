import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { LogOut, ShieldAlert, Search, Phone, Mail, LayoutDashboard } from 'lucide-react';

import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/Home';
import AdminDashboard from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={14} /> 1800 6868
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={14} /> info@smarthomenest.vn
            </span>
          </div>
          <div>Việt Nam | VNĐ</div>
        </div>
      </div>
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" className="nav-brand">
            <div style={{ background: '#007BFF', borderRadius: '4px', padding: '2px' }}>
              <LayoutDashboard size={22} color="white" />
            </div>
            SmartNest
          </Link>

          <div className="nav-links">
            <Link to="/" className="nav-link">Trang chủ</Link>
            <Link to="#" className="nav-link">Sản phẩm</Link>
            <Link to="#" className="nav-link">Giải pháp</Link>
            <Link to="#" className="nav-link">Bảng giá</Link>
            <Link to="#" className="nav-link">Tin tức</Link>
          </div>

          <div className="nav-actions">
            <Search size={20} style={{ cursor: 'pointer', color: '#94A3B8' }} />
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {['admin', 'manager'].includes(user.role) && (
                  <Link to="/admin" className="btn-primary badge" style={{ padding: '0.4rem 0.8rem' }}>
                    <ShieldAlert size={16} /> Admin
                  </Link>
                )}
                <span style={{ fontSize: '0.9rem', color: '#FFFFFF' }}>Hi, {user.username}</span>
                <button onClick={logout} className="btn" style={{ padding: '0.5rem', border: 'none', background: 'transparent' }}>
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Đăng nhập</Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />
          <Route path="/checkout/:id" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
