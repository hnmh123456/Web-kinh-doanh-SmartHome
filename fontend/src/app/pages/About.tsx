import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Award, Users, Target, Heart, Cpu, Globe, TrendingUp } from "lucide-react";

const team = [
  { name: "Nguyễn Hoàng Anh", role: "CEO & Co-founder", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", desc: "15+ năm trong ngành công nghệ nhà thông minh" },
  { name: "Trần Thị Minh Châu", role: "CTO & Co-founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", desc: "Tiến sĩ Kỹ thuật Điện, chuyên gia IoT hàng đầu" },
  { name: "Lê Đức Phong", role: "Head of Design", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", desc: "Thiết kế trải nghiệm người dùng cho 200+ dự án" },
  { name: "Phạm Hồng Ngọc", role: "Head of Sales", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", desc: "10+ năm kinh nghiệm phát triển kinh doanh" },
];

const milestones = [
  { year: "2009", title: "Thành lập công ty", desc: "SmartNest được thành lập với vốn đầu tư ban đầu 5 tỷ đồng" },
  { year: "2012", title: "Ra mắt sản phẩm đầu tiên", desc: "Bóng đèn LED thông minh đầu tiên được bán ra thị trường" },
  { year: "2015", title: "Mở rộng toàn quốc", desc: "Phủ sóng 63 tỉnh thành với hơn 200 đại lý ủy quyền" },
  { year: "2018", title: "Đạt 10.000 khách hàng", desc: "Cột mốc 10.000 gia đình tin dùng SmartNest" },
  { year: "2021", title: "Ra mắt hệ sinh thái AI", desc: "Tích hợp trí tuệ nhân tạo vào toàn bộ sản phẩm" },
  { year: "2024", title: "50.000+ khách hàng", desc: "Trở thành thương hiệu nhà thông minh số 1 Việt Nam" },
];

export default function About() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1759844197486-5b3612c7d534?w=1400&q=80"
          alt="Team"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Về chúng tôi</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black mb-6">Chúng Tôi Là <span className="text-cyan-400">SmartNest</span></h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Hơn 15 năm tiên phong trong lĩnh vực nhà thông minh tại Việt Nam, SmartNest mang đến công nghệ tiên tiến nhất để biến ngôi nhà của bạn trở nên thông minh, tiện nghi và an toàn hơn.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Sứ mệnh", color: "cyan", desc: "Mang công nghệ nhà thông minh đến mọi gia đình Việt Nam với giá cả phải chăng và chất lượng quốc tế." },
            { icon: Heart, title: "Tầm nhìn", color: "blue", desc: "Trở thành hệ sinh thái nhà thông minh được yêu thích nhất Đông Nam Á vào năm 2030." },
            { icon: Award, title: "Giá trị cốt lõi", color: "purple", desc: "Đổi mới không ngừng, khách hàng là trung tâm, minh bạch và trách nhiệm trong mọi hoạt động." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center mx-auto mb-4`}>
                <item.icon size={32} className={`text-${item.color}-400`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "15+", label: "Năm kinh nghiệm", icon: TrendingUp },
              { value: "50K+", label: "Khách hàng tin dùng", icon: Users },
              { value: "200+", label: "Sản phẩm chính hãng", icon: Cpu },
              { value: "63", label: "Tỉnh thành phủ sóng", icon: Globe },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon size={32} className="text-cyan-400 mx-auto mb-3" />
                <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                <p className="text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black mb-6">Câu Chuyện Của <span className="text-cyan-400">SmartNest</span></h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>Được thành lập năm 2009 bởi nhóm kỹ sư trẻ đam mê công nghệ, SmartNest bắt đầu từ một garage nhỏ ở Hà Nội với ước mơ đơn giản: mang công nghệ nhà thông minh đến tay mọi người Việt Nam.</p>
              <p>Trong những ngày đầu, chúng tôi tự tay thiết kế từng mạch điện, lập trình từng dòng code và đích thân lắp đặt cho những khách hàng đầu tiên. Sự tận tâm đó đã tạo nên nền tảng văn hóa SmartNest - khách hàng luôn là trung tâm.</p>
              <p>Sau 15 năm, SmartNest đã trở thành thương hiệu nhà thông minh hàng đầu Việt Nam với hơn 50,000 gia đình tin dùng, 500 nhân viên và văn phòng tại Hà Nội, TP.HCM và Đà Nẵng.</p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1730383445472-b45ebd18e386?w=600&q=80"
              alt="Our story"
              className="rounded-2xl w-full object-cover h-80"
            />
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-2xl">
              <div className="text-3xl font-black">2009</div>
              <div className="text-sm opacity-90">Năm thành lập</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-12">Hành Trình Phát Triển</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-700 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 inline-block w-full">
                      <span className="text-cyan-400 font-black text-lg">{m.year}</span>
                      <h3 className="text-white font-bold mt-1">{m.title}</h3>
                      <p className="text-slate-400 text-sm mt-1">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-10 h-10 bg-cyan-500 rounded-full items-center justify-center flex-shrink-0 z-10">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-3">Đội Ngũ Lãnh Đạo</h2>
          <p className="text-slate-400">Những con người tài năng đứng sau SmartNest</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center group hover:border-cyan-500/30 transition-all"
            >
              <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-2 ring-slate-700 group-hover:ring-cyan-500/50 transition-all" />
              <h3 className="text-white font-bold">{member.name}</h3>
              <p className="text-cyan-400 text-sm mb-2">{member.role}</p>
              <p className="text-slate-400 text-xs">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Hãy Cùng Nhau Xây Dựng Ngôi Nhà Mơ Ước</h2>
          <p className="text-slate-400 mb-8">Tham gia cùng 50,000+ gia đình đã tin tưởng SmartNest</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all">
              Liên hệ ngay
            </Link>
            <Link to="/careers" className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-white font-bold px-8 py-4 rounded-xl hover:border-slate-600 transition-all">
              Tuyển dụng
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
