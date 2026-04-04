import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, Building2, Hotel, Factory, ArrowRight, ChevronRight, Check } from "lucide-react";

const solutions = [
  {
    id: "apartment",
    icon: Home,
    title: "Căn Hộ Chung Cư",
    subtitle: "Smart Apartment",
    image: "https://images.unsplash.com/photo-1751945965597-71171ec7a458?w=600&q=80",
    color: "#06B6D4",
    desc: "Giải pháp hoàn chỉnh cho căn hộ từ 30-150m², tối ưu không gian và tiết kiệm năng lượng.",
    features: ["Hệ thống chiếu sáng thông minh", "Điều khiển điều hòa AI", "Khóa cửa thông minh", "Camera an ninh mini"],
    packages: [
      { name: "Starter", price: "15,000,000", items: 5 },
      { name: "Standard", price: "35,000,000", items: 12 },
      { name: "Premium", price: "65,000,000", items: 25 },
    ],
  },
  {
    id: "villa",
    icon: Home,
    title: "Biệt Thự & Nhà Phố",
    subtitle: "Smart Villa",
    image: "https://images.unsplash.com/photo-1706809019043-c16ada0165e9?w=600&q=80",
    color: "#8B5CF6",
    desc: "Hệ thống nhà thông minh cao cấp dành cho biệt thự và nhà phố, tích hợp đầy đủ tính năng.",
    features: ["Cổng tự động thông minh", "Hệ thống tưới vườn tự động", "Rèm cửa điều khiển từ xa", "Hệ thống âm thanh đa phòng"],
    packages: [
      { name: "Essential", price: "50,000,000", items: 15 },
      { name: "Advanced", price: "120,000,000", items: 35 },
      { name: "Luxury", price: "250,000,000", items: 60 },
    ],
  },
  {
    id: "office",
    icon: Building2,
    title: "Văn Phòng & Doanh Nghiệp",
    subtitle: "Smart Office",
    image: "https://images.unsplash.com/photo-1759844197486-5b3612c7d534?w=600&q=80",
    color: "#3B82F6",
    desc: "Giải pháp tự động hóa văn phòng, tối ưu năng suất và giảm chi phí vận hành đáng kể.",
    features: ["Kiểm soát ra vào thông minh", "Quản lý năng lượng tập trung", "Hội nghị thông minh", "Bãi đỗ xe tự động"],
    packages: [
      { name: "SME", price: "80,000,000", items: 20 },
      { name: "Enterprise", price: "200,000,000", items: 50 },
      { name: "Custom", price: "Liên hệ", items: 100 },
    ],
  },
  {
    id: "hotel",
    icon: Hotel,
    title: "Khách Sạn & Resort",
    subtitle: "Smart Hospitality",
    image: "https://images.unsplash.com/photo-1730383445472-b45ebd18e386?w=600&q=80",
    color: "#F59E0B",
    desc: "Nâng tầm trải nghiệm khách hàng với hệ thống phòng khách sạn thông minh tiêu chuẩn quốc tế.",
    features: ["Hệ thống phòng thông minh", "Check-in/out tự động", "Kiểm soát năng lượng phòng", "Dịch vụ phòng AI"],
    packages: [
      { name: "Boutique", price: "500,000,000", items: 50 },
      { name: "Standard Hotel", price: "2,000,000,000", items: 200 },
      { name: "Resort", price: "Liên hệ", items: 500 },
    ],
  },
];

const process = [
  { step: "01", title: "Tư vấn & Khảo sát", desc: "Chuyên gia đến tận nơi khảo sát và tư vấn giải pháp phù hợp với nhu cầu và ngân sách của bạn." },
  { step: "02", title: "Thiết kế hệ thống", desc: "Đội ngũ kỹ sư thiết kế bản vẽ kỹ thuật chi tiết, lựa chọn thiết bị và lên kế hoạch thi công." },
  { step: "03", title: "Lắp đặt & Tích hợp", desc: "Thi công lắp đặt chuyên nghiệp, kết nối và cấu hình toàn bộ hệ thống theo tiêu chuẩn cao nhất." },
  { step: "04", title: "Đào tạo & Bàn giao", desc: "Hướng dẫn sử dụng chi tiết, bàn giao hồ sơ kỹ thuật và kích hoạt chế độ bảo hành." },
  { step: "05", title: "Hỗ trợ & Bảo trì", desc: "Hỗ trợ kỹ thuật 24/7, bảo trì định kỳ và cập nhật tính năng mới hoàn toàn miễn phí." },
];

export default function Solutions() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Hero */}
      <div className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Giải pháp</span>
          </nav>
          <h1 className="text-5xl font-black mb-6">Giải Pháp Nhà Thông Minh <span className="text-cyan-400">Toàn Diện</span></h1>
          <p className="text-xl text-slate-300">Từ căn hộ nhỏ đến biệt thự sang trọng, văn phòng hiện đại đến khách sạn 5 sao - SmartNest có giải pháp phù hợp cho mọi nhu cầu.</p>
        </div>
      </div>

      {/* Solutions grid */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={sol.image} alt={sol.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs font-medium mb-1" style={{ color: sol.color }}>{sol.subtitle}</p>
                  <h3 className="text-xl font-black text-white">{sol.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-400 text-sm mb-4">{sol.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {sol.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check size={14} style={{ color: sol.color }} className="flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {sol.packages.map((pkg) => (
                    <div key={pkg.name} className="bg-slate-900/50 rounded-xl p-3 text-center border border-slate-700/50">
                      <p className="text-white text-xs font-bold mb-1">{pkg.name}</p>
                      <p className="text-xs font-black" style={{ color: sol.color }}>{pkg.price.includes("Liên") ? pkg.price : `${pkg.price}đ`}</p>
                      <p className="text-slate-500 text-xs">{pkg.items} thiết bị</p>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all" style={{ background: `linear-gradient(to right, ${sol.color}, ${sol.color}99)` }}>
                  Tư vấn miễn phí <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Quy Trình Triển Khai</h2>
            <p className="text-slate-400">5 bước đơn giản để có ngôi nhà thông minh hoàn hảo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-cyan-500/50 to-transparent z-0" />
                )}
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-black text-lg shadow-lg shadow-cyan-500/20">
                  {p.step}
                </div>
                <h3 className="text-white font-bold mb-2 text-sm">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-12">
            <h2 className="text-3xl font-black text-white mb-4">Nhận Báo Giá Ngay Hôm Nay</h2>
            <p className="text-cyan-100 mb-8">Tư vấn viên sẽ liên hệ trong vòng 30 phút</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-cyan-700 font-bold px-8 py-4 rounded-xl hover:bg-cyan-50 transition-colors">
              Yêu cầu báo giá <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
