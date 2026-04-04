import { Link } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const shipping = totalPrice > 5000000 ? 0 : 150000;
  const discount = 0;
  const finalTotal = totalPrice + shipping - discount;

  if (items.length === 0) {
    return (
      <div className="bg-slate-950 min-h-screen text-white flex items-center justify-center">
        <div className="text-center py-20">
          <ShoppingBag size={64} className="text-slate-700 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-3">Giỏ hàng trống</h2>
          <p className="text-slate-400 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all">
            Khám phá sản phẩm <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-black mb-8">
          Giỏ Hàng <span className="text-cyan-400">({totalItems} sản phẩm)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free shipping notice */}
            {totalPrice < 5000000 && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center gap-3">
                <Truck size={20} className="text-cyan-400 flex-shrink-0" />
                <p className="text-sm text-slate-300">
                  Mua thêm <span className="text-cyan-400 font-bold">{formatPrice(5000000 - totalPrice)}</span> để được miễn phí vận chuyển!
                </p>
              </div>
            )}

            {items.map((item) => (
              <div key={item.product.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex gap-4">
                <Link to={`/products/${item.product.id}`} className="w-24 h-24 flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-cyan-400 text-xs mb-1">{item.product.category}</p>
                      <Link to={`/products/${item.product.id}`}>
                        <h3 className="text-white font-bold hover:text-cyan-300 transition-colors line-clamp-2">{item.product.name}</h3>
                      </Link>
                      <p className="text-slate-400 text-xs mt-1">Thương hiệu: {item.product.brand}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-2 text-white font-semibold min-w-[40px] text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-black">{formatPrice(item.product.price * item.quantity)}</p>
                      {item.quantity > 1 && (
                        <p className="text-slate-500 text-xs">{formatPrice(item.product.price)} / cái</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Link to="/products" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-white font-black text-xl mb-6">Tóm Tắt Đơn Hàng</h2>

              {/* Coupon */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Mã giảm giá"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                    />
                  </div>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 rounded-xl text-sm font-medium transition-colors">
                    Áp dụng
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tạm tính ({totalItems} sp)</span>
                  <span className="text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Phí vận chuyển</span>
                  <span className={shipping === 0 ? "text-green-400 font-medium" : "text-white"}>
                    {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Giảm giá</span>
                    <span className="text-green-400">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-slate-700 pt-3 flex justify-between">
                  <span className="text-white font-bold">Tổng cộng</span>
                  <span className="text-cyan-400 font-black text-xl">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
              >
                Tiến hành thanh toán <ArrowRight size={18} />
              </Link>

              <div className="mt-4 space-y-2">
                {["🔒 Thanh toán bảo mật SSL", "🚚 Giao hàng tận nơi toàn quốc", "↩️ Đổi trả trong 30 ngày"].map((item) => (
                  <p key={item} className="text-slate-500 text-xs text-center">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
