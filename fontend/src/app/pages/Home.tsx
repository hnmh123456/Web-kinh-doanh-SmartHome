import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight, Play, Star, Check, ChevronRight,
  Lightbulb, ShieldCheck, Wind, Music, ChefHat, Cpu,
  Smartphone, Wifi, Zap, Award, Users, Package,
  Quote, Phone
} from "lucide-react";
import { products, categories } from "../data/products";
import { useCart } from "../context/CartContext";

const heroStats = [
  { value: "50,000+", label: "Khách hàng tin dùng" },
  { value: "200+", label: "Sản phẩm chính hãng" },
  { value: "15+", label: "Năm kinh nghiệm" },
  { value: "99%", label: "Tỷ lệ hài lòng" },
];

const features = [
  { icon: Smartphone, title: "Điều khiển từ xa", desc: "Quản lý toàn bộ nhà qua smartphone mọi lúc mọi nơi" },
  { icon: Wifi, title: "Kết nối đa giao thức", desc: "Hỗ trợ Wi-Fi, Zigbee, Z-Wave, Bluetooth 5.0" },
  { icon: Zap, title: "Tiết kiệm năng lượng", desc: "Giảm tới 40% điện năng tiêu thụ với tự động hóa thông minh" },
  { icon: ShieldCheck, title: "Bảo mật tuyệt đối", desc: "Mã hóa AES-256 và xác thực 2 lớp cho mọi kết nối" },
];

const testimonials = [
  {
    name: "Anh Nguyễn Hoàng Nam",
    role: "Kỹ sư phần mềm",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    content: "SmartNest đã thay đổi hoàn toàn cuộc sống của gia đình tôi. Từ khi lắp hệ thống chiếu sáng và an ninh thông minh, tôi tiết kiệm được rất nhiều điện và cảm thấy an tâm hơn.",
  },
  {
    name: "Chị Trần Minh Châu",
    role: "Giám đốc Marketing",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    content: "Dịch vụ lắp đặt rất chuyên nghiệp, đội ngũ tư vấn nhiệt tình. Hệ thống hoạt động ổn định sau 2 năm sử dụng. Sẽ tiếp tục mở rộng thêm cho văn phòng.",
  },
  {
    name: "Anh Lê Đức Thành",
    role: "Doanh nhân",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    content: "Đầu tư vào nhà thông minh là quyết định đúng đắn nhất. Robot hút bụi, đèn thông minh, camera AI - tất cả đều hoạt động mượt mà qua một app duy nhất.",
  },
];

const catIcons: Record<string, React.ElementType> = {
  lighting: Lightbulb,
  security: ShieldCheck,
  climate: Wind,
  entertainment: Music,
  kitchen: ChefHat,
  hub: Cpu,
};

export default function Home() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const featuredProducts = products.filter((p) => p.badge).slice(0, 4);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  return (
    <div className="bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1751945965597-71171ec7a458?w=1920&q=80"
            alt="Smart Home"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Animated orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">#1 Nhà Thông Minh Việt Nam 2024</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              Ngôi Nhà{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Thông Minh
              </span>{" "}
              Cho Cuộc Sống Hiện Đại
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Thiết bị nhà thông minh cao cấp, giải pháp tự động hóa toàn diện. Tiết kiệm năng lượng, tăng cường bảo mật và sống tiện nghi hơn mỗi ngày.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-cyan-500/25"
              >
                Khám phá ngay <ArrowRight size={20} />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Play size={20} /> Xem demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-2xl font-black text-cyan-400">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Tại Sao Chọn <span className="text-cyan-400">SmartNest</span>?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Chúng tôi mang đến giải pháp nhà thông minh toàn diện với công nghệ tiên tiến nhất</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <f.icon size={24} className="text-cyan-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black mb-2">Danh Mục Sản Phẩm</h2>
              <p className="text-slate-400">Hệ sinh thái thiết bị thông minh đầy đủ cho ngôi nhà bạn</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
              Xem tất cả <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => {
              const Icon = catIcons[cat.slug] || Package;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="block bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center hover:border-cyan-500/50 hover:bg-slate-800 transition-all group"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: cat.color + "20" }}
                    >
                      <Icon size={28} style={{ color: cat.color }} />
                    </div>
                    <p className="text-white font-semibold text-sm mb-1">{cat.name}</p>
                    <p className="text-slate-500 text-xs">{cat.count} sản phẩm</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black mb-2">Sản Phẩm Nổi Bật</h2>
              <p className="text-slate-400">Được khách hàng tin dùng và đánh giá cao nhất</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
              Xem tất cả <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      {product.badge}
                    </span>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
                      <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-sm font-medium">Hết hàng</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-cyan-400 text-xs font-medium mb-1">{product.category}</p>
                  <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className={j < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"} />
                    ))}
                    <span className="text-slate-400 text-xs ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-white font-black">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-slate-500 text-xs line-through ml-2">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="text-green-400 text-xs font-medium bg-green-400/10 px-2 py-0.5 rounded">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium py-2 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addedId === product.id ? "✓ Đã thêm" : "Thêm vào giỏ"}
                    </button>
                    <Link to={`/products/${product.id}`} className="p-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <ChevronRight size={16} className="text-slate-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Home Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1706809019043-c16ada0165e9?w=1200&q=80"
              alt="Smart Home"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/40" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-16 max-w-lg">
                <p className="text-cyan-400 font-medium mb-3">Giải pháp trọn gói</p>
                <h2 className="text-4xl font-black text-white mb-4">Tư Vấn Thiết Kế Nhà Thông Minh Miễn Phí</h2>
                <p className="text-slate-300 mb-6">Đội ngũ chuyên gia của chúng tôi sẽ tư vấn giải pháp phù hợp nhất cho ngôi nhà bạn.</p>
                <div className="flex gap-3">
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-cyan-400 transition-colors">
                    <Phone size={18} /> Liên hệ ngay
                  </Link>
                  <Link to="/solutions" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">
                    Xem giải pháp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6">Cam Kết Của <span className="text-cyan-400">SmartNest</span></h2>
              <div className="space-y-4">
                {[
                  { icon: Award, title: "Sản phẩm chính hãng 100%", desc: "Tất cả sản phẩm đều có tem chính hãng, hóa đơn VAT đầy đủ" },
                  { icon: ShieldCheck, title: "Bảo hành tận nhà", desc: "Dịch vụ bảo hành và sửa chữa tại nhà trong vòng 24 giờ" },
                  { icon: Users, title: "Tư vấn chuyên sâu miễn phí", desc: "Đội ngũ kỹ sư 10+ năm kinh nghiệm tư vấn và thiết kế miễn phí" },
                  { icon: Package, title: "Giao hàng toàn quốc", desc: "Miễn phí giao hàng, lắp đặt và hướng dẫn sử dụng tại nhà" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-black text-cyan-400 mb-1">15+</div>
                  <p className="text-slate-300 text-sm">Năm kinh nghiệm</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-black text-white mb-1">200+</div>
                  <p className="text-slate-400 text-sm">Sản phẩm đa dạng</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-black text-white mb-1">50K+</div>
                  <p className="text-slate-400 text-sm">Khách hàng tin dùng</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-black text-blue-400 mb-1">24/7</div>
                  <p className="text-slate-300 text-sm">Hỗ trợ kỹ thuật</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Khách Hàng Nói Gì Về Chúng Tôi</h2>
            <p className="text-slate-400">Hàng nghìn gia đình đã tin tưởng SmartNest</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
              >
                <Quote size={32} className="text-cyan-400/40 mb-4" />
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{t.content}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted brands */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm mb-8">Đối tác thương hiệu uy tín</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Philips", "Samsung", "Google", "Amazon", "Apple", "Xiaomi", "Sonos", "Nest"].map((brand) => (
              <span key={brand} className="text-slate-600 font-bold text-lg hover:text-slate-400 transition-colors cursor-pointer">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4">Bắt Đầu Hành Trình Nhà Thông Minh Ngay Hôm Nay</h2>
              <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
                Nhận tư vấn miễn phí từ chuyên gia. Thiết kế hệ thống phù hợp ngân sách và nhu cầu của bạn.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-cyan-700 font-bold px-8 py-4 rounded-xl hover:bg-cyan-50 transition-colors">
                  Tư vấn miễn phí <ArrowRight size={20} />
                </Link>
                <Link to="/products" className="inline-flex items-center gap-2 bg-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                  Xem sản phẩm
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-cyan-100">
                {["✓ Miễn phí tư vấn", "✓ Bảo hành 2 năm", "✓ Lắp đặt tận nơi", "✓ Hỗ trợ 24/7"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
