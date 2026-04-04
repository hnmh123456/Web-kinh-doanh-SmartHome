import { useState } from "react";
import { Link, useParams } from "react-router";
import { Star, ShoppingCart, ChevronRight, Check, Shield, Truck, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");
  const [openSpec, setOpenSpec] = useState(true);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  if (!product) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
          <Link to="/products" className="text-cyan-400 hover:underline">← Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-cyan-400">Sản phẩm</Link>
          <ChevronRight size={14} />
          <Link to={`/categories/${product.categorySlug}`} className="hover:text-cyan-400">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-white line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-cyan-500 text-white text-sm font-bold px-3 py-1.5 rounded-xl">
                  {product.badge}
                </span>
              )}
            </div>
            {/* Thumbnail row */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer ${i === 1 ? "border-cyan-500" : "border-slate-700 hover:border-slate-500"} transition-colors`}>
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-cyan-400 text-sm font-medium mb-2">{product.brand} • {product.category}</p>
            <h1 className="text-3xl font-black text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} className={j < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"} />
                ))}
              </div>
              <span className="text-yellow-400 font-semibold">{product.rating}</span>
              <span className="text-slate-400 text-sm">({product.reviews} đánh giá)</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.inStock ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                {product.inStock ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
              <span className="text-4xl font-black text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-slate-500 text-xl line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="bg-green-500/10 text-green-400 font-bold px-3 py-1 rounded-lg text-sm">
                    Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Features */}
            <div className="mb-6">
              <p className="text-slate-400 text-sm font-medium mb-3">Tính năng nổi bật:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check size={15} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">−</button>
                <span className="px-4 py-3 text-white font-semibold min-w-[50px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">+</button>
              </div>
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
              >
                <ShoppingCart size={20} />
                {added ? "✓ Đã thêm vào giỏ!" : "Thêm vào giỏ hàng"}
              </button>
            </div>

            <Link to="/contact" className="w-full block text-center border border-cyan-500 text-cyan-400 font-bold py-3.5 px-6 rounded-xl hover:bg-cyan-500/10 transition-colors mb-6">
              Yêu cầu tư vấn miễn phí
            </Link>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: `BH ${product.specs["Bảo hành"]}` },
                { icon: Truck, label: "Giao hàng miễn phí" },
                { icon: RotateCcw, label: "Đổi trả 30 ngày" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
                  <Icon size={20} className="text-cyan-400 mx-auto mb-1" />
                  <p className="text-slate-300 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-1 mb-6 border-b border-slate-800">
            {[
              { id: "desc", label: "Mô tả" },
              { id: "specs", label: "Thông số kỹ thuật" },
              { id: "reviews", label: `Đánh giá (${product.reviews})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-cyan-500 text-cyan-400" : "border-transparent text-slate-400 hover:text-white"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "desc" && (
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed mb-4">{product.description}</p>
              <p className="text-slate-300 leading-relaxed">
                {product.name} được thiết kế dành cho những gia đình hiện đại, yêu thích sự tiện nghi và công nghệ. Với các tính năng tiên tiến và giao diện thân thiện người dùng, thiết bị này sẽ trở thành trung tâm của hệ sinh thái nhà thông minh của bạn.
              </p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-3 px-4 bg-slate-800/50 rounded-xl">
                  <span className="text-slate-400 text-sm">{key}</span>
                  <span className="text-white text-sm font-medium">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {[
                { name: "Nguyễn Văn A", rating: 5, date: "15/03/2024", comment: "Sản phẩm tuyệt vời, đúng như mô tả. Lắp đặt dễ dàng, hoạt động ổn định." },
                { name: "Trần Thị B", rating: 4, date: "10/03/2024", comment: "Chất lượng tốt, nhưng hộp hơi bị móp. Nhân viên hỗ trợ rất nhiệt tình." },
                { name: "Lê Văn C", rating: 5, date: "05/03/2024", comment: "Mua lần 2 rồi, vẫn rất hài lòng với sản phẩm này. Sẽ tiếp tục ủng hộ SmartNest." },
              ].map((r, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-semibold">{r.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={12} className={j < r.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"} />
                        ))}
                      </div>
                    </div>
                    <span className="text-slate-500 text-xs">{r.date}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-black mb-6">Sản Phẩm Liên Quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-white font-bold text-sm mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors">{p.name}</p>
                    <p className="text-cyan-400 font-semibold text-sm">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
