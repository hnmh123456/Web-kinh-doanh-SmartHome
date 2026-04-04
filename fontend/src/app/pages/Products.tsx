import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, Star, ShoppingCart, ChevronRight, X } from "lucide-react";
import { products, categories } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const filtered = products
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === "all" || p.categorySlug === selectedCat;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchCat && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Sản phẩm</span>
          </nav>
          <h1 className="text-4xl font-black mb-2">Tất Cả Sản Phẩm</h1>
          <p className="text-slate-400">Khám phá {products.length}+ thiết bị nhà thông minh chính hãng</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 sticky top-24">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-cyan-400" /> Bộ lọc
              </h3>

              {/* Category filter */}
              <div className="mb-6">
                <p className="text-slate-400 text-sm font-medium mb-3">Danh mục</p>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCat("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCat === "all" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-slate-700/50"}`}
                  >
                    Tất cả ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCat(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCat === cat.slug ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-slate-700/50"}`}
                    >
                      {cat.name} ({products.filter(p => p.categorySlug === cat.slug).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="mb-6">
                <p className="text-slate-400 text-sm font-medium mb-3">Khoảng giá</p>
                <div className="space-y-2">
                  {[
                    { label: "Tất cả", min: 0, max: 20000000 },
                    { label: "Dưới 1 triệu", min: 0, max: 1000000 },
                    { label: "1 - 5 triệu", min: 1000000, max: 5000000 },
                    { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
                    { label: "Trên 10 triệu", min: 10000000, max: 20000000 },
                  ].map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange([range.min, range.max])}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${priceRange[0] === range.min && priceRange[1] === range.max ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-slate-700/50"}`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setSelectedCat("all"); setPriceRange([0, 20000000]); setSearch(""); }}
                className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white text-sm py-2 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
              >
                <X size={14} /> Xóa bộ lọc
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Search & sort bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>

            <p className="text-slate-400 text-sm mb-6">Tìm thấy <span className="text-white font-medium">{filtered.length}</span> sản phẩm</p>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
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
                        <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-sm">Hết hàng</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-cyan-400 text-xs font-medium mb-1">{product.category}</p>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-white font-bold mb-2 hover:text-cyan-300 transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className={j < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"} />
                      ))}
                      <span className="text-slate-400 text-xs ml-1">{product.rating} ({product.reviews})</span>
                    </div>
                    <p className="text-slate-400 text-xs mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <p className="text-white font-black">{formatPrice(product.price)}</p>
                        {product.originalPrice && (
                          <p className="text-slate-500 text-xs line-through">{formatPrice(product.originalPrice)}</p>
                        )}
                      </div>
                      {product.originalPrice && (
                        <span className="text-green-400 text-xs bg-green-400/10 px-2 py-0.5 rounded font-medium">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium py-2.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        <ShoppingCart size={15} />
                        {addedId === product.id ? "Đã thêm ✓" : "Thêm vào giỏ"}
                      </button>
                      <Link to={`/products/${product.id}`} className="p-2.5 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                        <ChevronRight size={16} className="text-slate-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg mb-2">Không tìm thấy sản phẩm nào</p>
                <p className="text-slate-500 text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
