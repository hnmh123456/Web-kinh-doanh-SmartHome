import { Link } from "react-router";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-slate-950 min-h-screen text-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          404
        </div>
        <h1 className="text-3xl font-black text-white mb-4">Trang Không Tồn Tại</h1>
        <p className="text-slate-400 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Hãy quay lại trang chủ hoặc khám phá sản phẩm của chúng tôi.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all">
            <Home size={18} /> Trang chủ
          </Link>
          <Link to="/products" className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-white font-bold px-6 py-3 rounded-xl hover:border-slate-600 transition-colors">
            <Search size={18} /> Xem sản phẩm
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {[
            { to: "/solutions", label: "Giải pháp" },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: "Liên hệ" },
            { to: "/support", label: "Hỗ trợ" },
          ].map((link) => (
            <Link key={link.to} to={link.to} className="text-cyan-400 hover:text-cyan-300 hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
