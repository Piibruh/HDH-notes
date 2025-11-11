import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoteCard from "@/components/NoteCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Mock data
const mockNotes = [
  {
    id: 1,
    title: "Giới thiệu về React Hooks",
    summary: "React Hooks là một tính năng mới trong React 16.8 cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class.",
    createdAt: "15/11/2025",
    readTime: "8 phút"
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    summary: "Các phương pháp hay nhất khi làm việc với TypeScript để tạo code an toàn và dễ bảo trì hơn.",
    createdAt: "14/11/2025",
    readTime: "6 phút"
  },
  {
    id: 3,
    title: "Tailwind CSS Tips & Tricks",
    summary: "Khám phá những mẹo và thủ thuật hữu ích khi sử dụng Tailwind CSS để tạo giao diện đẹp và hiệu quả.",
    createdAt: "13/11/2025",
    readTime: "5 phút"
  },
  {
    id: 4,
    title: "Git Workflow cho Team",
    summary: "Hướng dẫn quy trình làm việc với Git hiệu quả cho các dự án nhóm, từ branching đến pull requests.",
    createdAt: "12/11/2025",
    readTime: "10 phút"
  },
  {
    id: 5,
    title: "REST API Design Principles",
    summary: "Các nguyên tắc thiết kế REST API chuẩn và dễ sử dụng cho các ứng dụng web hiện đại.",
    createdAt: "11/11/2025",
    readTime: "7 phút"
  },
  {
    id: 6,
    title: "Database Optimization Techniques",
    summary: "Tối ưu hóa hiệu suất database với các kỹ thuật indexing, query optimization và caching.",
    createdAt: "10/11/2025",
    readTime: "12 phút"
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn] = useState(false); // Mock state

  const filteredNotes = mockNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={isLoggedIn} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-primary">
            Ghi chú của bạn
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nơi lưu trữ và chia sẻ kiến thức, ý tưởng của bạn
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm ghi chú..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Không tìm thấy ghi chú nào phù hợp với "{searchQuery}"
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
