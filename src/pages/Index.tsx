import { Link } from 'react-router-dom';
import { FileText, Calendar, CheckCircle, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-accent" />
            <h1 className="text-2xl font-mono font-bold text-accent">HDH Note</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:text-accent">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Đăng ký
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Hệ thống quản lý ghi chú thông minh</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-mono font-bold text-foreground mb-6 leading-tight">
            Ghi chú <span className="text-accent">dễ dàng</span>,<br />
            quản lý <span className="text-accent">hiệu quả</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            HDH Note giúp bạn tổ chức công việc, ghi chú ý tưởng và theo dõi tiến độ một cách trực quan và chuyên nghiệp.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                Bắt đầu miễn phí
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8">
                Xem Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-mono font-bold text-foreground mb-3">
              Rich Text Editor
            </h3>
            <p className="text-muted-foreground">
              Soạn thảo ghi chú với trình editor mạnh mẽ, hỗ trợ định dạng văn bản đầy đủ như Word.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-mono font-bold text-foreground mb-3">
              Quản lý theo lịch
            </h3>
            <p className="text-muted-foreground">
              Gắn ghi chú vào ngày cụ thể và xem tổng quan công việc theo tháng trên lịch.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-mono font-bold text-foreground mb-3">
              Theo dõi tiến độ
            </h3>
            <p className="text-muted-foreground">
              Đánh dấu hoàn thành và xem lại các ghi chú đã làm xong một cách dễ dàng.
            </p>
          </div>
        </div>
      </section>

      {/* Team Credits */}
      <section className="container mx-auto px-6 py-16 border-t border-border">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-mono font-bold text-foreground">Đội ngũ phát triển</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            Dự án được phát triển bởi:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-card border border-border rounded-lg">
              <span className="text-lg font-semibold text-accent">Kiều Đức Duy</span>
            </div>
            <div className="px-6 py-3 bg-card border border-border rounded-lg">
              <span className="text-lg font-semibold text-accent">Lưu Hương Ly</span>
            </div>
            <div className="px-6 py-3 bg-card border border-border rounded-lg">
              <span className="text-lg font-semibold text-accent">Phạm Đức Long</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 HDH Note. Hệ thống quản lý ghi chú thông minh.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
