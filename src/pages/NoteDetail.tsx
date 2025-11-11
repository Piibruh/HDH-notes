import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);

  const mockNote = {
    id,
    title: 'Giới thiệu về React Hooks',
    date: '15/11/2025',
    readTime: '8 phút',
    content: `React Hooks là một tính năng mới trong React 16.8 cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class.

## Tại sao cần Hooks?

Trước đây, nếu bạn bắt đầu viết một function component và sau đó nhận ra bạn cần thêm state vào nó, bạn phải chuyển nó thành class. Bây giờ, bạn có thể sử dụng Hook bên trong function component hiện có.

## useState Hook

\`useState\` là một Hook cho phép bạn thêm React state vào function component.

\`\`\`javascript
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

\`useEffect\` cho phép bạn thực hiện side effects trong function components:

- Fetching dữ liệu
- Thiết lập subscriptions
- Thay đổi DOM

## Kết luận

React Hooks giúp code của bạn sạch hơn và dễ đọc hơn. Nó loại bỏ sự cần thiết của các classes trong nhiều trường hợp.`,
  };

  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
    toast({
      title: isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành',
      description: 'Trạng thái ghi chú đã được cập nhật.',
    });
  };

  const handleDelete = () => {
    toast({
      title: 'Đã xóa ghi chú',
      description: 'Ghi chú đã được xóa thành công.',
      variant: 'destructive',
    });
    navigate('/');
  };

  const renderContent = (text: string) => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeLanguage = '';

    return lines.map((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          codeLanguage = line.slice(3).trim();
          inCodeBlock = true;
          return null;
        } else {
          inCodeBlock = false;
          return null;
        }
      }

      if (inCodeBlock) {
        return (
          <div key={index} className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto my-2">
            <code className="text-foreground">{line}</code>
          </div>
        );
      }

      // Headers
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-mono font-bold text-foreground mt-8 mb-4">
            {line.slice(3)}
          </h2>
        );
      }

      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-foreground ml-6 mb-2">
            {line.slice(2)}
          </li>
        );
      }

      // Inline code
      const codeRegex = /`([^`]+)`/g;
      const parts = line.split(codeRegex);
      const rendered = parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="bg-muted px-2 py-1 rounded text-accent font-mono text-sm">
            {part}
          </code>
        ) : (
          part
        )
      );

      // Regular paragraph
      return (
        <p key={index} className="text-foreground mb-4 leading-relaxed">
          {rendered}
        </p>
      );
    });
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
            className={`gap-2 ${
              isCompleted 
                ? 'bg-muted hover:bg-muted/90' 
                : 'bg-accent hover:bg-accent/90'
            } text-accent-foreground`}
          >
            <CheckCircle className="h-4 w-4" />
            {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
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
        <h1 className="text-4xl font-mono font-bold text-foreground mb-4">{mockNote.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{mockNote.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{mockNote.readTime}</span>
          </div>
        </div>
        <div className="prose prose-lg max-w-none">{renderContent(mockNote.content)}</div>
      </article>
    </div>
  );
};

export default NoteDetail;
