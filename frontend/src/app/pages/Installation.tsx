import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Download, PlayCircle, CheckCircle, AlertCircle, Lightbulb, ShieldCheck, Wifi } from "lucide-react";

const guides = [
  {
    id: 1,
    title: "Cài đặt SmartHub Pro 4K",
    category: "Trung tâm điều khiển",
    difficulty: "Dễ",
    time: "15 phút",
    icon: Wifi,
    steps: [
      "Mở hộp và kiểm tra toàn bộ phụ kiện",
      "Cắm nguồn điện cho SmartHub",
      "Kết nối cáp Ethernet vào router (khuyến nghị)",
      "Tải ứng dụng SmartNest trên điện thoại",
      "Mở ứng dụng và chọn 'Thêm thiết bị mới'",
      "Quét mã QR trên SmartHub",
      "Đặt tên và cài đặt theo hướng dẫn trong app",
    ],
  },
  {
    id: 2,
    title: "Lắp đặt Đèn LED Thông Minh",
    category: "Chiếu sáng",
    difficulty: "Rất dễ",
    time: "5 phút",
    icon: Lightbulb,
    steps: [
      "Tắt công tắc điện trước khi lắp",
      "Vặn bóng đèn LED thông minh vào đuôi đèn E27",
      "Bật công tắc điện - đèn sẽ nhấp nháy 3 lần",
      "Mở ứng dụng SmartNest và chọn 'Thêm thiết bị'",
      "Chọn 'Đèn LED' từ danh sách",
      "Kết nối với Wi-Fi 2.4GHz nhà bạn",
      "Đặt tên phòng và hoàn tất cài đặt",
    ],
  },
  {
    id: 3,
    title: "Cài đặt Camera An Ninh AI",
    category: "An ninh",
    difficulty: "Trung bình",
    time: "20 phút",
    icon: ShieldCheck,
    steps: [
      "Chọn vị trí lắp đặt phù hợp (góc cao, góc rộng)",
      "Khoan và lắp giá đỡ camera vào tường",
      "Gắn camera lên giá đỡ và điều chỉnh góc",
      "Kết nối nguồn điện hoặc pin cho camera",
      "Mở ứng dụng SmartNest và thêm camera mới",
      "Kết nối camera với Wi-Fi 5GHz",
      "Cấu hình AI detection và vùng giám sát",
      "Thiết lập thông báo và lưu trữ cloud",
    ],
  },
];

const faqs = [
  { q: "Thiết bị không kết nối được với Wi-Fi?", a: "Đảm bảo bạn dùng Wi-Fi 2.4GHz (không phải 5GHz) cho phần lớn thiết bị. Kiểm tra mật khẩu Wi-Fi và đặt lại thiết bị bằng cách giữ nút reset 5 giây." },
  { q: "Ứng dụng không tìm thấy thiết bị?", a: "Đảm bảo điện thoại và thiết bị cùng mạng Wi-Fi 2.4GHz. Tắt và bật lại Bluetooth trên điện thoại. Thử khởi động lại thiết bị và ứng dụng." },
  { q: "Thiết bị hoạt động chậm hoặc không phản hồi?", a: "Kiểm tra kết nối internet, đảm bảo SmartHub có đường truyền ổn định. Cập nhật firmware thiết bị qua ứng dụng. Nếu vẫn lỗi, liên hệ hỗ trợ kỹ thuật." },
];

export default function Installation() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="py-20 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <Link to="/support" className="hover:text-cyan-400">Hỗ trợ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Hướng dẫn lắp đặt</span>
          </nav>
          <h1 className="text-4xl font-black mb-3">Hướng Dẫn <span className="text-cyan-400">Lắp Đặt</span></h1>
          <p className="text-slate-400 max-w-xl">Hướng dẫn chi tiết từng bước giúp bạn tự lắp đặt thiết bị thông minh một cách dễ dàng</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick start */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-xl font-black text-white mb-2">🚀 Bắt Đầu Nhanh</h2>
              <p className="text-slate-400 text-sm mb-4">Tải ứng dụng SmartNest để bắt đầu. Hỗ trợ iOS và Android, hướng dẫn trong app bằng tiếng Việt đầy đủ.</p>
              <div className="flex gap-3">
                <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-900 transition-colors flex items-center gap-2">
                  🍎 App Store
                </button>
                <button className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition-colors flex items-center gap-2">
                  🤖 Google Play
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="#" className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-600 transition-colors">
                <Download size={16} /> Tải tài liệu PDF
              </a>
              <a href="#" className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-600 transition-colors">
                <PlayCircle size={16} /> Video hướng dẫn
              </a>
            </div>
          </div>
        </div>

        {/* Installation guides */}
        <h2 className="text-2xl font-black mb-6">Hướng Dẫn Chi Tiết</h2>
        <div className="space-y-6 mb-12">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                    <guide.icon size={24} className="text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-black text-lg">{guide.title}</h3>
                    <div className="flex gap-3 text-sm text-slate-400">
                      <span>{guide.category}</span>
                      <span>•</span>
                      <span className="text-green-400">{guide.difficulty}</span>
                      <span>•</span>
                      <span>⏱ {guide.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {guide.steps.map((step, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-cyan-400 text-xs font-bold">{j + 1}</span>
                      </div>
                      <span className="text-slate-300 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-12">
          <h3 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
            <AlertCircle size={20} /> Lưu ý quan trọng
          </h3>
          <ul className="space-y-2">
            {[
              "Luôn tắt nguồn điện trước khi lắp đặt các thiết bị điện (công tắc, ổ cắm)",
              "Sử dụng Wi-Fi 2.4GHz cho phần lớn thiết bị IoT (không phải 5GHz)",
              "Đặt SmartHub ở vị trí trung tâm để đảm bảo tín hiệu tốt nhất",
              "Cập nhật firmware định kỳ để có tính năng mới và vá lỗi bảo mật",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-slate-300 text-sm">
                <CheckCircle size={15} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Troubleshooting */}
        <h2 className="text-2xl font-black mb-6">Xử Lý Sự Cố Thường Gặp</h2>
        <div className="space-y-4 mb-12">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-orange-400" /> {faq.q}
              </h4>
              <p className="text-slate-400 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Need help */}
        <div className="text-center bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
          <h3 className="text-xl font-black text-white mb-2">Vẫn cần giúp đỡ?</h3>
          <p className="text-slate-400 mb-6">Kỹ thuật viên SmartNest có thể đến nhà bạn để hỗ trợ lắp đặt</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all">
              Yêu cầu hỗ trợ lắp đặt
            </Link>
            <Link to="/support" className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-600 transition-colors">
              Trung tâm hỗ trợ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
