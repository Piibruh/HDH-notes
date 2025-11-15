import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

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

export const NoteCard = ({ 
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
