import { useState } from 'react';
import { User, Mail, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: 'Người dùng Demo',
    email: 'demo@hdhnote.com',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Cập nhật thành công',
      description: 'Thông tin cá nhân đã được cập nhật.',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">Thông tin cá nhân</h1>
        <p className="text-muted-foreground">Quản lý thông tin tài khoản của bạn</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Họ và tên
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border-border"
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background border-border"
              placeholder="Nhập email"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Save className="h-4 w-4 mr-2" />
            Lưu thay đổi
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
