import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Book, Video, MessageCircle, Phone, Download, Wrench, Shield, Zap, ArrowRight } from "lucide-react";

const supportCategories = [
  { icon: Book, title: "Hướng dẫn sử dụng", desc: "Tài liệu chi tiết cho từng sản phẩm", color: "cyan", link: "/installation" },
  { icon: Video, title: "Video hướng dẫn", desc: "Xem video hướng dẫn lắp đặt và sử dụng", color: "blue", link: "#" },
  { icon: MessageCircle, title: "Chat với chuyên gia", desc: "Nhắn tin trực tiếp với kỹ thuật viên", color: "purple", link: "/contact" },
  { icon: Phone, title: "Hotline 24/7", desc: "Gọi ngay 1800 6868 miễn phí", color: "green", link: "tel:18006868" },
  { icon: Download, title: "Tải ứng dụng", desc: "App SmartNest cho iOS và Android", color: "orange", link: "#" },
  { icon: Shield, title: "Bảo hành & Sửa chữa", desc: "Yêu cầu bảo hành và sửa chữa tại nhà", color: "red", link: "/warranty" },
];

const popularTopics = [
  "Cách kết nối thiết bị với Wi-Fi",
  "Thiết lập tự động hóa (Automation)",
  "Khôi phục cài đặt gốc thiết bị",
  "Cài đặt cảnh báo và thông báo",
  "Chia sẻ quyền truy cập cho thành viên",
  "Cập nhật firmware thiết bị",
  "Kết nối với Alexa/Google Home",
  "Cài đặt lịch hẹn giờ",
];

const statusItems = [
  { service: "Ứng dụng SmartNest (iOS/Android)", status: "operational" },
  { service: "Server điều khiển từ xa", status: "operational" },
  { service: "Dịch vụ camera cloud", status: "operational" },
  { service: "Tích hợp Alexa", status: "operational" },
  { service: "Tích hợp Google Home", status: "degraded" },
  { service: "API cho nhà phát triển", status: "operational" },
];

export default function Support() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Hỗ trợ kỹ thuật</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl font-black mb-3">Trung Tâm <span className="text-cyan-400">Hỗ Trợ</span></h1>
              <p className="text-slate-400 max-w-xl">Chúng tôi luôn ở đây để giúp bạn. Tìm kiếm câu trả lời hoặc liên hệ đội ngũ hỗ trợ của chúng tôi.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-black text-cyan-400">24/7</div>
                <div className="text-slate-400 text-sm">Hỗ trợ liên tục</div>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div className="text-center">
                <div className="text-3xl font-black text-white">&lt;2h</div>
                <div className="text-slate-400 text-sm">Thời gian phản hồi</div>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div className="text-center">
                <div className="text-3xl font-black text-white">99%</div>
                <div className="text-slate-400 text-sm">Giải quyết thành công</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {supportCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={cat.link} className={`block bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-${cat.color}-500/30 transition-all group`}>
                <div className={`w-12 h-12 bg-${cat.color}-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${cat.color}-500/20 transition-colors`}>
                  <cat.icon size={24} className={`text-${cat.color}-400`} />
                </div>
                <h3 className="text-white font-bold mb-1">{cat.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{cat.desc}</p>
                <span className={`text-${cat.color}-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  Xem ngay <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular topics */}
          <div>
            <h2 className="text-2xl font-black mb-6">Chủ Đề Phổ Biến</h2>
            <div className="space-y-2">
              {popularTopics.map((topic) => (
                <button key={topic} className="w-full text-left flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-cyan-500/30 hover:bg-slate-800 transition-all group">
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{topic}</span>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* System status & Download */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black mb-4">Trạng Thái Hệ Thống</h2>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-700/50 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-sm font-medium">Tất cả hệ thống hoạt động bình thường</span>
                </div>
                {statusItems.map((item) => (
                  <div key={item.service} className="flex items-center justify-between px-4 py-3 border-b border-slate-700/30 last:border-0">
                    <span className="text-slate-300 text-sm">{item.service}</span>
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${item.status === "operational" ? "text-green-400" : "text-yellow-400"}`}>
                      <span className={`w-2 h-2 rounded-full ${item.status === "operational" ? "bg-green-400" : "bg-yellow-400"}`} />
                      {item.status === "operational" ? "Hoạt động" : "Chậm"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black mb-4">Tải Tài Liệu</h2>
              <div className="space-y-3">
                {[
                  { name: "Hướng dẫn sử dụng SmartHub Pro 4K", size: "5.2 MB" },
                  { name: "Hướng dẫn cài đặt Camera AI 4K", size: "3.8 MB" },
                  { name: "Hướng dẫn setup ứng dụng SmartNest", size: "2.1 MB" },
                  { name: "Tài liệu kỹ thuật API", size: "8.5 MB" },
                ].map((doc) => (
                  <button key={doc.name} className="w-full flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all group text-left">
                    <Download size={16} className="text-cyan-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300 text-sm group-hover:text-white transition-colors line-clamp-1">{doc.name}</p>
                      <p className="text-slate-500 text-xs">PDF • {doc.size}</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Wrench size={20} className="text-cyan-400" />
                <h3 className="text-white font-bold">Yêu cầu hỗ trợ từ xa</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">Cho phép kỹ thuật viên SmartNest kết nối từ xa để chẩn đoán và khắc phục sự cố thiết bị của bạn.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-cyan-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-cyan-400 transition-colors">
                Yêu cầu hỗ trợ <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
