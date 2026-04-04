import { useState, useEffect, useRef } from "react";
import { Link, useLocation, Outlet } from "react-router";
import {
  Home, Lightbulb, ShieldCheck, Wind, Music, ChefHat, Cpu,
  Phone, Mail, MapPin, Facebook, Youtube, Instagram,
  ShoppingCart, Menu, X, ChevronDown, Search, User,
  Zap, Star, ArrowRight, LogOut, LogIn, UserPlus, Settings, Package
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navCategories = [
  { href: "/categories/lighting", label: "Chiếu sáng", icon: Lightbulb },
  { href: "/categories/security", label: "An ninh", icon: ShieldCheck },
  { href: "/categories/climate", label: "Điều hòa KK", icon: Wind },
  { href: "/categories/entertainment", label: "Giải trí", icon: Music },
  { href: "/categories/kitchen", label: "Gia dụng", icon: ChefHat },
  { href: "/categories/hub", label: "Điều khiển", icon: Cpu },
];

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Top bar */}
      <div className="bg-cyan-600 text-white text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><Phone size={13} /> 1800 6868</span>
            <span className="flex items-center gap-1"><Mail size={13} /> info@smarthomenest.vn</span>
            <span className="flex items-center gap-1"><MapPin size={13} /> 123 Nguyễn Huệ, Q.1, TP.HCM</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Zap size={13} /> Giao hàng miễn phí toàn quốc</span>
            <span className="flex items-center gap-1"><Star size={13} /> Bảo hành chính hãng</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/98 shadow-2xl shadow-black/50 backdrop-blur-md" : "bg-slate-900"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                <Home size={20} className="text-white" />
              </div>
              <div>
                <span className="text-white font-black text-lg tracking-tight">Smart</span>
                <span className="text-cyan-400 font-black text-lg tracking-tight">Nest</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/") ? "text-cyan-400 bg-cyan-400/10" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
                Trang chủ
              </Link>

              {/* Products dropdown */}
              <div className="relative" onMouseEnter={() => setProductDropdown(true)} onMouseLeave={() => setProductDropdown(false)}>
                <Link to="/products" className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname.startsWith("/products") || location.pathname.startsWith("/categories") ? "text-cyan-400 bg-cyan-400/10" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
                  Sản phẩm <ChevronDown size={14} className={`transition-transform ${productDropdown ? "rotate-180" : ""}`} />
                </Link>
                {productDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-2 z-50">
                    <Link to="/products" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-700 mb-1">
                      <ArrowRight size={14} /> Tất cả sản phẩm
                    </Link>
                    <div className="border-t border-slate-700 my-1" />
                    {navCategories.map((cat) => (
                      <Link key={cat.href} to={cat.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-700">
                        <cat.icon size={14} className="text-cyan-400" /> {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/solutions" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/solutions") ? "text-cyan-400 bg-cyan-400/10" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
                Giải pháp
              </Link>
              <Link to="/pricing" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/pricing") ? "text-cyan-400 bg-cyan-400/10" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
                Bảng giá
              </Link>
              <Link to="/showroom" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/showroom") ? "text-cyan-400 bg-cyan-400/10" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
                Showroom
              </Link>
              <Link to="/blog" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/blog") ? "text-cyan-400 bg-cyan-400/10" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
                Blog
              </Link>
              <Link to="/contact" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/contact") ? "text-cyan-400 bg-cyan-400/10" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
                Liên hệ
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Search size={20} />
              </button>

              {/* User menu */}
              {isAuthenticated ? (
                <div className="relative hidden md:block" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdown((v) => !v)}
                    className="flex items-center gap-2 p-1.5 pr-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-black">
                      {user!.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-slate-300 max-w-[80px] truncate">{user!.name.split(" ").pop()}</span>
                    <ChevronDown size={14} className={`transition-transform ${userDropdown ? "rotate-180" : ""}`} />
                  </button>
                  {userDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 p-2 z-50">
                      <div className="px-3 py-2 mb-1 border-b border-slate-700">
                        <p className="text-white font-semibold text-sm truncate">{user!.name}</p>
                        <p className="text-slate-400 text-xs truncate">{user!.email}</p>
                        <span className="mt-1 inline-block text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full">
                          ⭐ Thành viên {user!.memberLevel === "gold" ? "Vàng" : user!.memberLevel === "silver" ? "Bạc" : user!.memberLevel === "platinum" ? "Bạch Kim" : "Đồng"}
                        </span>
                      </div>
                      <Link to="/account" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                        <User size={14} className="text-cyan-400" /> Tài khoản của tôi
                      </Link>
                      <Link to="/account" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                        <Package size={14} className="text-cyan-400" /> Đơn hàng
                      </Link>
                      <Link to="/account" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                        <Settings size={14} className="text-cyan-400" /> Cài đặt
                      </Link>
                      <div className="border-t border-slate-700 mt-1 pt-1">
                        <button
                          onClick={() => { logout(); setUserDropdown(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                          <LogOut size={14} /> Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login" className="flex items-center gap-1 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
                    <LogIn size={16} /> Đăng nhập
                  </Link>
                  <Link to="/register" className="flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-sm font-medium px-3 py-2 rounded-lg transition-all">
                    <UserPlus size={16} /> Đăng ký
                  </Link>
                </div>
              )}

              <Link to="/cart" className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
              <Link to="/contact" className="hidden md:flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Tư vấn ngay
              </Link>
              <button className="lg:hidden p-2 text-slate-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 pt-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input autoFocus type="text" placeholder="Tìm kiếm sản phẩm..." className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-slate-800 border-t border-slate-700 px-4 py-4">
            <nav className="flex flex-col gap-1">
              {[
                { to: "/", label: "Trang chủ" },
                { to: "/products", label: "Tất cả sản phẩm" },
                ...navCategories.map(c => ({ to: c.href, label: c.label })),
                { to: "/solutions", label: "Giải pháp" },
                { to: "/pricing", label: "Bảng giá" },
                { to: "/showroom", label: "Showroom" },
                { to: "/blog", label: "Blog" },
                { to: "/about", label: "Về chúng tôi" },
                { to: "/contact", label: "Liên hệ" },
                { to: "/account", label: "Tài khoản" },
              ].map((item) => (
                <Link key={item.to} to={item.to} className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 text-sm font-medium">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Home size={20} className="text-white" />
                </div>
                <span className="text-white font-black text-xl"><span>Smart</span><span className="text-cyan-400">Nest</span></span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                SmartNest - Đơn vị hàng đầu Việt Nam về thiết bị nhà thông minh. Chúng tôi cung cấp giải pháp toàn diện, từ tư vấn, thiết kế đến lắp đặt và bảo hành.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                  { icon: Youtube, href: "#", color: "hover:bg-red-600" },
                  { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
                ].map(({ icon: Icon, href, color }) => (
                  <a key={href + color} href={href} className={`w-9 h-9 bg-slate-800 ${color} rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all`}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2">
                {navCategories.map((cat) => (
                  <li key={cat.href}>
                    <Link to={cat.href} className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">{cat.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Công ty</h4>
              <ul className="space-y-2">
                {[
                  { to: "/about", label: "Về chúng tôi" },
                  { to: "/showroom", label: "Showroom" },
                  { to: "/careers", label: "Tuyển dụng" },
                  { to: "/partners", label: "Đối tác" },
                  { to: "/blog", label: "Blog & Tin tức" },
                ].map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2">
                {[
                  { to: "/support", label: "Trung tâm hỗ trợ" },
                  { to: "/installation", label: "Hướng dẫn lắp đặt" },
                  { to: "/warranty", label: "Bảo hành & Đổi trả" },
                  { to: "/faq", label: "Câu hỏi thường gặp" },
                  { to: "/pricing", label: "Bảng giá dịch vụ" },
                ].map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2">
                <a href="tel:18006868" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                  <Phone size={14} /> 1800 6868
                </a>
                <a href="mailto:info@smarthomenest.vn" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                  <Mail size={14} /> info@smarthomenest.vn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2024 SmartNest. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Chính sách bảo mật</a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Điều khoản sử dụng</a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}