import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Package, Users, Tag, Trash2, Edit2, Plus, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Admin = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [products, setProducts] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [productForm, setProductForm] = useState({ id: null, name: '', description: '', price: '', image: '' });
    const [userForm, setUserForm] = useState({ id: null, username: '', phone: '', role: 'user' });
    const [voucherForm, setVoucherForm] = useState({ id: null, code: '', discount_percent: '', description: '' });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'overview') {
                // Fetch sizes for overview
                const resP = await axios.get('http://localhost:3000/api/products');
                setProducts(resP.data);
                if (user.role === 'admin') {
                    const resU = await axios.get('http://localhost:3000/api/users');
                    setUsersList(resU.data);
                    const resV = await axios.get('http://localhost:3000/api/vouchers');
                    setVouchers(resV.data);
                }
            } else if (activeTab === 'products') {
                const res = await axios.get('http://localhost:3000/api/products');
                setProducts(res.data);
            } else if (activeTab === 'users' && user.role === 'admin') {
                const res = await axios.get('http://localhost:3000/api/users');
                setUsersList(res.data);
            } else if (activeTab === 'vouchers' && user.role === 'admin') {
                const res = await axios.get('http://localhost:3000/api/vouchers');
                setVouchers(res.data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    // --- Handlers ---
    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            if (productForm.id) await axios.put(`http://localhost:3000/api/products/${productForm.id}`, productForm);
            else await axios.post('http://localhost:3000/api/products', productForm);
            setProductForm({ id: null, name: '', description: '', price: '', image: '' });
            fetchData();
        } catch (err) { alert('Error saving product'); }
    };
    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try { await axios.delete(`http://localhost:3000/api/products/${id}`); fetchData(); }
        catch (err) { alert('Error deleting product'); }
    };

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            if (userForm.id) {
                await axios.put(`http://localhost:3000/api/users/${userForm.id}`, userForm);
                setUserForm({ id: null, username: '', phone: '', role: 'user' });
                fetchData();
            }
        } catch (err) { alert('Error saving user'); }
    };
    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try { await axios.delete(`http://localhost:3000/api/users/${id}`); fetchData(); }
        catch (err) { alert('Error deleting user'); }
    };

    const saveVoucher = async (e) => {
        e.preventDefault();
        try {
            if (voucherForm.id) await axios.put(`http://localhost:3000/api/vouchers/${voucherForm.id}`, voucherForm);
            else await axios.post('http://localhost:3000/api/vouchers', voucherForm);
            setVoucherForm({ id: null, code: '', discount_percent: '', description: '' });
            fetchData();
        } catch (err) { alert('Error saving voucher'); }
    };
    const deleteVoucher = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try { await axios.delete(`http://localhost:3000/api/vouchers/${id}`); fetchData(); }
        catch (err) { alert('Error deleting voucher'); }
    };

    return (
        <div className="admin-layout">
            {/* SIDEBAR */}
            <div className="admin-sidebar">
                <h3 style={{ padding: '0 1.5rem', marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Menu Quản Trị</h3>

                <button className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                    <LayoutDashboard size={20} /> Trang chính
                </button>

                <button className={`sidebar-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => { setActiveTab('products'); setProductForm({ id: null, name: '', description: '', price: '', image: '' }); }}>
                    <Package size={20} /> Cửa hàng
                </button>

                {user.role === 'admin' && (
                    <>
                        <button className={`sidebar-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => { setActiveTab('users'); setUserForm({ id: null, username: '', phone: '', role: 'user' }); }}>
                            <Users size={20} /> Người dùng
                        </button>
                        <button className={`sidebar-item ${activeTab === 'vouchers' ? 'active' : ''}`} onClick={() => { setActiveTab('vouchers'); setVoucherForm({ id: null, code: '', discount_percent: '', description: '' }); }}>
                            <Tag size={20} /> Ưu đãi
                        </button>
                    </>
                )}
            </div>

            {/* CONTENT */}
            <div className="admin-content">
                <h2 className="title" style={{ marginBottom: '2rem' }}>
                    {activeTab === 'overview' && 'Tổng quan hệ thống'}
                    {activeTab === 'products' && 'Quản lý cửa hàng'}
                    {activeTab === 'users' && 'Quản lý người dùng'}
                    {activeTab === 'vouchers' && 'Quản lý ưu đãi'}
                </h2>

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div className="stat-card">
                                <div className="stat-icon"><Package size={24} /></div>
                                <div className="stat-info"><h4>Tổng Sản Phẩm</h4><p>{products.length}</p></div>
                            </div>
                            {user.role === 'admin' && (
                                <>
                                    <div className="stat-card">
                                        <div className="stat-icon"><Users size={24} /></div>
                                        <div className="stat-info"><h4>Tổng Người Dùng</h4><p>{usersList.length}</p></div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon"><Tag size={24} /></div>
                                        <div className="stat-info"><h4>Vouchers Khả Dụng</h4><p>{vouchers.length}</p></div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* CRUD TABS */}
                {activeTab !== 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>

                        {/* FORM */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3>
                                {activeTab === 'products' ? (productForm.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới') : null}
                                {activeTab === 'users' ? 'Phân quyền & Sửa User' : null}
                                {activeTab === 'vouchers' ? (voucherForm.id ? 'Sửa Voucher' : 'Phát hành Voucher mới') : null}
                            </h3>
                            <hr style={{ margin: '1rem 0', borderColor: 'var(--border)' }} />

                            {activeTab === 'products' && (
                                <form onSubmit={saveProduct}>
                                    <div className="form-group"><label>Tên sản phẩm</label><input type="text" className="input-field" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required /></div>
                                    <div className="form-group"><label>Giá bán ($)</label><input type="number" step="0.01" className="input-field" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} required /></div>
                                    <div className="form-group"><label>Mô tả chi tiết</label><textarea className="input-field" rows="3" value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} required></textarea></div>
                                    <div className="form-group"><label>Hình ảnh (URL)</label><input type="url" className="input-field" value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} /></div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{productForm.id ? <><Edit2 size={18} /> Cập nhật</> : <><Plus size={18} /> Thêm mới</>}</button>
                                        {productForm.id && (<button type="button" className="btn" onClick={() => setProductForm({ id: null, name: '', description: '', price: '', image: '' })}>Hủy</button>)}
                                    </div>
                                </form>
                            )}

                            {activeTab === 'users' && (
                                <form onSubmit={saveUser}>
                                    {userForm.id ? (
                                        <>
                                            <div className="form-group"><label>Username</label><input type="text" className="input-field" value={userForm.username} onChange={e => setUserForm({ ...userForm, username: e.target.value })} required /></div>
                                            <div className="form-group"><label>Số điện thoại</label><input type="text" className="input-field" value={userForm.phone} onChange={e => setUserForm({ ...userForm, phone: e.target.value })} required /></div>
                                            <div className="form-group"><label>Quyền hạn (Role)</label>
                                                <select className="input-field" value={userForm.role} onChange={e => setUserForm({ ...userForm, role: e.target.value })}>
                                                    <option value="user">User</option><option value="manager">Manager</option><option value="admin">Admin</option>
                                                </select>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}><Edit2 size={18} /> Cập nhật</button>
                                                <button type="button" className="btn" onClick={() => setUserForm({ id: null, username: '', phone: '', role: 'user' })}>Hủy</button>
                                            </div>
                                        </>
                                    ) : (<p className="subtitle">Vui lòng chọn một người dùng từ bảng để thay đổi thông tin hoặc cấp quyền.</p>)}
                                </form>
                            )}

                            {activeTab === 'vouchers' && (
                                <form onSubmit={saveVoucher}>
                                    <div className="form-group"><label>Mã Voucher</label><input type="text" className="input-field" value={voucherForm.code} onChange={e => setVoucherForm({ ...voucherForm, code: e.target.value })} required placeholder="VD: SUMMER50" /></div>
                                    <div className="form-group"><label>Giảm giá (%)</label><input type="number" min="1" max="100" className="input-field" value={voucherForm.discount_percent} onChange={e => setVoucherForm({ ...voucherForm, discount_percent: e.target.value })} required /></div>
                                    <div className="form-group"><label>Mô tả ngắn gọn</label><textarea className="input-field" rows="2" value={voucherForm.description} onChange={e => setVoucherForm({ ...voucherForm, description: e.target.value })} required></textarea></div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{voucherForm.id ? <><Edit2 size={18} /> Cập nhật</> : <><Plus size={18} /> Phát hành mã</>}</button>
                                        {voucherForm.id && (<button type="button" className="btn" onClick={() => setVoucherForm({ id: null, code: '', discount_percent: '', description: '' })}>Hủy</button>)}
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* TABLE */}
                        <div className="table-wrapper">
                            {loading ? (<div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải dữ liệu...</div>) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            {activeTab === 'products' && (<><th>Sản phẩm</th><th>Giá</th><th>Thao tác</th></>)}
                                            {activeTab === 'users' && (<><th>Tài khoản</th><th>Quyền</th><th>SĐT</th><th>Thao tác</th></>)}
                                            {activeTab === 'vouchers' && (<><th>Mã Voucher</th><th>Giảm</th><th>Mô tả</th><th>Thao tác</th></>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeTab === 'products' && products.map(p => (
                                            <tr key={p.id}>
                                                <td>#{p.id}</td><td style={{ fontWeight: 500 }}>{p.name}</td><td>${Number(p.price).toFixed(2)}</td>
                                                <td>
                                                    <button className="btn" style={{ padding: '0.4rem', marginRight: '0.5rem' }} onClick={() => editProduct(p)}><Edit2 size={16} /></button>
                                                    <button className="btn" style={{ padding: '0.4rem', color: 'var(--danger)' }} onClick={() => deleteProduct(p.id)}><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                        {activeTab === 'users' && usersList.map(u => (
                                            <tr key={u.id}>
                                                <td>#{u.id}</td><td style={{ fontWeight: 500 }}>{u.username}</td><td><span className={`badge ${u.role === 'admin' ? 'badge-admin' : (u.role === 'manager' ? 'badge-user' : '')}`}>{u.role.toUpperCase()}</span></td><td>{u.phone}</td>
                                                <td>
                                                    <button className="btn" style={{ padding: '0.4rem', marginRight: '0.5rem' }} onClick={() => editUser(u)}><Edit2 size={16} /></button>
                                                    <button className="btn" style={{ padding: '0.4rem', color: 'var(--danger)' }} onClick={() => deleteUser(u.id)}><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                        {activeTab === 'vouchers' && vouchers.map(v => (
                                            <tr key={v.id}>
                                                <td>#{v.id}</td><td style={{ fontWeight: 500 }}>{v.code}</td><td style={{ color: 'var(--success)', fontWeight: 700 }}>{v.discount_percent}%</td><td>{v.description}</td>
                                                <td>
                                                    <button className="btn" style={{ padding: '0.4rem', marginRight: '0.5rem' }} onClick={() => editVoucher(v)}><Edit2 size={16} /></button>
                                                    <button className="btn" style={{ padding: '0.4rem', color: 'var(--danger)' }} onClick={() => deleteVoucher(v.id)}><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
