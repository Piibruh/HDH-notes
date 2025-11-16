import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Calendar, Clock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts';
import { useNotes } from '@/contexts';

// NoteCard component inline
interface NoteCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author?: string;
  completed?: boolean;
  onToggleComplete?: () => void;
}

const NoteCard = ({ 
  id, 
  title, 
  excerpt, 
  date, 
  readTime,
  author = 'DLL Team',
  completed = false,
  onToggleComplete 
}: NoteCardProps) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggle = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onToggleComplete?.();
    }, 600);
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all ${
      isCompleting ? 'animate-complete-note' : ''
    } ${completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <Link to={`/note/${id}`} className="flex-1">
          <h3 className={`text-xl font-mono font-semibold text-foreground hover:text-accent transition-colors ${
            completed ? 'line-through' : ''
          }`}>
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 ml-4">
          <Switch
            checked={completed}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-accent"
            disabled={isCompleting}
            aria-label="Đánh dấu hoàn thành"
          />
        </div>
      </div>
      <p className={`text-muted-foreground mb-4 line-clamp-3 ${
        completed ? 'line-through' : ''
      }`}>
        {excerpt}
      </p>
      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4 text-accent" />
          <span className="font-medium text-accent">{author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
};

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
      <h2 className="text-2xl font-mono font-semibold text-foreground mb-6">Ghi chú của bạn</h2>
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
