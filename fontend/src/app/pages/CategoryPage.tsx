import { useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { Star, ShoppingCart, ChevronRight, ArrowRight } from "lucide-react";
import { products, categories } from "../data/products";
import { useCart } from "../context/CartContext";

const categoryMeta: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  benefits: string[];
}> = {
  lighting: {
    title: "Chiếu Sáng Thông Minh",
    subtitle: "Smart Lighting",
    description: "Hệ thống chiếu sáng thông minh với 16 triệu màu sắc, điều khiển từ xa và tiết kiệm đến 80% điện năng. Tạo không gian sống lý tưởng với ánh sáng hoàn hảo mọi lúc.",
    image: "https://images.unsplash.com/photo-1752391702044-b3c75fde78bd?w=1200&q=80",
    color: "#F59E0B",
    benefits: ["Tiết kiệm 80% điện năng", "16 triệu màu sắc đa dạng", "Hẹn giờ tự động thông minh", "Điều khiển bằng giọng nói"],
  },
  security: {
    title: "An Ninh Thông Minh",
    subtitle: "Smart Security",
    description: "Hệ thống bảo mật toàn diện với camera AI 4K, khóa cửa thông minh và cảm biến đa năng. Bảo vệ gia đình bạn 24/7 với công nghệ nhận diện khuôn mặt tiên tiến.",
    image: "https://images.unsplash.com/photo-1770197247933-63e02c014cb7?w=1200&q=80",
    color: "#EF4444",
    benefits: ["Camera AI nhận diện khuôn mặt", "Cảnh báo thời gian thực", "Lưu trữ cloud an toàn", "Khóa cửa vân tay/FaceID"],
  },
  climate: {
    title: "Điều Hòa Không Khí",
    subtitle: "Smart Climate",
    description: "Kiểm soát nhiệt độ và chất lượng không khí trong nhà một cách thông minh. Điều hòa Inverter tiết kiệm điện, lọc không khí HEPA và điều khiển từ xa qua smartphone.",
    image: "https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?w=1200&q=80",
    color: "#06B6D4",
    benefits: ["Tiết kiệm điện Inverter DC", "Lọc không khí HEPA", "Điều khiển từ xa 24/7", "Chế độ ngủ thông minh"],
  },
  entertainment: {
    title: "Giải Trí Thông Minh",
    subtitle: "Smart Entertainment",
    description: "Trải nghiệm giải trí đỉnh cao với hệ thống âm thanh AI, loa thông minh và trợ lý giọng nói. Kết nối và điều khiển toàn bộ hệ thống giải trí từ smartphone.",
    image: "https://images.unsplash.com/photo-1760087616415-62270db23966?w=1200&q=80",
    color: "#8B5CF6",
    benefits: ["Âm thanh 360° Stereo", "Trợ lý AI tích hợp", "Kết nối Bluetooth 5.0", "Điều khiển 50+ thiết bị"],
  },
  kitchen: {
    title: "Gia Dụng Thông Minh",
    subtitle: "Smart Kitchen & Home",
    description: "Robot hút bụi AI, thiết bị bếp thông minh và gia dụng cao cấp. Tự động hóa công việc nhà để có thêm thời gian tận hưởng cuộc sống.",
    image: "https://images.unsplash.com/photo-1727107463139-97f6911ad4a9?w=1200&q=80",
    color: "#10B981",
    benefits: ["Robot hút bụi AI Mapping", "Tự động lên lịch làm việc", "Điều khiển từ xa", "Tiết kiệm thời gian 3 giờ/ngày"],
  },
  hub: {
    title: "Trung Tâm Điều Khiển",
    subtitle: "Smart Hub & Control",
    description: "Trung tâm điều khiển nhà thông minh, kết nối tất cả thiết bị qua một ứng dụng. Hỗ trợ đa giao thức Zigbee, Z-Wave, Wi-Fi và Bluetooth.",
    image: "https://images.unsplash.com/photo-1752262167753-37a0ec83f614?w=1200&q=80",
    color: "#3B82F6",
    benefits: ["Kết nối 200+ thiết bị", "Đa giao thức truyền thông", "Tương thích mọi nền tảng", "Cập nhật OTA tự động"],
  },
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const meta = categoryMeta[slug || ""] || categoryMeta.lighting;
  const catProducts = products.filter((p) => p.categorySlug === slug);
  const catInfo = categories.find((c) => c.slug === slug);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const handleAdd = (product: typeof products[0]) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img src={meta.image} alt={meta.title} className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
              <ChevronRight size={14} />
              <Link to="/products" className="hover:text-cyan-400">Sản phẩm</Link>
              <ChevronRight size={14} />
              <span className="text-white">{meta.title}</span>
            </nav>
            <p className="text-sm font-medium mb-2" style={{ color: meta.color }}>{meta.subtitle}</p>
            <h1 className="text-4xl font-black text-white mb-3">{meta.title}</h1>
            <p className="text-slate-300 max-w-2xl">{meta.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {meta.benefits.map((benefit, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: meta.color + "20" }}>
                <span style={{ color: meta.color }}>✓</span>
              </div>
              <span className="text-slate-300 text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Other categories quick nav */}
        <div className="flex gap-3 flex-wrap mb-10">
          {categories.filter(c => c.slug !== slug).map((cat) => (
            <Link key={cat.slug} to={`/categories/${cat.slug}`} className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-slate-400 hover:text-white hover:border-slate-500 transition-all">
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Products */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">{catProducts.length} sản phẩm <span style={{ color: meta.color }}>{meta.title}</span></h2>
        </div>

        {catProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/30 rounded-2xl">
            <p className="text-slate-400 mb-4">Chưa có sản phẩm trong danh mục này</p>
            <Link to="/products" className="text-cyan-400 hover:underline">Xem tất cả sản phẩm</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: meta.color }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className={j < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"} />
                    ))}
                    <span className="text-slate-400 text-xs ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-black">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-green-400 text-xs bg-green-400/10 px-2 py-0.5 rounded font-medium">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-medium py-2 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                      style={{ background: `linear-gradient(to right, ${meta.color}, ${meta.color}bb)` }}
                    >
                      <ShoppingCart size={14} />
                      {addedId === product.id ? "✓ Thêm" : "Thêm giỏ"}
                    </button>
                    <Link to={`/products/${product.id}`} className="p-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <ArrowRight size={16} className="text-slate-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
