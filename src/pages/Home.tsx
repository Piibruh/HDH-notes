import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NoteCard } from '@/components/NoteCard';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import { useNotes } from '@/contexts/NotesContext';

const Home = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const { notes, toggleComplete } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleComplete = (id: number) => {
    toggleComplete(id);
    toast({
      title: 'Đã chuyển sang hoàn thành',
      description: 'Ghi chú đã được chuyển vào mục đã hoàn thành.',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-8 border border-accent/20">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="h-8 w-8 text-accent" />
          <h1 className="text-4xl font-mono font-bold text-foreground">
            Chào mừng trở lại, <span className="text-accent">{user.name}</span>!
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
