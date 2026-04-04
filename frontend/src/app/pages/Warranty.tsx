import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Shield, CheckCircle, X, Clock, Wrench, Phone, FileText, Send } from "lucide-react";

const warrantyPolicies = [
  { period: "36 tháng", items: ["SmartHub Pro 4K", "Màn hình cảm ứng tường", "Bộ điều khiển trung tâm"], color: "cyan" },
  { period: "24 tháng", items: ["Camera an ninh AI", "Khóa cửa thông minh", "Điều hòa thông minh", "Robot hút bụi"], color: "blue" },
  { period: "12 tháng", items: ["Đèn LED thông minh", "Công tắc thông minh", "Ổ cắm thông minh", "Cảm biến đa năng", "Loa thông minh"], color: "purple" },
];

const covered = [
  "Lỗi do nhà sản xuất (hàng mới 100%)",
  "Hỏng hóc do linh kiện kém chất lượng",
  "Lỗi firmware và phần mềm",
  "Màn hình bị chết điểm ảnh từ nhà máy",
  "Lỗi kết nối không dây từ nhà máy",
];

const notCovered = [
  "Hỏng do va đập, rơi vỡ",
  "Ngấm nước, hỏng do ngập lụt",
  "Hỏng do điện áp bất thường",
  "Sử dụng sai mục đích",
  "Tự ý sửa chữa hoặc thay linh kiện",
  "Hết thời hạn bảo hành",
];

export default function Warranty() {
  const [form, setForm] = useState({ name: "", phone: "", orderId: "", product: "", issue: "", desc: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="py-20 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Bảo hành & Đổi trả</span>
          </nav>
          <h1 className="text-4xl font-black mb-3">Chính Sách <span className="text-cyan-400">Bảo Hành</span></h1>
          <p className="text-slate-400 max-w-xl">SmartNest cam kết bảo hành chính hãng, dịch vụ tại nhà và hỗ trợ kỹ thuật 24/7 để bạn luôn yên tâm sử dụng.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Warranty periods */}
        <h2 className="text-2xl font-black mb-6">Thời Hạn Bảo Hành</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {warrantyPolicies.map((policy) => (
            <div key={policy.period} className={`bg-slate-800/50 border border-${policy.color}-500/20 rounded-2xl p-6`}>
              <div className={`text-${policy.color}-400 font-black text-3xl mb-1`}>{policy.period}</div>
              <p className="text-slate-400 text-sm mb-4">Thời gian bảo hành</p>
              <ul className="space-y-2">
                {policy.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle size={14} className={`text-${policy.color}-400 flex-shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Coverage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
            <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
              <CheckCircle size={20} /> Bảo hành bao gồm
            </h3>
            <ul className="space-y-3">
              {covered.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
              <X size={20} /> Không được bảo hành
            </h3>
            <ul className="space-y-3">
              {notCovered.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Return policy */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">Chính Sách Đổi Trả</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Clock, title: "Đổi hàng trong 30 ngày", desc: "Sản phẩm lỗi kỹ thuật, đổi hàng mới 100% trong 30 ngày kể từ ngày mua" },
              { icon: Wrench, title: "Sửa chữa trong bảo hành", desc: "Miễn phí sửa chữa và thay thế linh kiện trong toàn bộ thời gian bảo hành" },
              { icon: Phone, title: "Hỗ trợ tận nơi", desc: "Kỹ thuật viên đến nhà trong vòng 24 giờ, miễn phí trong vùng nội thành" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim form */}
        <h2 className="text-2xl font-black mb-6">Yêu Cầu Bảo Hành</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Yêu cầu đã gửi thành công!</h3>
                <p className="text-slate-400 text-sm mb-2">Mã yêu cầu: <span className="text-cyan-400 font-bold">#WR{Date.now().toString().slice(-6)}</span></p>
                <p className="text-slate-400 text-sm">Kỹ thuật viên sẽ liên hệ trong vòng 2 giờ để sắp xếp lịch hỗ trợ.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-cyan-400 hover:underline text-sm">Gửi yêu cầu khác</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Họ tên *</label>
                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Điện thoại *</label>
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" placeholder="0901 234 567" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Mã đơn hàng</label>
                  <input type="text" value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" placeholder="#SN..." />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Sản phẩm cần bảo hành *</label>
                  <input required type="text" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" placeholder="Tên sản phẩm" />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Loại vấn đề *</label>
                  <select required value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500">
                    <option value="">Chọn loại vấn đề...</option>
                    <option>Không kết nối được Wi-Fi</option>
                    <option>Thiết bị không bật/tắt</option>
                    <option>Lỗi phần cứng</option>
                    <option>Lỗi cảm ứng/màn hình</option>
                    <option>Thiết bị bị hỏng do lỗi nhà máy</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Mô tả chi tiết</label>
                  <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none" placeholder="Mô tả vấn đề bạn gặp phải..." />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all">
                  <Send size={18} /> Gửi yêu cầu bảo hành
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Shield size={18} className="text-cyan-400" /> Kiểm Tra Bảo Hành
              </h3>
              <p className="text-slate-400 text-sm mb-3">Nhập số serial để kiểm tra tình trạng bảo hành của thiết bị</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Serial number..." className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500" />
                <button className="bg-cyan-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-cyan-400 transition-colors">Kiểm tra</button>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <FileText size={18} className="text-slate-400" /> Tài Liệu Cần Chuẩn Bị
              </h3>
              <ul className="space-y-2">
                {["Hóa đơn mua hàng (bản gốc hoặc ảnh chụp)", "Ảnh chụp sản phẩm bị lỗi", "Số serial trên sản phẩm hoặc bao bì", "Mã đơn hàng SmartNest"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle size={14} className="text-slate-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-3">Liên Hệ Bảo Hành Nhanh</h3>
              <div className="space-y-2">
                <a href="tel:18006868" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 text-sm transition-colors">
                  <Phone size={14} className="text-cyan-400" /> Hotline bảo hành: 1800 6868 (miễn phí)
                </a>
                <p className="text-slate-500 text-xs">Giờ làm việc: T2-T7: 8:00-18:00 | CN: 9:00-15:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
