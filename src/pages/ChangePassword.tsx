import { useState } from 'react';
import { Lock, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const ChangePassword = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Lỗi',
        description: 'Mật khẩu mới và xác nhận mật khẩu không khớp.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Đổi mật khẩu thành công',
      description: 'Mật khẩu của bạn đã được cập nhật.',
    });

    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">Đổi mật khẩu</h1>
        <p className="text-muted-foreground">Cập nhật mật khẩu để bảo mật tài khoản</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Mật khẩu hiện tại
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="bg-background border-border"
              placeholder="Nhập mật khẩu hiện tại"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Mật khẩu mới
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="bg-background border-border"
              placeholder="Nhập mật khẩu mới"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Xác nhận mật khẩu mới
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="bg-background border-border"
              placeholder="Nhập lại mật khẩu mới"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Save className="h-4 w-4 mr-2" />
            Đổi mật khẩu
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
