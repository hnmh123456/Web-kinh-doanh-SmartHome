import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Award, Globe, Handshake, ArrowRight, Star } from "lucide-react";

const partnerTiers = [
  {
    tier: "Platinum",
    color: "#E5E4E2",
    benefits: ["Chiết khấu 30-40%", "Hỗ trợ marketing toàn diện", "Đào tạo kỹ thuật viên miễn phí", "Ưu tiên giao hàng", "Logo trên website SmartNest", "Hỗ trợ bán hàng 24/7"],
    requirements: "Doanh số > 2 tỷ/năm",
  },
  {
    tier: "Gold",
    color: "#FFD700",
    benefits: ["Chiết khấu 20-30%", "Hỗ trợ marketing cơ bản", "Đào tạo kỹ thuật viên", "Giao hàng ưu tiên", "Danh mục đối tác"],
    requirements: "Doanh số > 500 triệu/năm",
  },
  {
    tier: "Silver",
    color: "#C0C0C0",
    benefits: ["Chiết khấu 10-20%", "Tài liệu marketing", "Hỗ trợ kỹ thuật", "Giao hàng tiêu chuẩn"],
    requirements: "Doanh số > 100 triệu/năm",
  },
];

const currentPartners = [
  { name: "Philips", logo: "💡", type: "Nhà sản xuất", country: "Hà Lan" },
  { name: "Samsung SmartThings", logo: "📱", type: "Nền tảng IoT", country: "Hàn Quốc" },
  { name: "Hanwha Security", logo: "🔒", type: "An ninh", country: "Hàn Quốc" },
  { name: "Daikin Vietnam", logo: "❄️", type: "Điều hòa", country: "Nhật Bản" },
  { name: "Sonos", logo: "🎵", type: "Âm thanh", country: "Mỹ" },
  { name: "Google Nest", logo: "🏠", type: "Hệ sinh thái", country: "Mỹ" },
  { name: "Yale Security", logo: "🗝️", type: "Khóa cửa", country: "Thuỵ Điển" },
  { name: "Roborock", logo: "🤖", type: "Robot gia dụng", country: "Trung Quốc" },
];

export default function Partners() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Đối tác</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black mb-4">Chương Trình <span className="text-cyan-400">Đối Tác</span></h1>
            <p className="text-slate-300 text-lg mb-6">Cùng SmartNest phát triển và mở rộng hệ sinh thái nhà thông minh trên toàn Việt Nam. Chúng tôi cam kết hỗ trợ đối tác toàn diện để cùng thành công.</p>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl px-4 py-2">
                <Globe size={16} className="text-cyan-400" />
                <span className="text-slate-300 text-sm">200+ đối tác toàn quốc</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl px-4 py-2">
                <Award size={16} className="text-yellow-400" />
                <span className="text-slate-300 text-sm">15 thương hiệu quốc tế</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current partners */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black mb-8">Thương Hiệu Đối Tác</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {currentPartners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-all"
            >
              <div className="text-4xl mb-3">{partner.logo}</div>
              <h3 className="text-white font-bold text-sm mb-1">{partner.name}</h3>
              <p className="text-cyan-400 text-xs">{partner.type}</p>
              <p className="text-slate-500 text-xs">{partner.country}</p>
            </motion.div>
          ))}
        </div>

        {/* Partner tiers */}
        <h2 className="text-2xl font-black mb-6">Cấp Bậc Đối Tác Phân Phối</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {partnerTiers.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-700/50" style={{ background: `linear-gradient(135deg, ${tier.color}15, transparent)` }}>
                <div className="flex items-center gap-3 mb-2">
                  <Star size={24} fill={tier.color} style={{ color: tier.color }} />
                  <h3 className="text-xl font-black" style={{ color: tier.color }}>{tier.tier}</h3>
                </div>
                <p className="text-slate-400 text-sm">{tier.requirements}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-300">
                      <span style={{ color: tier.color }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="block text-center py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all" style={{ background: `linear-gradient(to right, ${tier.color}80, ${tier.color}40)` }}>
                  Đăng ký ngay
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-black mb-4">Lợi Ích Khi Trở Thành Đối Tác</h2>
              <div className="space-y-3">
                {[
                  "Chiết khấu độc quyền lên đến 40%",
                  "Hỗ trợ kỹ thuật và đào tạo miễn phí",
                  "Tài liệu marketing và brochure chuyên nghiệp",
                  "Quyền trưng bày showroom SmartNest",
                  "Ưu tiên ra mắt sản phẩm mới",
                  "Hoa hồng giới thiệu khách hàng",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <Handshake size={64} className="text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Sẵn sàng hợp tác?</h3>
              <p className="text-slate-400 text-sm mb-6">Đội ngũ Business Development của chúng tôi sẽ liên hệ trong vòng 24 giờ</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all">
                Đăng ký đối tác <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
