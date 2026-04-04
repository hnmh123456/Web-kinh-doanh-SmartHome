import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import {
  Home, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight,
  CheckCircle2, AlertCircle, Check, X as XIcon
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

function getPasswordStrength(pw: string): PasswordStrength {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map: PasswordStrength[] = [
    { score: 0, label: "", color: "" },
    { score: 1, label: "Yếu", color: "bg-red-500" },
    { score: 2, label: "Trung bình", color: "bg-yellow-500" },
    { score: 3, label: "Mạnh", color: "bg-cyan-500" },
    { score: 4, label: "Rất mạnh", color: "bg-green-500" },
  ];
  return map[score];
}

const requirements = [
  { label: "Ít nhất 8 ký tự", test: (pw: string) => pw.length >= 8 },
  { label: "Có chữ hoa", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "Có số", test: (pw: string) => /[0-9]/.test(pw) },
  { label: "Có ký tự đặc biệt", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
];

export default function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (form.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (!form.agree) {
      setError("Vui lòng đồng ý với điều khoản sử dụng.");
      return;
    }

    const result = await register({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      phone: form.phone.trim(),
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/account"), 1200);
    } else {
      setError(result.error || "Đăng ký thất bại.");
    }
  };

  const benefits = [
    "Tích điểm & nhận ưu đãi độc quyền",
    "Quản lý đơn hàng & bảo hành dễ dàng",
    "Nhận thông tin sản phẩm mới nhất",
    "Hỗ trợ kỹ thuật ưu tiên",
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex-col justify-between p-12">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link to="/" className="relative flex items-center gap-3 w-fit">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Home size={22} className="text-white" />
          </div>
          <div>
            <span className="text-white font-black text-2xl">Smart</span>
            <span className="text-cyan-400 font-black text-2xl">Nest</span>
          </div>
        </Link>

        {/* Center */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-sm font-medium">Đăng ký miễn phí</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Tham gia cộng đồng<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">SmartNest</span>
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed text-sm">
            Hơn 50,000 gia đình đã tin chọn SmartNest. Tạo tài khoản để nhận những đặc quyền tốt nhất.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-cyan-400" />
                </div>
                <span className="text-slate-300 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-4">
          {[
            { value: "50K+", label: "Thành viên" },
            { value: "4.9★", label: "Đánh giá" },
            { value: "24/7", label: "Hỗ trợ" },
          ].map((s) => (
            <div key={s.label} className="text-center bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <p className="text-cyan-400 font-black text-lg">{s.value}</p>
              <p className="text-slate-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="lg:hidden mb-6 flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Home size={18} className="text-white" />
            </div>
            <span className="text-white font-black text-xl">Smart<span className="text-cyan-400">Nest</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Tạo tài khoản</h1>
            <p className="text-slate-400 text-sm">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Đăng nhập
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Họ và tên <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
                />
              </div>
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="email@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Số điện thoại</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="0901 234 567"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Mật khẩu <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : "bg-slate-700"}`}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <p className="text-xs text-slate-400">
                      Độ mạnh: <span className="font-medium text-slate-200">{strength.label}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Requirements */}
              {form.password && (
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {requirements.map((req) => {
                    const ok = req.test(form.password);
                    return (
                      <div key={req.label} className="flex items-center gap-1.5">
                        {ok ? (
                          <Check size={11} className="text-green-400 flex-shrink-0" />
                        ) : (
                          <XIcon size={11} className="text-slate-600 flex-shrink-0" />
                        )}
                        <span className={`text-xs ${ok ? "text-green-400" : "text-slate-500"}`}>{req.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Xác nhận mật khẩu <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                  placeholder="••••••••"
                  className={`w-full bg-slate-900 border rounded-xl pl-11 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all text-sm ${
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : form.confirmPassword && form.password === form.confirmPassword
                      ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                      : "border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/30"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {form.confirmPassword && form.password === form.confirmPassword && (
                  <CheckCircle2 size={16} className="absolute right-10 top-1/2 -translate-y-1/2 text-green-400" />
                )}
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Mật khẩu không khớp</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm((f) => ({ ...f, agree: e.target.checked }))}
                className="accent-cyan-500 w-4 h-4 rounded mt-0.5 flex-shrink-0"
              />
              <span className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                Tôi đồng ý với{" "}
                <a href="#" className="text-cyan-400 hover:underline">Điều khoản sử dụng</a>
                {" "}và{" "}
                <a href="#" className="text-cyan-400 hover:underline">Chính sách bảo mật</a>
                {" "}của SmartNest
              </span>
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
                <p className="text-green-400 text-sm">Đăng ký thành công! Đang chuyển hướng...</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang tạo tài khoản...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={18} />
                  Hoàn tất!
                </>
              ) : (
                <>
                  Tạo tài khoản miễn phí
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs">hoặc đăng ký với</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Social */}
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
        </div>
      </div>
    </div>
  );
}
