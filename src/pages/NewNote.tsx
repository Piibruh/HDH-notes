import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const NewNote = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <Label htmlFor="excerpt" className="text-foreground">Tóm tắt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Viết tóm tắt ngắn gọn..."
              className="bg-background border-border resize-none"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-foreground">Nội dung</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết nội dung ghi chú..."
              className="min-h-[300px] bg-background border-border resize-none"
              required
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
