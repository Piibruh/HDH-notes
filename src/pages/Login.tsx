import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, FileText } from 'lucide-react';
import { useUser } from '@/contexts';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: email.split('@')[0],
      email: email,
    });
    toast({
      title: 'Đăng nhập thành công',
      description: 'Chào mừng bạn trở lại!',
    });
    navigate('/');
  };

  const handleDemoLogin = () => {
    login({
      name: 'Người dùng Demo',
      email: 'demo@hdhnote.com',
    });
    toast({
      title: 'Đăng nhập Demo',
      description: 'Đã đăng nhập với tài khoản demo.',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/welcome" className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-accent" />
            <h1 className="text-2xl font-mono font-bold text-accent">HDH Note</h1>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="border-accent text-accent">
              Đăng ký
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-mono font-bold text-accent mb-2">HDH Note</h1>
          <p className="text-muted-foreground">Đăng nhập vào tài khoản của bạn</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="bg-background border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-background border-border"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Đăng nhập
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Hoặc</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              onClick={handleDemoLogin}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Đăng nhập Tài khoản Demo
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-accent hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>

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

export default Login;
