import { Link } from 'react-router-dom';
import { FileText, Calendar, CheckCircle, Sparkles, Users, Package, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

// Team members data
const teamMembers = [
  { name: "Kiều Đức Duy", studentId: "22A1201D0073" },
  { name: "Lưu Hương Ly", studentId: "22A1201D0073" },
  { name: "Phạm Đức Long", studentId: "22A1201D0073" },
];

// Software info data
interface Software {
  name: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  version?: string;
}

const softwareList: Software[] = [
  {
    name: "React",
    icon: <FileText className="h-8 w-8 text-accent" />,
    description: "Thư viện JavaScript để xây dựng giao diện người dùng",
    details: "React giúp tạo các component tái sử dụng và quản lý state hiệu quả. Được phát triển bởi Facebook, React là một trong những thư viện phổ biến nhất cho việc xây dựng Single Page Applications.",
    version: "18.3.1"
  },
  {
    name: "TypeScript",
    icon: <FileText className="h-8 w-8 text-accent" />,
    description: "Ngôn ngữ lập trình mở rộng của JavaScript",
    details: "TypeScript thêm kiểu tĩnh vào JavaScript, giúp phát hiện lỗi sớm hơn trong quá trình phát triển và cải thiện khả năng bảo trì code.",
    version: "5.x"
  },
  {
    name: "Vite",
    icon: <Sparkles className="h-8 w-8 text-accent" />,
    description: "Build tool hiện đại và cực nhanh",
    details: "Vite cung cấp trải nghiệm phát triển nhanh chóng với Hot Module Replacement (HMR) tức thì và build production tối ưu.",
    version: "Latest"
  },
  {
    name: "Tailwind CSS",
    icon: <Package className="h-8 w-8 text-accent" />,
    description: "Framework CSS utility-first",
    details: "Tailwind CSS cho phép xây dựng giao diện nhanh chóng với các utility class có sẵn, giúp tùy biến dễ dàng và giảm CSS dư thừa.",
    version: "3.x"
  },
  {
    name: "Shadcn UI",
    icon: <Package className="h-8 w-8 text-accent" />,
    description: "Bộ component UI đẹp và có thể tùy chỉnh",
    details: "Shadcn UI cung cấp các component React được thiết kế đẹp mắt, accessibility tốt và dễ dàng tùy chỉnh theo design system của bạn.",
  },
  {
    name: "TipTap",
    icon: <FileText className="h-8 w-8 text-accent" />,
    description: "Rich text editor mạnh mẽ",
    details: "TipTap là một headless editor framework cho web, cung cấp trải nghiệm soạn thảo văn bản phong phú với nhiều extension và khả năng tùy biến cao.",
    version: "3.10.5"
  },
];

const Index = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(null);

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
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-mono font-bold text-foreground">Đội ngũ phát triển</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Dự án được phát triển bởi: <span className="font-bold text-accent">DLL Team</span>
          </p>
          
          {/* Team Table - Inline */}
          <div className="w-full max-w-2xl mx-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center font-bold text-foreground">Họ và tên</TableHead>
                  <TableHead className="text-center font-bold text-foreground">Mã sinh viên</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center font-medium text-accent">
                      {member.name}
                    </TableCell>
                    <TableCell className="text-center font-mono text-muted-foreground">
                      {member.studentId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Software Info */}
      <section className="container mx-auto px-6 py-16 border-t border-border">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <Package className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-mono font-bold text-foreground">Thông tin phần mềm sử dụng</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Click vào từng công nghệ để xem chi tiết:
          </p>
          
          {/* Software Info - Inline */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {softwareList.map((software, index) => (
              <button
                key={index}
                onClick={() => setSelectedSoftware(software)}
                className="bg-card hover:bg-accent/10 border border-border rounded-lg p-6 transition-all hover:scale-105 hover:shadow-lg flex flex-col items-center gap-3"
              >
                {software.icon}
                <span className="font-mono font-semibold text-foreground text-center">
                  {software.name}
                </span>
              </button>
            ))}
          </div>

          {/* Software Details Dialog */}
          <Dialog open={!!selectedSoftware} onOpenChange={() => setSelectedSoftware(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  {selectedSoftware?.icon}
                  <DialogTitle className="font-mono text-2xl text-accent">
                    {selectedSoftware?.name}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-base">
                  {selectedSoftware?.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <p className="text-muted-foreground leading-relaxed">
                  {selectedSoftware?.details}
                </p>
                {selectedSoftware?.version && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                    <p className="text-sm">
                      <span className="font-semibold text-accent">Phiên bản: </span>
                      <span className="font-mono text-foreground">{selectedSoftware.version}</span>
                    </p>
                  </div>
                )}
                <a
                  href="https://docs.lovable.dev/features/cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:underline text-sm"
                >
                  Tìm hiểu thêm
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </DialogContent>
          </Dialog>
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
