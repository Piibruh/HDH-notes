import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/RichTextEditor';
import { useNotes } from '@/contexts/NotesContext';
import { Link } from 'react-router-dom';
import { useAutoSave } from '@/hooks/useAutoSave';

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { notes, updateNote } = useNotes();
  
  const note = notes.find(n => n.id === Number(id));
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      if (note.linkedDate) {
        setDate(new Date(note.linkedDate));
      }
    } else {
      toast({
        title: 'Không tìm thấy ghi chú',
        description: 'Ghi chú không tồn tại.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [note, navigate, toast]);

  // Auto-save function
  const autoSave = useCallback(() => {
    if (!note || !hasChanges) return;
    
    const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 150);
    
    updateNote(note.id, {
      title,
      content,
      excerpt,
      linkedDate: date ? format(date, 'yyyy-MM-dd') : undefined,
    });

    setHasChanges(false);
  }, [note, title, content, date, updateNote, hasChanges]);

  // Enable auto-save with 2 second delay
  useAutoSave({
    data: { title, content, date },
    onSave: autoSave,
    delay: 2000,
    enabled: hasChanges && !!note,
  });

  // Track changes
  useEffect(() => {
    if (note) {
      const titleChanged = title !== note.title;
      const contentChanged = content !== note.content;
      const dateChanged = date ? format(date, 'yyyy-MM-dd') !== note.linkedDate : !!note.linkedDate;
      
      setHasChanges(titleChanged || contentChanged || dateChanged);
    }
  }, [title, content, date, note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note) return;

    const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 150);
    
    updateNote(note.id, {
      title,
      content,
      excerpt,
      linkedDate: date ? format(date, 'yyyy-MM-dd') : undefined,
    });

    setHasChanges(false);
    
    toast({
      title: 'Cập nhật thành công',
      description: 'Ghi chú đã được lưu.',
    });
    navigate(`/note/${note.id}`);
  };

  if (!note) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-mono font-bold text-foreground mb-2">Chỉnh sửa ghi chú</h1>
          <p className="text-muted-foreground">
            {hasChanges ? 'Đang tự động lưu...' : 'Đã lưu tự động'}
          </p>
        </div>
        <Link to={`/note/${id}`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Tiêu đề</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề ghi chú..."
              className="bg-background border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Nội dung</Label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Chỉnh sửa nội dung ghi chú của bạn..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Gắn vào ngày (tùy chọn)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-background border-border"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: vi }) : <span>Chọn ngày</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Save className="h-4 w-4 mr-2" />
            Lưu thay đổi
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
