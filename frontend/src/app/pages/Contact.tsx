import { useState } from "react";
import { Link } from "react-router";
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: Phone, title: "Hotline", value: "1800 6868", sub: "Miễn phí 24/7", color: "cyan" },
    { icon: Mail, title: "Email", value: "info@smarthomenest.vn", sub: "Phản hồi trong 2 giờ", color: "blue" },
    { icon: MapPin, title: "Trụ sở chính", value: "123 Nguyễn Huệ, Q.1", sub: "TP. Hồ Chí Minh", color: "purple" },
    { icon: Clock, title: "Giờ làm việc", value: "T2 - T7: 8:00 - 18:00", sub: "Chủ nhật: 9:00 - 15:00", color: "green" },
  ];

  const offices = [
    { city: "TP. Hồ Chí Minh", address: "123 Nguyễn Huệ, Q.1, TP.HCM", phone: "028 1234 5678" },
    { city: "Hà Nội", address: "456 Cầu Giấy, Q. Cầu Giấy, Hà Nội", phone: "024 8765 4321" },
    { city: "Đà Nẵng", address: "789 Võ Văn Kiệt, Q. Sơn Trà, Đà Nẵng", phone: "0236 6789 012" },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="py-20 text-center bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Liên hệ</span>
          </nav>
          <h1 className="text-4xl font-black mb-4">Liên Hệ <span className="text-cyan-400">Với Chúng Tôi</span></h1>
          <p className="text-slate-400 max-w-xl mx-auto">Đội ngũ chuyên gia SmartNest luôn sẵn sàng hỗ trợ bạn 24/7</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info) => (
            <div key={info.title} className={`bg-slate-800/50 border border-${info.color}-500/20 rounded-2xl p-6 hover:border-${info.color}-500/50 transition-all`}>
              <div className={`w-12 h-12 bg-${info.color}-500/10 rounded-xl flex items-center justify-center mb-4`}>
                <info.icon size={24} className={`text-${info.color}-400`} />
              </div>
              <p className="text-slate-400 text-sm mb-1">{info.title}</p>
              <p className="text-white font-bold">{info.value}</p>
              <p className="text-slate-500 text-sm">{info.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-black mb-6">Gửi Yêu Cầu Tư Vấn</h2>
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Gửi thành công!</h3>
                <p className="text-slate-400">Chúng tôi sẽ liên hệ lại với bạn trong vòng 30 phút. Cảm ơn bạn đã tin tưởng SmartNest!</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-cyan-400 hover:text-cyan-300 text-sm underline">
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0901 234 567"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Dịch vụ quan tâm</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm"
                  >
                    <option value="">Chọn dịch vụ...</option>
                    <option>Tư vấn thiết kế nhà thông minh</option>
                    <option>Mua lẻ thiết bị</option>
                    <option>Lắp đặt hệ thống</option>
                    <option>Bảo hành & Sửa chữa</option>
                    <option>Giải pháp doanh nghiệp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Nội dung yêu cầu</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Mô tả nhu cầu của bạn..."
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Send size={18} /> Gửi yêu cầu tư vấn
                </button>
              </form>
            )}
          </div>

          {/* Map & Offices */}
          <div>
            <h2 className="text-2xl font-black mb-6">Hệ Thống Showroom</h2>
            {/* Fake Map */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl h-48 mb-6 flex items-center justify-center overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1730383445472-b45ebd18e386?w=600&q=80"
                alt="Map"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-cyan-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg">
                  📍 Xem trên Google Maps
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {offices.map((office) => (
                <div key={office.city} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold">{office.city}</p>
                      <p className="text-slate-400 text-sm">{office.address}</p>
                      <p className="text-cyan-400 text-sm mt-1">{office.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-2">💬 Chat trực tuyến</h3>
              <p className="text-slate-400 text-sm mb-3">Nhắn tin trực tiếp với tư vấn viên qua Zalo hoặc Facebook Messenger</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-blue-500 transition-colors">
                  Zalo Chat
                </button>
                <button className="flex-1 bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-blue-600 transition-colors">
                  Messenger
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
