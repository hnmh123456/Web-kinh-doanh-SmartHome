import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, CreditCard, Smartphone, Building, CheckCircle, Lock, Package } from "lucide-react";
import { useCart } from "../context/CartContext";

const steps = ["Thông tin giao hàng", "Phương thức thanh toán", "Xác nhận đơn hàng"];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  const [shipping] = useState({ name: "", phone: "", email: "", address: "", city: "", note: "" });
  const [shippingForm, setShippingForm] = useState(shipping);
  const [payMethod, setPayMethod] = useState("cod");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const shippingFee = totalPrice > 5000000 ? 0 : 150000;
  const total = totalPrice + shippingFee;

  const handlePlaceOrder = () => {
    setCompleted(true);
    clearCart();
  };

  if (completed) {
    return (
      <div className="bg-slate-950 min-h-screen text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Đặt Hàng Thành Công!</h1>
          <p className="text-slate-400 mb-2">Mã đơn hàng: <span className="text-cyan-400 font-bold">#SN{Date.now().toString().slice(-6)}</span></p>
          <p className="text-slate-400 mb-8">Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút. Đơn hàng dự kiến giao trong 2-3 ngày.</p>
          <div className="space-y-3">
            <Link to="/products" className="block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all">
              Tiếp tục mua sắm
            </Link>
            <Link to="/account" className="block bg-slate-800 border border-slate-700 text-white font-bold py-3 rounded-xl hover:border-slate-600 transition-all">
              Xem đơn hàng
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-slate-950 min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <Package size={48} className="text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">Giỏ hàng trống. Hãy thêm sản phẩm trước khi thanh toán.</p>
          <Link to="/products" className="text-cyan-400 hover:underline">← Về trang sản phẩm</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link to="/cart" className="hover:text-cyan-400">Giỏ hàng</Link>
          <ChevronRight size={14} />
          <span className="text-white">Thanh toán</span>
        </nav>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= step ? "bg-cyan-500 text-white" : "bg-slate-800 border border-slate-700 text-slate-500"}`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${i <= step ? "text-white font-medium" : "text-slate-500"}`}>{s}</span>
              {i < steps.length - 1 && <ChevronRight size={16} className="text-slate-600 flex-shrink-0" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 0: Shipping info */}
            {step === 0 && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-6">Thông Tin Giao Hàng</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.name}
                        onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Số điện thoại *</label>
                      <input
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                        placeholder="0901 234 567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Địa chỉ giao hàng *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                      placeholder="Số nhà, tên đường, phường/xã"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Tỉnh/Thành phố</label>
                    <select
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm"
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      <option>TP. Hồ Chí Minh</option>
                      <option>Hà Nội</option>
                      <option>Đà Nẵng</option>
                      <option>Cần Thơ</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Ghi chú cho shipper</label>
                    <textarea
                      value={shippingForm.note}
                      onChange={(e) => setShippingForm({ ...shippingForm, note: e.target.value })}
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm resize-none"
                      placeholder="VD: Giao giờ hành chính, để ở cổng..."
                    />
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all"
                  >
                    Tiếp theo: Phương thức thanh toán
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-6">Phương Thức Thanh Toán</h2>
                <div className="space-y-3 mb-6">
                  {[
                    { id: "cod", icon: Package, label: "Thanh toán khi nhận hàng (COD)", desc: "Thanh toán tiền mặt khi nhận được hàng" },
                    { id: "momo", icon: Smartphone, label: "Ví MoMo / ZaloPay", desc: "Thanh toán nhanh qua ví điện tử" },
                    { id: "transfer", icon: Building, label: "Chuyển khoản ngân hàng", desc: "Chuyển khoản qua tài khoản ngân hàng" },
                    { id: "card", icon: CreditCard, label: "Thẻ tín dụng / ghi nợ", desc: "Visa, Mastercard, JCB, UnionPay" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${payMethod === method.id ? "border-cyan-500 bg-cyan-500/10" : "border-slate-700 hover:border-slate-600"}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={payMethod === method.id}
                        onChange={() => setPayMethod(method.id)}
                        className="mt-1 accent-cyan-500"
                      />
                      <method.icon size={20} className={payMethod === method.id ? "text-cyan-400" : "text-slate-500"} />
                      <div>
                        <p className="text-white font-medium">{method.label}</p>
                        <p className="text-slate-400 text-sm">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 bg-slate-700 text-white font-medium py-3.5 rounded-xl hover:bg-slate-600 transition-colors">
                    ← Quay lại
                  </button>
                  <button onClick={() => setStep(2)} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all">
                    Xem lại đơn hàng →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Confirm */}
            {step === 2 && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-6">Xác Nhận Đơn Hàng</h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 py-3 border-b border-slate-700/50">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{item.product.name}</p>
                        <p className="text-slate-400 text-xs">x{item.quantity}</p>
                      </div>
                      <p className="text-white font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 mb-6 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Tạm tính</span><span className="text-white">{formatPrice(totalPrice)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Vận chuyển</span><span className={shippingFee === 0 ? "text-green-400" : "text-white"}>{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</span></div>
                  <div className="flex justify-between pt-2 border-t border-slate-700">
                    <span className="text-white font-bold">Tổng cộng</span>
                    <span className="text-cyan-400 font-black text-lg">{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 bg-slate-700 text-white font-medium py-3.5 rounded-xl hover:bg-slate-600 transition-colors">
                    ← Quay lại
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    <Lock size={16} /> Đặt hàng ngay
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 sticky top-24">
              <h3 className="text-white font-bold mb-4">Đơn hàng ({items.length} sản phẩm)</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-2 text-sm">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs line-clamp-2">{item.product.name}</p>
                      <p className="text-slate-400 text-xs">x{item.quantity}</p>
                    </div>
                    <p className="text-white text-xs font-bold flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 pt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Tổng cộng</span>
                  <span className="text-cyan-400 font-black">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
