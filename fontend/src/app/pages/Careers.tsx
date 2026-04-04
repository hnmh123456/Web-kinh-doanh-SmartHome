import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, MapPin, Clock, Briefcase, Users, Heart, Zap, Coffee, ArrowRight, X } from "lucide-react";

const jobs = [
  { id: 1, title: "Senior IoT Engineer", dept: "Kỹ thuật", location: "TP.HCM", type: "Full-time", level: "Senior", posted: "2 ngày trước", desc: "Thiết kế và phát triển firmware cho các thiết bị IoT thế hệ tiếp theo của SmartNest.", skills: ["Embedded C/C++", "RTOS", "Zigbee/Z-Wave", "Python"] },
  { id: 2, title: "UX/UI Designer", dept: "Thiết kế", location: "TP.HCM / Remote", type: "Full-time", level: "Mid", posted: "5 ngày trước", desc: "Thiết kế giao diện ứng dụng SmartNest iOS/Android và hệ thống quản lý web.", skills: ["Figma", "Prototyping", "User Research", "Design System"] },
  { id: 3, title: "Sales Manager - Miền Bắc", dept: "Kinh doanh", location: "Hà Nội", type: "Full-time", level: "Manager", posted: "1 tuần trước", desc: "Quản lý đội ngũ kinh doanh và phát triển thị trường khu vực miền Bắc.", skills: ["Sales Management", "B2B", "Smart Home", "Team Leadership"] },
  { id: 4, title: "Backend Developer", dept: "Kỹ thuật", location: "TP.HCM / Remote", type: "Full-time", level: "Mid-Senior", posted: "3 ngày trước", desc: "Phát triển và tối ưu hóa hệ thống cloud backend cho nền tảng SmartNest.", skills: ["Node.js / Go", "AWS/GCP", "MongoDB", "MQTT"] },
  { id: 5, title: "Kỹ thuật viên Lắp đặt", dept: "Kỹ thuật", location: "TP.HCM", type: "Full-time", level: "Junior", posted: "1 tuần trước", desc: "Lắp đặt, cấu hình và bảo trì hệ thống nhà thông minh tại nhà khách hàng.", skills: ["Điện dân dụng", "Mạng máy tính", "Kỹ năng giao tiếp"] },
  { id: 6, title: "Content Creator - Smart Home", dept: "Marketing", location: "TP.HCM / Remote", type: "Full-time", level: "Mid", posted: "4 ngày trước", desc: "Tạo nội dung hấp dẫn về nhà thông minh cho các kênh mạng xã hội và blog.", skills: ["Copywriting", "Video editing", "SEO", "Social Media"] },
];

const perks = [
  { icon: Coffee, title: "Môi trường sáng tạo", desc: "Văn phòng hiện đại, linh hoạt về giờ làm việc và không gian làm việc thoải mái" },
  { icon: Heart, title: "Phúc lợi toàn diện", desc: "Bảo hiểm sức khỏe cao cấp, khám sức khỏe định kỳ và hỗ trợ tâm lý" },
  { icon: Zap, title: "Công nghệ tiên tiến", desc: "Làm việc với stack công nghệ hiện đại nhất trong ngành IoT và AI" },
  { icon: Users, title: "Đồng đội tuyệt vời", desc: "Team đa dạng, giàu kinh nghiệm và đam mê với công nghệ" },
];

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState("Tất cả");
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  const depts = ["Tất cả", ...Array.from(new Set(jobs.map((j) => j.dept)))];
  const filtered = selectedDept === "Tất cả" ? jobs : jobs.filter((j) => j.dept === selectedDept);

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="relative py-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1759844197486-5b3612c7d534?w=1400&q=80" alt="Team" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Tuyển dụng</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black mb-4">Gia Nhập Đội Ngũ <span className="text-cyan-400">SmartNest</span></h1>
            <p className="text-xl text-slate-300 mb-8">Cùng chúng tôi xây dựng tương lai của nhà thông minh. Chúng tôi tìm kiếm những người đam mê công nghệ, sáng tạo và muốn tạo ra sự khác biệt.</p>
            <div className="flex gap-4 flex-wrap text-sm text-slate-400">
              <span className="flex items-center gap-1"><Users size={14} className="text-cyan-400" /> 500+ nhân viên</span>
              <span className="flex items-center gap-1"><MapPin size={14} className="text-cyan-400" /> 3 văn phòng</span>
              <span className="flex items-center gap-1"><Briefcase size={14} className="text-cyan-400" /> {jobs.length} vị trí đang tuyển</span>
            </div>
          </div>
        </div>
      </div>

      {/* Perks */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-center mb-8">Tại Sao Chọn SmartNest?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((perk, i) => (
              <motion.div key={perk.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
                <perk.icon size={32} className="text-cyan-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">{perk.title}</h3>
                <p className="text-slate-400 text-sm">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-black">Vị Trí Đang Tuyển ({filtered.length})</h2>
          <div className="flex gap-2 flex-wrap">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedDept === d ? "bg-cyan-500 text-white" : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{job.title}</h3>
                  <p className="text-cyan-400 text-sm">{job.dept}</p>
                </div>
                <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-full font-medium">Đang tuyển</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">{job.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((s) => (
                  <span key={s} className="bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded-lg">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {job.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">{job.posted}</span>
                  <button onClick={() => setSelectedJob(job)} className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                    Ứng tuyển <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Apply modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedJob(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-white font-black text-xl">{selectedJob.title}</h3>
                <p className="text-cyan-400 text-sm">{selectedJob.dept} • {selectedJob.location}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-2 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Họ và tên *</label>
                <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Email *</label>
                <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Số điện thoại</label>
                <input type="tel" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm" placeholder="0901 234 567" />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Link CV / Portfolio</label>
                <input type="url" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm" placeholder="https://..." />
              </div>
              <button type="submit" onClick={() => setSelectedJob(null)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all">
                Gửi đơn ứng tuyển
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
