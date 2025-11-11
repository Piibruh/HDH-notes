import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Calendar, Clock } from "lucide-react";

// Mock data - trong thực tế sẽ fetch từ API
const mockNoteData: { [key: string]: any } = {
  "1": {
    title: "Giới thiệu về React Hooks",
    content: `React Hooks là một tính năng được giới thiệu trong React 16.8, cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class component.

## Các Hooks cơ bản

### useState
Hook này cho phép bạn thêm React state vào function components. Đây là cách sử dụng cơ bản:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

### useEffect
Hook này cho phép bạn thực hiện side effects trong function components. Nó kết hợp lifecycle methods như componentDidMount, componentDidUpdate, và componentWillUnmount.

\`\`\`javascript
useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);
\`\`\`

## Lợi ích của Hooks

1. **Code ngắn gọn hơn**: Không cần viết class và các phương thức lifecycle phức tạp
2. **Dễ tái sử dụng logic**: Custom Hooks giúp chia sẻ logic giữa các components
3. **Dễ test hơn**: Function components dễ test hơn class components
4. **Performance tốt hơn**: React có thể tối ưu hóa function components tốt hơn

## Kết luận

React Hooks là một bước tiến lớn trong cách chúng ta viết React components. Nó giúp code trở nên sạch sẽ, dễ hiểu và dễ bảo trì hơn.`,
    createdAt: "15/11/2025",
    readTime: "8 phút"
  }
};

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn] = useState(false); // Mock state

  const note = mockNoteData[id || "1"] || mockNoteData["1"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={isLoggedIn} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>

          {/* Note Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-4xl md:text-5xl font-bold font-mono text-primary">
                {note.title}
              </h1>
              {isLoggedIn && (
                <Button variant="outline" size="sm" className="gap-2 shrink-0">
                  <Edit className="h-4 w-4" />
                  Sửa
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{note.createdAt}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{note.readTime} đọc</span>
              </div>
            </div>
          </div>

          {/* Note Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            <div 
              className="space-y-6 text-foreground leading-relaxed"
              style={{ whiteSpace: 'pre-line' }}
            >
              {note.content.split('\n\n').map((paragraph: string, index: number) => {
                // Handle headings
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold font-mono text-primary mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-bold font-mono text-primary mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                
                // Handle code blocks
                if (paragraph.startsWith('```')) {
                  const code = paragraph.replace(/```\w*\n?/g, '');
                  return (
                    <pre key={index} className="bg-secondary p-4 rounded-lg overflow-x-auto border border-border">
                      <code className="text-sm font-mono">{code}</code>
                    </pre>
                  );
                }

                // Handle lists
                if (paragraph.match(/^\d+\./m)) {
                  const items = paragraph.split('\n').filter(line => line.trim());
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 text-foreground">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  );
                }

                // Regular paragraph
                return (
                  <p key={index} className="text-foreground">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NoteDetail;
