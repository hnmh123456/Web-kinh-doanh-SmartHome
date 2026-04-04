import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, MapPin, Phone, Clock, X } from "lucide-react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1751945965597-71171ec7a458?w=600&q=80", title: "Phòng khách thông minh", cat: "Phòng khách" },
  { src: "https://images.unsplash.com/photo-1752391702044-b3c75fde78bd?w=600&q=80", title: "Hệ thống chiếu sáng LED", cat: "Chiếu sáng" },
  { src: "https://images.unsplash.com/photo-1770197247933-63e02c014cb7?w=600&q=80", title: "Camera an ninh AI", cat: "An ninh" },
  { src: "https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?w=600&q=80", title: "Bảng điều khiển trung tâm", cat: "Điều khiển" },
  { src: "https://images.unsplash.com/photo-1760087616415-62270db23966?w=600&q=80", title: "Hệ thống âm thanh", cat: "Giải trí" },
  { src: "https://images.unsplash.com/photo-1727107463139-97f6911ad4a9?w=600&q=80", title: "Bếp thông minh", cat: "Bếp" },
  { src: "https://images.unsplash.com/photo-1730383445472-b45ebd18e386?w=600&q=80", title: "Phòng ngủ thông minh", cat: "Phòng ngủ" },
  { src: "https://images.unsplash.com/photo-1706809019043-c16ada0165e9?w=600&q=80", title: "Biệt thự Smart Villa", cat: "Ngoại thất" },
  { src: "https://images.unsplash.com/photo-1752262167753-37a0ec83f614?w=600&q=80", title: "Thiết bị IoT đa năng", cat: "Thiết bị" },
  { src: "https://images.unsplash.com/photo-1613331700917-0992a56b4314?w=600&q=80", title: "Khóa cửa thông minh", cat: "An ninh" },
  { src: "https://images.unsplash.com/photo-1762859731349-c9ff2808b672?w=600&q=80", title: "Robot hút bụi AI", cat: "Gia dụng" },
  { src: "https://images.unsplash.com/photo-1759844197486-5b3612c7d534?w=600&q=80", title: "Văn phòng thông minh", cat: "Văn phòng" },
];

const showrooms = [
  {
    city: "TP. Hồ Chí Minh",
    address: "123 Nguyễn Huệ, Quận 1",
    phone: "028 1234 5678",
    hours: "T2-T7: 8:00-18:00 | CN: 9:00-15:00",
    area: "500m²",
    highlight: "Showroom lớn nhất",
  },
  {
    city: "Hà Nội",
    address: "456 Cầu Giấy, Quận Cầu Giấy",
    phone: "024 8765 4321",
    hours: "T2-T7: 8:00-18:00 | CN: 9:00-15:00",
    area: "300m²",
    highlight: "Vừa khai trương",
  },
  {
    city: "Đà Nẵng",
    address: "789 Võ Văn Kiệt, Sơn Trà",
    phone: "0236 6789 012",
    hours: "T2-T7: 8:00-17:30 | CN: Đóng cửa",
    area: "250m²",
    highlight: "Miền Trung",
  },
];

const allCats = ["Tất cả", ...Array.from(new Set(galleryImages.map((g) => g.cat)))];

export default function Showroom() {
  const [selectedCat, setSelectedCat] = useState("Tất cả");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = selectedCat === "Tất cả" ? galleryImages : galleryImages.filter((g) => g.cat === selectedCat);

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="py-20 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Showroom</span>
          </nav>
          <h1 className="text-4xl font-black mb-3">Showroom <span className="text-cyan-400">SmartNest</span></h1>
          <p className="text-slate-400 max-w-xl">Trải nghiệm trực tiếp hơn 200 sản phẩm nhà thông minh tại hệ thống showroom của chúng tôi trên toàn quốc</p>
        </div>
      </div>

      {/* Showroom locations */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black mb-6">Hệ Thống Showroom Toàn Quốc</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {showrooms.map((sr) => (
            <div key={sr.city} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white font-black">{sr.city}</h3>
                <span className="bg-cyan-500/10 text-cyan-400 text-xs font-medium px-2 py-1 rounded-lg">{sr.highlight}</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <MapPin size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  {sr.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone size={14} className="text-cyan-400" />
                  {sr.phone}
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <Clock size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  {sr.hours}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Diện tích: <span className="text-white font-medium">{sr.area}</span></span>
                <Link to="/contact" className="text-cyan-400 hover:text-cyan-300 font-medium">Đặt lịch tham quan →</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">Thư Viện Hình Ảnh</h2>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCat === cat ? "bg-cyan-500 text-white" : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <motion.div
              key={img.src + i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid cursor-pointer group relative rounded-2xl overflow-hidden"
              onClick={() => setLightbox(galleryImages.indexOf(img))}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">{img.title}</p>
                  <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-0.5 rounded-full">{img.cat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700">
            <X size={24} />
          </button>
          <img
            src={galleryImages[lightbox].src.replace("w=600", "w=1200")}
            alt={galleryImages[lightbox].title}
            className="max-w-full max-h-screen object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white font-bold">{galleryImages[lightbox].title}</p>
        </div>
      )}

      {/* Book visit CTA */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-black mb-4">Đặt Lịch Tham Quan Showroom</h2>
          <p className="text-slate-400 mb-8">Trải nghiệm thực tế hơn 200 sản phẩm với sự hướng dẫn của chuyên gia. Hoàn toàn miễn phí!</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all">
            Đặt lịch ngay <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
