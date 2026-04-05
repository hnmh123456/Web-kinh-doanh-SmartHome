import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShoppingBag, Eye, Lightbulb, ShieldCheck, AirVent, Music, Smartphone, ChevronRight, Globe, Link as LinkIcon, LayoutDashboard, Mail, Phone } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/products');
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = [
        { name: 'Chiếu sáng', icon: <Lightbulb />, color: 'bg-blue' },
        { name: 'An ninh', icon: <ShieldCheck />, color: 'bg-red' },
        { name: 'Điều hòa', icon: <AirVent />, color: 'bg-cyan' },
        { name: 'Âm thanh', icon: <Music />, color: 'bg-blue' },
        { name: 'Điều khiển', icon: <Smartphone />, color: 'bg-cyan' },
    ];

    if (loading) return <div className="flex-center">Loading...</div>;

    return (
        <div style={{ background: '#0C1222' }}>
            {/* Hero Section */}
            <header className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="badge bg-blue" style={{ marginBottom: '1rem' }}>SmartNest - Future Living</div>
                        <h1 className="title-main">Ngôi Nhà Thông Minh<br />Cho Cuộc Sống Hiện Đại</h1>
                        <p className="subtitle" style={{ color: '#94A3B8', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '600px' }}>
                            Trải nghiệm hệ sinh thái nhà thông minh hàng đầu Việt Nam. Tự động hóa mọi không gian sống với công nghệ tiên tiến nhất.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary">Tư vấn miễn phí</button>
                            <button className="btn">Xem giải pháp <ChevronRight size={18} /></button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats & Trust Bar */}
            <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 5 }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    textAlign: 'center'
                }}>
                    <div>
                        <h3 style={{ fontSize: '2rem', color: '#007BFF' }}>50k+</h3>
                        <p style={{ color: '#94A3B8' }}>Khách hàng tin dùng</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2rem', color: '#00D1FF' }}>200+</h3>
                        <p style={{ color: '#94A3B8' }}>Thiết bị thông minh</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2rem', color: '#FF4D4D' }}>99%</h3>
                        <p style={{ color: '#94A3B8' }}>Hài lòng tuyệt đối</p>
                    </div>
                </div>
            </div>

            {/* Category Section */}
            <section className="section-padding container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Danh Mục Giải Pháp</h2>
                    <p style={{ color: '#94A3B8' }}>Chúng tôi mang đến sự tiện ích toàn diện cho ngôi nhà của bạn</p>
                </div>
                <div className="category-grid">
                    {categories.map((cat, i) => (
                        <div className="category-card" key={i}>
                            <div className={`category-icon ${cat.color}`}>
                                {cat.icon}
                            </div>
                            <h4 style={{ fontSize: '1.1rem' }}>{cat.name}</h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="section-padding container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Thiết Bị Nổi Bật</h2>
                        <p style={{ color: '#94A3B8' }}>Cập nhật công nghệ mới nhất cho tổ ấm</p>
                    </div>
                    <Link to="#" style={{ color: '#007BFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        Xem tất cả <ChevronRight size={18} />
                    </Link>
                </div>

                {products.length === 0 ? (
                    <p style={{ color: '#94A3B8', textAlign: 'center' }}>Đang tải danh sách thiết bị...</p>
                ) : (
                    <div className="product-grid">
                        {products.map(product => (
                            <div className="product-card" key={product.id}>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={product.image || 'https://images.unsplash.com/photo-1558002038-1bc32204caba?q=80&w=400&auto=format&fit=crop'}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <div style={{ position: 'absolute', top: '1rem', right: '1rem' }} className="badge bg-blue">New</div>
                                </div>
                                <div className="product-info">
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                                    <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.5rem', height: '40px', overflow: 'hidden' }}>
                                        {product.description}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="product-price">${Number(product.price).toFixed(2)}</div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <Link to={`/product/${product.id}`} className="btn" style={{ padding: '0.4rem', border: 'none' }}>
                                                <Eye size={20} />
                                            </Link>
                                            {user?.role === 'user' && (
                                                <Link to={`/checkout/${product.id}`} className="btn btn-primary" style={{ padding: '0.4rem 1rem', borderRadius: '8px' }}>
                                                    <ShoppingBag size={18} /> Mua ngay
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div>
                            <Link to="/" className="nav-brand" style={{ marginBottom: '1.5rem', display: 'flex' }}>
                                <div style={{ background: '#007BFF', borderRadius: '4px', padding: '2px' }}>
                                    <LayoutDashboard size={22} color="white" />
                                </div>
                                SmartNest
                            </Link>
                            <p style={{ color: '#94A3B8', marginBottom: '1.5rem' }}>
                                Kiến tạo không gian sống tương lai với những giải pháp nhà thông minh an toàn, tiện nghi và hiện đại nhất.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Link to="#" className="btn" style={{ padding: '0.5rem', background: '#1E293B' }}><Globe size={18} /></Link>
                                <Link to="#" className="btn" style={{ padding: '0.5rem', background: '#1E293B' }}><Globe size={18} /></Link>
                                <Link to="#" className="btn" style={{ padding: '0.5rem', background: '#1E293B' }}><LinkIcon size={18} /></Link>
                                <Link to="#" className="btn" style={{ padding: '0.5rem', background: '#1E293B' }}><Globe size={18} /></Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="footer-title">Giải pháp</h4>
                            <ul className="footer-links">
                                <li><Link to="#">Chiếu sáng thông minh</Link></li>
                                <li><Link to="#">An ninh toàn diện</Link></li>
                                <li><Link to="#">Điều khiển rèm cửa</Link></li>
                                <li><Link to="#">Giải trí âm thanh</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="footer-title">Hỗ trợ</h4>
                            <ul className="footer-links">
                                <li><Link to="#">Chính sách bảo hành</Link></li>
                                <li><Link to="#">Hướng dẫn sử dụng</Link></li>
                                <li><Link to="#">Câu hỏi thường gặp</Link></li>
                                <li><Link to="#">Liên hệ hỗ trợ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="footer-title">Bản tin</h4>
                            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1rem' }}>Đăng ký nhận tin để không bỏ lỡ các ưu đãi mới nhất.</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="email" placeholder="Email của bạn" style={{
                                    background: '#1E293B',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '0.6rem 1rem',
                                    borderRadius: '8px',
                                    color: 'white',
                                    flex: 1
                                }} />
                                <button className="btn btn-primary" style={{ padding: '0.6rem' }}>Gửi</button>
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem' }}>
                        © 2024 SmartNest Technology. All rights reserved. Designed for future living.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
