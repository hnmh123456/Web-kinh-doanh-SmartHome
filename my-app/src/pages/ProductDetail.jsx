import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ShoppingBag, ArrowLeft, ShieldCheck, Zap, Globe } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError('Không tìm thấy sản phẩm');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="flex-center" style={{ minHeight: '60vh' }}>Đang tải...</div>;
    if (error || !product) return <div className="flex-center error-msg" style={{ minHeight: '60vh' }}>{error || 'Lỗi'}</div>;

    return (
        <div style={{ background: '#0C1222', minHeight: '100vh', paddingTop: '4rem' }}>
            <div className="container">
                <Link to="/" className="btn" style={{ marginBottom: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8' }}>
                    <ArrowLeft size={18} /> Quay lại trang chủ
                </Link>

                <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', padding: '3rem' }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src={product.image || 'https://images.unsplash.com/photo-1558002038-1bc32204caba?q=80&w=400&auto=format&fit=crop'}
                            alt={product.name}
                            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                        />
                        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }} className="badge bg-blue">Premium</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ color: '#007BFF', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>Smart Home Solution</div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 700, lineHeight: 1.1 }}>{product.name}</h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00D1FF' }}>${Number(product.price).toFixed(2)}</div>
                            <div style={{ color: '#94A3B8', textDecoration: 'line-through', fontSize: '1.2rem' }}>${(Number(product.price) * 1.2).toFixed(2)}</div>
                        </div>

                        <p style={{ color: '#94A3B8', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                            {product.description || "Giải pháp công nghệ tiên tiến nhất từ SmartNest, mang lại sự tiện nghi và an toàn tuyệt đối cho ngôi nhà của bạn. Sản phẩm được bảo hành chính hãng 24 tháng."}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#E2E8F0' }}>
                                <ShieldCheck size={20} color="#007BFF" /> <span>Bảo hành 2 năm</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#E2E8F0' }}>
                                <Zap size={20} color="#FFD700" /> <span>Tiết kiệm điện</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#E2E8F0' }}>
                                <Globe size={20} color="#00D1FF" /> <span>Hỗ trợ 24/7</span>
                            </div>
                        </div>

                        {user?.role === 'user' ? (
                            <Link
                                to={`/checkout/${product.id}`}
                                className="btn btn-primary"
                                style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', borderRadius: '12px' }}
                            >
                                <ShoppingBag size={22} /> Mua ngay ngay bây giờ
                            </Link>
                        ) : (
                            <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8', borderRadius: '16px', fontSize: '0.9rem', textAlign: 'center' }}>
                                Tài khoản Quản trị/Quản lý chỉ có quyền xem, không có quyền mua hàng.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
