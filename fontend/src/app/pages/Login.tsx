import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  Home, Eye, EyeOff, Mail, Lock, ArrowRight,
  Smartphone, Shield, Zap, AlertCircle, CheckCircle2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/account";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    const result = await login(form.email, form.password);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate(from, { replace: true }), 800);
    } else {
      setError(result.error || "Đăng nhập thất bại.");
    }
  };

  const fillDemo = () => setForm({ email: "user@example.com", password: "123456" });

  const features = [
    { icon: Smartphone, text: "Quản lý thiết bị thông minh" },
    { icon: Shield, text: "Bảo mật & bảo hành dễ dàng" },
    { icon: Zap, text: "Ưu đãi độc quyền thành viên" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex-col justify-between p-12">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link to="/" className="relative flex items-center gap-3 group w-fit">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Home size={22} className="text-white" />
          </div>
          <div>
            <span className="text-white font-black text-2xl tracking-tight">Smart</span>
            <span className="text-cyan-400 font-black text-2xl tracking-tight">Nest</span>
          </div>
        </Link>

        {/* Center content */}
        <div className="relative">
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Chào mừng trở lại!
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Đăng nhập để khám phá thế giới nhà thông minh và quản lý thiết bị của bạn một cách dễ dàng.
          </p>
          <div className="space-y-5">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-cyan-400" />
                </div>
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative">
          <div className="bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-sm">
                NA
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Nguyễn Văn A</p>
                <p className="text-slate-400 text-xs">⭐ Thành viên Vàng</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm italic">
              "SmartNest giúp tôi điều khiển toàn bộ ngôi nhà chỉ qua một ứng dụng. Tuyệt vời!"
            </p>
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Home size={18} className="text-white" />
            </div>
            <span className="text-white font-black text-xl">Smart<span className="text-cyan-400">Nest</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Đăng nhập</h1>
            <p className="text-slate-400 text-sm">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Demo hint */}
          <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-2">
            <AlertCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-300">
              <span className="font-medium">Demo:</span> Dùng{" "}
              <button onClick={fillDemo} className="underline hover:text-blue-200 cursor-pointer">
                user@example.com / 123456
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="nhap@email.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-slate-300 text-sm font-medium">Mật khẩu</label>
                <button type="button" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors">
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="accent-cyan-500 w-4 h-4 rounded" />
              <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Ghi nhớ đăng nhập</span>
            </label>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">Đăng nhập thành công! Đang chuyển hướng...</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang đăng nhập...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={18} />
                  Thành công!
                </>
              ) : (
                <>
                  Đăng nhập
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs">hoặc tiếp tục với</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Social login (mock) */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Google", color: "hover:border-red-500/40 hover:bg-red-500/5", letter: "G", textColor: "text-red-400" },
              { name: "Facebook", color: "hover:border-blue-500/40 hover:bg-blue-500/5", letter: "f", textColor: "text-blue-400" },
            ].map((s) => (
              <button
                key={s.name}
                type="button"
                className={`flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 rounded-xl py-3 text-slate-300 text-sm font-medium transition-all ${s.color}`}
              >
                <span className={`font-black text-base ${s.textColor}`}>{s.letter}</span>
                {s.name}
              </button>
            ))}
          </div>

          <p className="text-center text-slate-600 text-xs mt-8">
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <a href="#" className="text-slate-500 hover:text-cyan-400 underline transition-colors">Điều khoản sử dụng</a>
            {" "}và{" "}
            <a href="#" className="text-slate-500 hover:text-cyan-400 underline transition-colors">Chính sách bảo mật</a>
          </p>
        </div>
      </div>
    </div>
  );
}
