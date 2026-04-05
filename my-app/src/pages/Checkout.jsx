import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, CheckCircle, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', address: '', card: '' });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    if (loading) return <div className="flex-center" style={{ minHeight: '60vh' }}>Đang tải...</div>;
    if (!product) return <div className="flex-center" style={{ minHeight: '60vh' }}>Không tìm thấy sản phẩm.</div>;

    if (success) {
        return (
            <div className="flex-center" style={{ minHeight: '80vh', flexDirection: 'column', textAlign: 'center', background: '#0C1222' }}>
                <div className="glass-card" style={{ padding: '4rem', borderRadius: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '2rem' }}>
                        <CheckCircle size={80} color="#10B981" />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#FFFFFF' }}>Thanh toán thành công!</h2>
                    <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>Cảm ơn bạn đã tin dùng SmartNest. Đang chuyển hướng về trang chủ...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: '#0C1222', minHeight: '100vh', paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <Link to={`/product/${id}`} className="btn" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8' }}>
                    <ArrowLeft size={18} /> Quay lại chi tiết
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Order Summary */}
                    <div className="glass-card" style={{ padding: '2rem', alignSelf: 'start' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Tóm tắt đơn hàng</h3>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <img src={product.image || 'https://images.unsplash.com/photo-1558002038-1bc32204caba?q=80&w=400&auto=format&fit=crop'} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
                            <div>
                                <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.2rem' }}>{product.name}</p>
                                <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Số lượng: 1</p>
                                <p style={{ color: '#00D1FF', fontWeight: 600, marginTop: '0.5rem' }}>${Number(product.price).toFixed(2)}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                                <span>Tạm tính</span>
                                <span>${Number(product.price).toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                                <span>Phí vận chuyển</span>
                                <span style={{ color: '#10B981' }}>Miễn phí</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.4rem', color: '#FFFFFF', marginTop: '0.5rem' }}>
                                <span>Tổng cộng</span>
                                <span>${Number(product.price).toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#94A3B8', fontSize: '0.85rem', justifyContent: 'center' }}>
                            <ShieldCheck size={16} /> Bảo mật thanh toán bởi SmartNest Pay
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem' }}>Thông tin thanh toán</h3>
                            <Lock size={18} color="#94A3B8" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ color: '#94A3B8', display: 'block', marginBottom: '0.5rem' }}>Họ và tên</label>
                                <input type="text" className="input-field" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.8rem 1rem', borderRadius: '10px', width: '100%' }} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Nguyễn Văn A" />
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ color: '#94A3B8', display: 'block', marginBottom: '0.5rem' }}>Địa chỉ nhận hàng</label>
                                <input type="text" className="input-field" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.8rem 1rem', borderRadius: '10px', width: '100%' }} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required placeholder="Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội" />
                            </div>
                            <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                                <label style={{ color: '#94A3B8', display: 'block', marginBottom: '0.5rem' }}>Số thẻ tín dụng</label>
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className="input-field" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.8rem 1rem 0.8rem 3rem', borderRadius: '10px', width: '100%' }} value={form.card} onChange={e => setForm({ ...form, card: e.target.value })} required placeholder="**** **** **** 1234" maxLength="16" />
                                    <CreditCard size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" style={{ padding: '1rem', fontSize: '1.1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem' }}>
                                Thanh toán ngay ${Number(product.price).toFixed(2)}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
