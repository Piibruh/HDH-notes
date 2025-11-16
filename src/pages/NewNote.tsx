import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/RichTextEditor';
import { useNotes } from '@/contexts/NotesContext';

const NewNote = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 150);
    
    addNote({
      title,
      content,
      excerpt,
      linkedDate: date ? format(date, 'yyyy-MM-dd') : undefined,
    });

    toast({
      title: 'Tạo ghi chú thành công',
      description: 'Ghi chú của bạn đã được lưu.',
    });
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">Viết Note mới</h1>
        <p className="text-muted-foreground">Tạo ghi chú mới cho công việc của bạn</p>
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
              placeholder="Bắt đầu viết nội dung ghi chú của bạn..."
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
            Đăng Note
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewNote;
