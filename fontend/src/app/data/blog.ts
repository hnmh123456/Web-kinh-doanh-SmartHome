export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: number;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "huong-dan-xay-dung-nha-thong-minh-2024",
    title: "Hướng Dẫn Xây Dựng Nhà Thông Minh Toàn Diện 2024",
    excerpt: "Tất cả những gì bạn cần biết để bắt đầu xây dựng hệ thống nhà thông minh từ đầu, từ lựa chọn thiết bị đến lắp đặt và vận hành.",
    content: "Nội dung đầy đủ của bài viết...",
    image: "https://images.unsplash.com/photo-1751945965597-71171ec7a458?w=600&q=80",
    category: "Hướng dẫn",
    author: "Nguyễn Văn Minh",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
    date: "2024-03-15",
    readTime: 12,
    tags: ["Nhà thông minh", "Hướng dẫn", "Cơ bản"],
  },
  {
    id: "2",
    slug: "top-10-thiet-bi-an-ninh-tot-nhat",
    title: "Top 10 Thiết Bị An Ninh Nhà Thông Minh Tốt Nhất 2024",
    excerpt: "Đánh giá và so sánh chi tiết 10 thiết bị an ninh thông minh được ưa chuộng nhất thị trường Việt Nam hiện nay.",
    content: "Nội dung đầy đủ của bài viết...",
    image: "https://images.unsplash.com/photo-1770197247933-63e02c014cb7?w=600&q=80",
    category: "Đánh giá",
    author: "Trần Thị Lan",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
    date: "2024-03-10",
    readTime: 8,
    tags: ["An ninh", "Camera", "Khóa cửa"],
  },
  {
    id: "3",
    slug: "tiet-kiem-dien-voi-nha-thong-minh",
    title: "Tiết Kiệm Điện Lên Đến 40% Với Hệ Thống Nhà Thông Minh",
    excerpt: "Cách nhà thông minh giúp bạn tiết kiệm điện năng đáng kể thông qua tự động hóa và tối ưu hóa năng lượng.",
    content: "Nội dung đầy đủ của bài viết...",
    image: "https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?w=600&q=80",
    category: "Năng lượng",
    author: "Phạm Đức Hùng",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
    date: "2024-03-05",
    readTime: 6,
    tags: ["Tiết kiệm điện", "Năng lượng", "Môi trường"],
  },
  {
    id: "4",
    slug: "chieu-sang-thong-minh-xu-huong-2024",
    title: "Chiếu Sáng Thông Minh - Xu Hướng Nội Thất 2024",
    excerpt: "Khám phá xu hướng chiếu sáng thông minh mới nhất và cách biến ngôi nhà bạn thành không gian sống lý tưởng.",
    content: "Nội dung đầy đủ của bài viết...",
    image: "https://images.unsplash.com/photo-1752391702044-b3c75fde78bd?w=600&q=80",
    category: "Chiếu sáng",
    author: "Lê Thị Hoa",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
    date: "2024-02-28",
    readTime: 7,
    tags: ["Chiếu sáng", "Nội thất", "Xu hướng"],
  },
  {
    id: "5",
    slug: "ai-va-nha-thong-minh-tuong-lai",
    title: "AI Và Nhà Thông Minh: Tương Lai Của Cuộc Sống Hiện Đại",
    excerpt: "Trí tuệ nhân tạo đang thay đổi cách chúng ta sống như thế nào? Khám phá tiềm năng của AI trong hệ sinh thái nhà thông minh.",
    content: "Nội dung đầy đủ của bài viết...",
    image: "https://images.unsplash.com/photo-1752262167753-37a0ec83f614?w=600&q=80",
    category: "Công nghệ",
    author: "Nguyễn Văn Minh",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
    date: "2024-02-20",
    readTime: 10,
    tags: ["AI", "Tương lai", "Công nghệ"],
  },
  {
    id: "6",
    slug: "robot-hut-bui-danh-gia-2024",
    title: "So Sánh Robot Hút Bụi Thông Minh: Đâu Là Lựa Chọn Tốt Nhất?",
    excerpt: "Đánh giá chi tiết các dòng robot hút bụi thông minh phổ biến nhất tại Việt Nam, giúp bạn đưa ra quyết định mua hàng đúng đắn.",
    content: "Nội dung đầy đủ của bài viết...",
    image: "https://images.unsplash.com/photo-1762859731349-c9ff2808b672?w=600&q=80",
    category: "Đánh giá",
    author: "Trần Thị Lan",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
    date: "2024-02-15",
    readTime: 9,
    tags: ["Robot", "Gia dụng", "Đánh giá"],
  },
];
