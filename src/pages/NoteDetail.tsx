import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNotes } from '@/contexts/NotesContext';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { notes, toggleComplete, deleteNote } = useNotes();

  const note = notes.find(n => n.id === Number(id));

  if (!note) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground">Không tìm thấy ghi chú.</p>
          <Link to="/">
            <Button variant="outline" className="mt-4">
              Quay về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleMarkComplete = () => {
    toggleComplete(note.id);
    toast({
      title: 'Đã chuyển sang hoàn thành',
      description: 'Ghi chú đã được chuyển vào mục đã hoàn thành.',
    });
    navigate('/');
  };

  const handleDelete = () => {
    deleteNote(note.id);
    toast({
      title: 'Đã xóa ghi chú',
      description: 'Ghi chú đã được xóa thành công.',
      variant: 'destructive',
    });
    navigate('/');
  };

  const renderContent = (html: string) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-blockquote:text-muted-foreground prose-ul:text-foreground prose-ol:text-foreground" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-accent">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button
            onClick={handleMarkComplete}
            className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <CheckCircle className="h-4 w-4" />
            Đánh dấu hoàn thành
          </Button>
          <Link to={`/edit/${id}`}>
            <Button variant="outline" className="gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Edit className="h-4 w-4" />
              Sửa
            </Button>
          </Link>
          <Button
            onClick={handleDelete}
            variant="outline"
            className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
            Xóa
          </Button>
        </div>
      </div>

      {/* Note Content */}
      <article className="bg-card rounded-lg border border-border p-8 shadow-sm">
        <h1 className="text-4xl font-mono font-bold text-foreground mb-4">{note.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{note.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{note.readTime}</span>
          </div>
        </div>
        {renderContent(note.content)}
      </article>
    </div>
  );
};

export default NoteDetail;
