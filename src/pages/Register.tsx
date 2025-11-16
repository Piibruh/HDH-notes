import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, FileText } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);

    // Mock register logic
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/welcome" className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-accent" />
            <h1 className="text-2xl font-mono font-bold text-accent">HDH Note</h1>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-accent text-accent">
              Đăng nhập
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-mono">Đăng ký</CardTitle>
            <CardDescription>
              Tạo tài khoản mới để bắt đầu hành trình ghi chú của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-secondary"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng ký..." : "Đăng ký"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-primary hover:underline font-semibold">
                  Đăng nhập ngay
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 HDH Note. Developed by <span className="text-accent font-medium">DLL Team</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
