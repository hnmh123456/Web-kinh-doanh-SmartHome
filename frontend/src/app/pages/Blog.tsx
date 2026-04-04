import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Clock, ChevronRight, Search, Tag } from "lucide-react";
import { blogPosts } from "../data/blog";

const allCategories = ["Tất cả", "Hướng dẫn", "Đánh giá", "Công nghệ", "Năng lượng", "Chiếu sáng"];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");

  const filtered = blogPosts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Tất cả" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="py-20 text-center bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Blog & Tin tức</span>
          </nav>
          <h1 className="text-4xl font-black mb-4">Blog <span className="text-cyan-400">SmartNest</span></h1>
          <p className="text-slate-400 max-w-xl mx-auto">Kiến thức, hướng dẫn và xu hướng công nghệ nhà thông minh mới nhất</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat ? "bg-cyan-500 text-white" : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filtered[0] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Link to={`/blog/${filtered[0].slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-slate-800/50 border border-slate-700/50 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all">
                <div className="relative h-72 lg:h-auto overflow-hidden">
                  <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Nổi bật</span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium mb-3">
                    <Tag size={14} /> {filtered[0].category}
                  </span>
                  <h2 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors mb-3">{filtered[0].title}</h2>
                  <p className="text-slate-400 mb-4 leading-relaxed">{filtered[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <img src={filtered[0].authorAvatar} alt={filtered[0].author} className="w-6 h-6 rounded-full object-cover" />
                      {filtered[0].author}
                    </div>
                    <span className="flex items-center gap-1"><Clock size={13} /> {filtered[0].readTime} phút đọc</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-cyan-400 text-xs font-medium px-2 py-1 rounded-lg">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">{post.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <img src={post.authorAvatar} alt={post.author} className="w-5 h-5 rounded-full object-cover" />
                      {post.author}
                    </div>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} phút</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400">Không tìm thấy bài viết nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
