import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NoteCard } from '@/components/NoteCard';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Giới thiệu về React Hooks',
      excerpt: 'React Hooks là một tính năng mới trong React 16.8 cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class.',
      date: '15/11/2025',
      readTime: '8 phút',
      completed: false,
    },
    {
      id: 2,
      title: 'TypeScript Best Practices',
      excerpt: 'Các phương pháp hay nhất khi làm việc với TypeScript để tạo code an toàn và dễ bảo trì hơn.',
      date: '14/11/2025',
      readTime: '6 phút',
      completed: false,
    },
    {
      id: 3,
      title: 'Tailwind CSS Tips & Tricks',
      excerpt: 'Khám phá những mẹo và thủ thuật hữu ích khi sử dụng Tailwind CSS để tạo giao diện đẹp và hiệu quả.',
      date: '13/11/2025',
      readTime: '5 phút',
      completed: false,
    },
    {
      id: 4,
      title: 'Git Workflow cho Team',
      excerpt: 'Hướng dẫn quy trình làm việc với Git hiệu quả cho các dự án nhóm, từ branching đến pull requests.',
      date: '12/11/2025',
      readTime: '10 phút',
      completed: false,
    },
    {
      id: 5,
      title: 'REST API Design Principles',
      excerpt: 'Các nguyên tắc thiết kế REST API chuẩn và dễ sử dụng cho các ứng dụng web hiện đại.',
      date: '11/11/2025',
      readTime: '7 phút',
      completed: false,
    },
    {
      id: 6,
      title: 'Database Optimization Techniques',
      excerpt: 'Tối ưu hóa hiệu suất database với các kỹ thuật indexing, query optimization và caching.',
      date: '10/11/2025',
      readTime: '12 phút',
      completed: false,
    },
  ]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleComplete = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, completed: !note.completed } 
        : note
    ));
    toast({
      title: 'Cập nhật thành công',
      description: 'Trạng thái ghi chú đã được thay đổi.',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-8 border border-accent/20">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="h-8 w-8 text-accent" />
          <h1 className="text-4xl font-mono font-bold text-foreground">
            Chào mừng trở lại, <span className="text-accent">Người dùng</span>!
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Bạn có {notes.length} ghi chú. Hãy tiếp tục sáng tạo và hoàn thành mục tiêu của bạn!
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm kiếm ghi chú..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground">
            {searchQuery ? 'Không tìm thấy ghi chú nào.' : 'Chưa có ghi chú nào. Hãy tạo ghi chú đầu tiên!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard 
              key={note.id} 
              {...note}
              onToggleComplete={() => handleToggleComplete(note.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
