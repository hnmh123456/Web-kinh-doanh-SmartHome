import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Package, Heart, Settings, Bell, Shield, LogOut, ChevronRight, Star, LogIn, UserPlus, Edit3, Save, X } from "lucide-react";
import { products } from "../data/products";
import { useAuth } from "../context/AuthContext";

const tabs = [
  { id: "profile", label: "Hồ sơ", icon: User },
  { id: "orders", label: "Đơn hàng", icon: Package },
  { id: "wishlist", label: "Yêu thích", icon: Heart },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

const mockOrders = [
  { id: "#SN241568", date: "15/03/2024", status: "delivered", total: 4990000, items: 2 },
  { id: "#SN241234", date: "02/03/2024", status: "shipping", total: 2490000, items: 1 },
  { id: "#SN240987", date: "20/02/2024", status: "delivered", total: 9890000, items: 3 },
];

const statusColors: Record<string, string> = {
  delivered: "text-green-400 bg-green-400/10",
  shipping: "text-blue-400 bg-blue-400/10",
  processing: "text-yellow-400 bg-yellow-400/10",
  cancelled: "text-red-400 bg-red-400/10",
};

const statusLabels: Record<string, string> = {
  delivered: "Đã giao",
  shipping: "Đang giao",
  processing: "Đang xử lý",
  cancelled: "Đã hủy",
};

export default function Account() {
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const wishlistProducts = products.slice(0, 4);

  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const handleSave = () => {
    updateUser({ name: editForm.name, phone: editForm.phone });
    setEditMode(false);
  };

  const memberLevelLabel: Record<string, string> = {
    bronze: "Đồng",
    silver: "Bạc",
    gold: "Vàng",
    platinum: "Bạch Kim",
  };
  const memberLevelColor: Record<string, string> = {
    bronze: "text-amber-600 bg-amber-600/10",
    silver: "text-slate-300 bg-slate-300/10",
    gold: "text-yellow-400 bg-yellow-400/10",
    platinum: "text-cyan-300 bg-cyan-300/10",
  };

  // Not logged in state
  if (!isAuthenticated) {
    return (
      <div className="bg-slate-950 min-h-screen text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-6">
            <User size={40} className="text-slate-500" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Chưa đăng nhập</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Vui lòng đăng nhập để xem thông tin tài khoản, lịch sử đơn hàng và nhiều ưu đãi hơn nữa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
            >
              <LogIn size={18} /> Đăng nhập
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <UserPlus size={18} /> Đăng ký
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: "Ưu đãi thành viên", icon: Star },
              { label: "Quản lý đơn hàng", icon: Package },
              { label: "Bảo mật tài khoản", icon: Shield },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
                <Icon size={22} className="text-cyan-400 mx-auto mb-2" />
                <p className="text-slate-400 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-black mb-8">Tài Khoản Của Tôi</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-3 text-2xl font-black text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-white font-bold">{user.name}</h3>
                <p className="text-slate-400 text-sm">{user.email}</p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${memberLevelColor[user.memberLevel]}`}>
                    ⭐ Thành viên {memberLevelLabel[user.memberLevel]}
                  </span>
                </div>
                {user.joinDate && (
                  <p className="text-slate-500 text-xs mt-2">Tham gia từ {user.joinDate}</p>
                )}
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left text-sm border-b border-slate-700/30 last:border-0 transition-colors ${activeTab === tab.id ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-slate-700/50"}`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  <ChevronRight size={14} className="ml-auto" />
                </button>
              ))}
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="w-full flex items-center gap-3 px-5 py-4 text-left text-sm text-red-400 hover:bg-red-400/5 transition-colors"
              >
                <LogOut size={16} />
                Đăng xuất
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-white">Thông Tin Cá Nhân</h2>
                  {!editMode ? (
                    <button
                      onClick={() => { setEditForm({ name: user.name, phone: user.phone || "" }); setEditMode(true); }}
                      className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                    >
                      <Edit3 size={14} /> Chỉnh sửa
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      <X size={14} /> Hủy
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Họ và tên</label>
                    <input
                      type="text"
                      value={editMode ? editForm.name : user.name}
                      onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                      readOnly={!editMode}
                      className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all ${editMode ? "border-cyan-500 focus:ring-1 focus:ring-cyan-500/30" : "border-slate-700 cursor-default"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Email</label>
                    <input
                      type="text"
                      value={user.email}
                      readOnly
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-400 text-sm cursor-default"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Số điện thoại</label>
                    <input
                      type="text"
                      value={editMode ? editForm.phone : (user.phone || "Chưa cập nhật")}
                      onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                      readOnly={!editMode}
                      className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all ${editMode ? "border-cyan-500 focus:ring-1 focus:ring-cyan-500/30" : "border-slate-700 cursor-default"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Cấp thành viên</label>
                    <div className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                      <span className={`font-medium ${memberLevelColor[user.memberLevel]?.split(" ")[0]}`}>
                        ⭐ Thành viên {memberLevelLabel[user.memberLevel]}
                      </span>
                    </div>
                  </div>
                </div>

                {editMode && (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
                  >
                    <Save size={16} /> Lưu thay đổi
                  </button>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-700/50">
                  <h2 className="text-xl font-black text-white">Lịch Sử Đơn Hàng</h2>
                </div>
                <div className="divide-y divide-slate-700/30">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-5 hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-bold">{order.id}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>{order.date} • {order.items} sản phẩm</span>
                        <span className="text-white font-bold">{formatPrice(order.total)}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="text-cyan-400 text-xs hover:underline">Xem chi tiết</button>
                        {order.status === "delivered" && (
                          <button className="text-slate-400 text-xs hover:text-white">Mua lại</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-6">Sản Phẩm Yêu Thích ({wishlistProducts.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="flex gap-3 bg-slate-900/50 border border-slate-700/50 rounded-xl p-3">
                      <Link to={`/products/${p.id}`}>
                        <img src={p.image} alt={p.name} className="w-20 h-20 rounded-lg object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${p.id}`}>
                          <p className="text-white font-medium text-sm hover:text-cyan-300 transition-colors line-clamp-2">{p.name}</p>
                        </Link>
                        <div className="flex items-center gap-1 my-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={10} className={j < Math.floor(p.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"} />
                          ))}
                        </div>
                        <p className="text-cyan-400 font-bold text-sm">{formatPrice(p.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2"><Bell size={20} className="text-cyan-400" /> Thông Báo</h2>
                  {[
                    { label: "Thông báo đơn hàng", checked: true },
                    { label: "Khuyến mãi và ưu đãi", checked: true },
                    { label: "Tin tức sản phẩm mới", checked: false },
                    { label: "Nhắc nhở bảo hành", checked: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0">
                      <span className="text-slate-300 text-sm">{item.label}</span>
                      <input type="checkbox" defaultChecked={item.checked} className="accent-cyan-500 w-4 h-4 cursor-pointer" />
                    </div>
                  ))}
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2"><Shield size={20} className="text-cyan-400" /> Bảo Mật</h2>
                  <div className="space-y-3">
                    <button className="w-full text-left flex items-center justify-between py-3 border-b border-slate-700/30 hover:text-white transition-colors text-slate-300 text-sm">
                      Đổi mật khẩu <ChevronRight size={16} className="text-slate-500" />
                    </button>
                    <button className="w-full text-left flex items-center justify-between py-3 border-b border-slate-700/30 hover:text-white transition-colors text-slate-300 text-sm">
                      Xác thực 2 lớp <ChevronRight size={16} className="text-slate-500" />
                    </button>
                    <button className="w-full text-left flex items-center justify-between py-3 hover:text-white transition-colors text-slate-300 text-sm">
                      Phiên đăng nhập <ChevronRight size={16} className="text-slate-500" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}