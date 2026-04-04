import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, ChevronDown, Search, Phone, Mail } from "lucide-react";

const faqCategories = [
  { id: "general", label: "Tổng quan" },
  { id: "products", label: "Sản phẩm" },
  { id: "installation", label: "Lắp đặt" },
  { id: "payment", label: "Thanh toán" },
  { id: "warranty", label: "Bảo hành" },
  { id: "technical", label: "Kỹ thuật" },
];

const faqs = [
  { id: 1, cat: "general", q: "Nhà thông minh là gì?", a: "Nhà thông minh (Smart Home) là ngôi nhà được trang bị các thiết bị IoT (Internet of Things) có thể kết nối và giao tiếp với nhau qua internet, cho phép chủ nhà điều khiển từ xa qua smartphone, máy tính bảng hoặc giọng nói." },
  { id: 2, cat: "general", q: "Tại sao nên đầu tư vào nhà thông minh?", a: "Nhà thông minh mang lại nhiều lợi ích: tiết kiệm 30-40% điện năng, tăng cường bảo mật với camera AI và khóa thông minh, sự tiện nghi khi điều khiển toàn bộ nhà từ một ứng dụng, và tăng giá trị bất động sản đáng kể." },
  { id: 3, cat: "general", q: "Cần kết nối internet tốc độ bao nhiêu để nhà thông minh hoạt động?", a: "Tối thiểu cần đường truyền 10Mbps cho gia đình nhỏ với 5-10 thiết bị. Với hệ thống đầy đủ 20+ thiết bị bao gồm camera 4K, nên có đường truyền 50-100Mbps để đảm bảo hoạt động mượt mà." },
  { id: 4, cat: "products", q: "SmartNest bán những loại thiết bị nào?", a: "SmartNest cung cấp đầy đủ hệ sinh thái nhà thông minh bao gồm: Trung tâm điều khiển (Hub), đèn LED thông minh, camera an ninh AI, khóa cửa thông minh, điều hòa thông minh, robot hút bụi, cảm biến đa năng, công tắc thông minh, ổ cắm thông minh, và rèm cửa tự động." },
  { id: 5, cat: "products", q: "Các thiết bị có tương thích với Alexa và Google Home không?", a: "Có! Tất cả sản phẩm SmartNest đều tương thích với Amazon Alexa, Google Home và Apple HomeKit. Bạn có thể điều khiển mọi thiết bị bằng giọng nói thông qua các trợ lý AI này." },
  { id: 6, cat: "products", q: "Thiết bị có hoạt động khi mất điện không?", a: "Một số thiết bị như khóa cửa và cảm biến sử dụng pin dự phòng nên vẫn hoạt động khi mất điện. Chúng tôi cũng cung cấp UPS (bộ lưu điện) để đảm bảo SmartHub và router hoạt động liên tục." },
  { id: 7, cat: "installation", q: "Quá trình lắp đặt mất bao lâu?", a: "Thời gian lắp đặt phụ thuộc vào quy mô hệ thống. Gói Starter: 1 ngày, Gói Standard: 2-3 ngày, Gói Premium: 3-5 ngày. Kỹ thuật viên sẽ thông báo lịch cụ thể trước khi thi công." },
  { id: 8, cat: "installation", q: "Có cần đục tường hay đi dây điện mới không?", a: "Không nhất thiết! Hầu hết thiết bị SmartNest đều kết nối không dây qua Wi-Fi, Zigbee hoặc Z-Wave. Chỉ một số thiết bị như công tắc thông minh cần thay thế công tắc hiện có, không cần đục tường." },
  { id: 9, cat: "payment", q: "SmartNest có hỗ trợ trả góp không?", a: "Có, SmartNest hỗ trợ trả góp 0% lãi suất từ 6-24 tháng qua các ngân hàng đối tác: Techcombank, VPBank, HDFC Bank, TPBank, VIB. Điều kiện: hóa đơn từ 5 triệu đồng và có thẻ tín dụng." },
  { id: 10, cat: "payment", q: "Chấp nhận những hình thức thanh toán nào?", a: "SmartNest chấp nhận: tiền mặt, chuyển khoản ngân hàng, thẻ tín dụng/ghi nợ, ví điện tử (MoMo, ZaloPay, VNPay), và trả góp qua ngân hàng." },
  { id: 11, cat: "warranty", q: "Chính sách bảo hành như thế nào?", a: "SmartNest bảo hành 12-36 tháng tùy sản phẩm. Trong thời gian bảo hành: miễn phí sửa chữa, thay thế linh kiện và lỗi do nhà sản xuất. Kỹ thuật viên đến tận nhà trong vòng 24 giờ." },
  { id: 12, cat: "warranty", q: "Sau khi hết bảo hành thì sao?", a: "Sau bảo hành, SmartNest vẫn hỗ trợ sửa chữa và bảo trì có tính phí. Chúng tôi cũng có gói bảo trì định kỳ hàng năm với giá ưu đãi để đảm bảo hệ thống luôn hoạt động tối ưu." },
  { id: 13, cat: "technical", q: "Hệ thống nhà thông minh có thể bị hack không?", a: "SmartNest sử dụng mã hóa AES-256, xác thực 2 lớp và kết nối bảo mật TLS 1.3. Chúng tôi cập nhật bảo mật liên tục và không bao giờ lưu trữ dữ liệu người dùng trên server của bên thứ ba." },
  { id: 14, cat: "technical", q: "Ứng dụng SmartNest có dùng được trên iOS và Android không?", a: "Có, ứng dụng SmartNest có trên cả iOS (iOS 12+) và Android (Android 8+). Hoàn toàn miễn phí và hỗ trợ tiếng Việt. Bạn có thể tạo tài khoản và quản lý nhiều nhà từ một ứng dụng." },
];

export default function FAQ() {
  const [selectedCat, setSelectedCat] = useState("general");
  const [openId, setOpenId] = useState<number | null>(1);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) => {
    const matchCat = f.cat === selectedCat;
    const matchSearch = search === "" || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const searchResults = search ? faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="py-20 text-center bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Câu hỏi thường gặp</span>
          </nav>
          <h1 className="text-4xl font-black mb-4">Câu Hỏi <span className="text-cyan-400">Thường Gặp</span></h1>
          <p className="text-slate-400 mb-8">Tìm câu trả lời nhanh cho những thắc mắc phổ biến nhất</p>
          <div className="max-w-xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm câu hỏi..."
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {search ? (
          <div>
            <p className="text-slate-400 mb-6">Tìm thấy <span className="text-white font-bold">{searchResults.length}</span> kết quả cho "<span className="text-cyan-400">{search}</span>"</p>
            <div className="space-y-3">
              {searchResults.map((faq) => (
                <div key={faq.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800 transition-colors">
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-cyan-400 flex-shrink-0 transition-transform ${openId === faq.id ? "rotate-180" : ""}`} />
                  </button>
                  {openId === faq.id && (
                    <div className="px-5 pb-5 border-t border-slate-700/50">
                      <p className="text-slate-300 text-sm leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Category tabs */}
            <div className="md:w-48 flex-shrink-0">
              <div className="space-y-1">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCat === cat.id ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ list */}
            <div className="flex-1 space-y-3">
              {filtered.map((faq) => (
                <div key={faq.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800 transition-colors">
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-cyan-400 flex-shrink-0 transition-transform ${openId === faq.id ? "rotate-180" : ""}`} />
                  </button>
                  {openId === faq.id && (
                    <div className="px-5 pb-5 border-t border-slate-700/50">
                      <p className="text-slate-300 text-sm leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Still need help */}
        <div className="mt-12 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-black text-white mb-2">Vẫn chưa tìm được câu trả lời?</h3>
          <p className="text-slate-400 mb-6">Liên hệ đội ngũ hỗ trợ của chúng tôi - luôn sẵn sàng giúp đỡ bạn</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:18006868" className="inline-flex items-center gap-2 bg-cyan-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-cyan-400 transition-colors">
              <Phone size={16} /> 1800 6868
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-600 transition-colors">
              <Mail size={16} /> Gửi email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
