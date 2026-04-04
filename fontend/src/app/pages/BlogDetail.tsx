import { Link, useParams } from "react-router";
import { Clock, Tag, ChevronRight, ArrowLeft, Facebook, Link2, Twitter } from "lucide-react";
import { blogPosts } from "../data/blog";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h2>
          <Link to="/blog" className="text-cyan-400 hover:underline">← Quay lại Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link to="/blog" className="hover:text-cyan-400">Blog</Link>
          <ChevronRight size={14} />
          <span className="text-white line-clamp-1">{post.title}</span>
        </nav>

        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 bg-cyan-500/10 text-cyan-400 text-sm font-medium px-3 py-1 rounded-full">
            <Tag size={12} /> {post.category}
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded-full">#{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-white font-medium text-sm">{post.author}</p>
              <p className="text-slate-500 text-xs">{new Date(post.date).toLocaleDateString("vi-VN")}</p>
            </div>
          </div>
          <span className="flex items-center gap-2 text-slate-400 text-sm">
            <Clock size={15} /> {post.readTime} phút đọc
          </span>
        </div>

        {/* Hero image */}
        <img src={post.image} alt={post.title} className="w-full h-72 md:h-96 object-cover rounded-2xl mb-8" />

        {/* Content */}
        <div className="prose prose-invert prose-slate max-w-none">
          <p className="text-slate-300 text-lg leading-relaxed mb-6">{post.excerpt}</p>

          <h2 className="text-white text-2xl font-black mt-8 mb-4">Tại sao nhà thông minh lại quan trọng?</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Trong thời đại công nghệ 4.0, nhà thông minh không còn là xa xỉ mà đã trở thành xu hướng tất yếu. Với hệ thống nhà thông minh, bạn có thể kiểm soát toàn bộ ngôi nhà chỉ với một chiếc điện thoại, bất kể bạn đang ở đâu trên thế giới.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Không chỉ mang lại sự tiện nghi, nhà thông minh còn giúp tiết kiệm đáng kể điện năng tiêu thụ thông qua các chế độ tự động hóa thông minh. Theo nghiên cứu, các gia đình sử dụng thiết bị nhà thông minh có thể tiết kiệm được 30-40% hóa đơn điện mỗi tháng.
          </p>

          <h2 className="text-white text-2xl font-black mt-8 mb-4">Các thành phần cơ bản của hệ thống nhà thông minh</h2>
          <ul className="space-y-3 text-slate-300 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">1.</span>
              <span><strong className="text-white">Trung tâm điều khiển (Hub):</strong> Bộ não của toàn bộ hệ thống, kết nối và điều phối tất cả thiết bị.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">2.</span>
              <span><strong className="text-white">Hệ thống chiếu sáng:</strong> Đèn LED thông minh với điều chỉnh độ sáng và màu sắc theo thời gian thực.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">3.</span>
              <span><strong className="text-white">Hệ thống an ninh:</strong> Camera AI, khóa cửa thông minh và cảm biến chuyển động.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">4.</span>
              <span><strong className="text-white">Điều hòa không khí thông minh:</strong> Kiểm soát nhiệt độ tự động theo thói quen sinh hoạt.</span>
            </li>
          </ul>

          <h2 className="text-white text-2xl font-black mt-8 mb-4">Bắt đầu từ đâu?</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Bước đầu tiên và quan trọng nhất là xác định nhu cầu thực sự của bạn. Bạn muốn tập trung vào an ninh, tiết kiệm điện hay sự tiện nghi? Từ đó, chuyên gia SmartNest sẽ tư vấn giải pháp phù hợp nhất với ngân sách và không gian của bạn.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và nhận báo giá chi tiết cho ngôi nhà của bạn.
          </p>
        </div>

        {/* Share */}
        <div className="flex items-center gap-4 mt-10 pt-8 border-t border-slate-800">
          <span className="text-slate-400 text-sm">Chia sẻ:</span>
          {[
            { icon: Facebook, label: "Facebook", color: "hover:bg-blue-600" },
            { icon: Twitter, label: "Twitter", color: "hover:bg-sky-500" },
            { icon: Link2, label: "Copy link", color: "hover:bg-slate-600" },
          ].map(({ icon: Icon, label, color }) => (
            <button key={label} className={`p-2 bg-slate-800 ${color} rounded-lg transition-colors text-slate-400 hover:text-white`}>
              <Icon size={18} />
            </button>
          ))}
        </div>

        {/* Back & Related */}
        <div className="mt-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
            <ArrowLeft size={16} /> Quay lại Blog
          </Link>

          <h3 className="text-xl font-black text-white mb-6">Bài viết liên quan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="group block bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all">
                <img src={p.image} alt={p.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="p-4">
                  <p className="text-cyan-400 text-xs mb-1">{p.category}</p>
                  <p className="text-white font-bold text-sm line-clamp-2 group-hover:text-cyan-300 transition-colors">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
