import { Link } from "react-router";
import { motion } from "motion/react";
import { Check, X, ChevronRight, Star, Zap, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "15,000,000",
    period: "trọn gói",
    color: "slate",
    desc: "Dành cho căn hộ nhỏ và những ai mới bắt đầu với nhà thông minh",
    features: [
      { text: "5 thiết bị thông minh", included: true },
      { text: "1 bộ điều khiển trung tâm", included: true },
      { text: "Chiếu sáng 2 phòng", included: true },
      { text: "Khóa cửa thông minh", included: true },
      { text: "Camera an ninh 1 cái", included: true },
      { text: "App điều khiển miễn phí", included: true },
      { text: "Bảo hành 12 tháng", included: true },
      { text: "Hệ thống điều hòa AI", included: false },
      { text: "Camera đa phòng", included: false },
      { text: "Robot hút bụi", included: false },
      { text: "Hỗ trợ 24/7 ưu tiên", included: false },
    ],
    cta: "Chọn gói Starter",
  },
  {
    name: "Standard",
    price: "45,000,000",
    period: "trọn gói",
    color: "cyan",
    popular: true,
    desc: "Giải pháp hoàn chỉnh cho gia đình hiện đại, được lựa chọn nhiều nhất",
    features: [
      { text: "15 thiết bị thông minh", included: true },
      { text: "1 bộ SmartHub Pro 4K", included: true },
      { text: "Chiếu sáng toàn bộ nhà", included: true },
      { text: "2 khóa cửa thông minh", included: true },
      { text: "Camera an ninh 4 cái", included: true },
      { text: "App + giọng nói + remote", included: true },
      { text: "Bảo hành 24 tháng", included: true },
      { text: "Hệ thống điều hòa AI", included: true },
      { text: "Camera đa phòng", included: true },
      { text: "Robot hút bụi", included: false },
      { text: "Hỗ trợ 24/7 ưu tiên", included: false },
    ],
    cta: "Chọn gói Standard",
  },
  {
    name: "Premium",
    price: "120,000,000",
    period: "trọn gói",
    color: "purple",
    desc: "Hệ sinh thái nhà thông minh đầy đủ cho biệt thự và nhà cao cấp",
    features: [
      { text: "35+ thiết bị thông minh", included: true },
      { text: "2 bộ SmartHub Pro 4K", included: true },
      { text: "Chiếu sáng + rèm cửa toàn bộ", included: true },
      { text: "4 khóa cửa + cổng tự động", included: true },
      { text: "Camera an ninh 8 cái + AI", included: true },
      { text: "Điều khiển đa phương thức", included: true },
      { text: "Bảo hành 36 tháng + bảo trì", included: true },
      { text: "Điều hòa + lọc không khí AI", included: true },
      { text: "Camera 4K đa phòng", included: true },
      { text: "Robot hút bụi cao cấp", included: true },
      { text: "Hỗ trợ 24/7 ưu tiên tuyệt đối", included: true },
    ],
    cta: "Chọn gói Premium",
  },
];

const addons = [
  { name: "Thêm camera ngoài trời", price: "2,500,000 / cái" },
  { name: "Thêm đèn LED thông minh", price: "890,000 / bóng" },
  { name: "Thêm cảm biến đa năng", price: "490,000 / cái" },
  { name: "Gói bảo trì hàng năm", price: "3,000,000 / năm" },
  { name: "Nâng cấp ứng dụng Pro", price: "500,000 / năm" },
  { name: "Lắp đặt bổ sung thiết bị", price: "Liên hệ" },
];

export default function Pricing() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5" />
        <div className="relative max-w-3xl mx-auto px-4">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Bảng giá</span>
          </nav>
          <h1 className="text-4xl font-black mb-4">Bảng Giá <span className="text-cyan-400">Trọn Gói</span></h1>
          <p className="text-slate-400 text-lg mb-6">Chọn gói phù hợp với nhu cầu và ngân sách của bạn. Tất cả đã bao gồm tư vấn, lắp đặt và hướng dẫn sử dụng.</p>
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
            <Zap size={14} className="text-green-400" />
            <span className="text-green-400 text-sm font-medium">Ưu đãi đặc biệt: Miễn phí lắp đặt cho tất cả gói</span>
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl flex flex-col ${plan.popular
                ? "bg-gradient-to-b from-cyan-900/40 to-slate-800/80 border-2 border-cyan-500 scale-105"
                : "bg-slate-800/50 border border-slate-700/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    <Star size={12} fill="white" /> Phổ biến nhất
                  </span>
                </div>
              )}

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black ${plan.popular ? "text-cyan-400" : plan.color === "purple" ? "text-purple-400" : "text-white"}`}>
                      {plan.price}đ
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1">Đã bao gồm VAT & lắp đặt</p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3 text-sm">
                      {feature.included ? (
                        <Check size={16} className={plan.popular ? "text-cyan-400" : "text-green-400"} />
                      ) : (
                        <X size={16} className="text-slate-600" />
                      )}
                      <span className={feature.included ? "text-slate-300" : "text-slate-600"}>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`w-full text-center py-4 rounded-xl font-bold transition-all ${plan.popular
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 shadow-lg shadow-cyan-500/20"
                    : "bg-slate-700 border border-slate-600 text-white hover:bg-slate-600"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Cần giải pháp tùy chỉnh cho doanh nghiệp? <Link to="/contact" className="text-cyan-400 hover:underline">Liên hệ để được báo giá riêng →</Link>
        </p>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-center mb-8">Dịch Vụ & Phụ Kiện Bổ Sung</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <div key={addon.name} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex justify-between items-center hover:border-slate-600 transition-all">
                <span className="text-slate-300 text-sm">{addon.name}</span>
                <span className="text-cyan-400 font-bold text-sm">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Pricing */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-black text-center mb-8">Câu Hỏi Về Giá Cả</h2>
        <div className="space-y-4">
          {[
            { q: "Giá đã bao gồm lắp đặt chưa?", a: "Có, tất cả các gói đều đã bao gồm chi phí lắp đặt, cấu hình hệ thống và hướng dẫn sử dụng." },
            { q: "Có được trả góp không?", a: "Có, SmartNest hỗ trợ trả góp 0% lãi suất qua các ngân hàng đối tác: Techcombank, VPBank, HDFC, TPBank." },
            { q: "Nếu muốn nâng cấp lên gói cao hơn sau này?", a: "Bạn hoàn toàn có thể nâng cấp hệ thống bất kỳ lúc nào với chi phí chênh lệch giữa hai gói." },
          ].map((item) => (
            <div key={item.q} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
              <h4 className="text-white font-bold mb-2">{item.q}</h4>
              <p className="text-slate-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-black mb-4">Không chắc nên chọn gói nào?</h2>
          <p className="text-slate-400 mb-8">Chuyên gia của chúng tôi sẽ tư vấn miễn phí và giúp bạn chọn gói phù hợp nhất.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all">
            Nhận tư vấn miễn phí <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
