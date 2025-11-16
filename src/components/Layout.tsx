import { useState, forwardRef } from 'react';
import { useNavigate, NavLink as RouterNavLink, NavLinkProps, useLocation } from 'react-router-dom';
import { Home, Calendar, CheckSquare, User, PlusCircle, LogOut, Sun, Moon, Menu } from 'lucide-react';
import { useTheme, useUser } from '@/contexts';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// NavLink component inline
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

interface LayoutProps {
  children: React.ReactNode;
}

// Sidebar component inline
const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Đăng xuất thành công',
      description: 'Hẹn gặp lại bạn!',
    });
    navigate('/welcome');
  };

  const menuItems = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/new-note', label: 'Viết Note', icon: PlusCircle },
    { to: '/calendar', label: 'Lịch', icon: Calendar },
    { to: '/completed', label: 'Đã hoàn thành', icon: CheckSquare },
    { to: '/profile', label: 'Cài đặt', icon: User },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar border border-sidebar-border"
      >
        <Menu className="h-6 w-6 text-sidebar-foreground" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-mono font-bold text-accent">HDH Note</h1>
          <p className="text-sm text-muted-foreground mt-1">Quản lý ghi chú thông minh</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-muted transition-colors"
              activeClassName="bg-accent text-accent-foreground hover:bg-accent"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-muted transition-colors"
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-5 w-5" />
                <span className="font-medium">Chế độ tối</span>
              </>
            ) : (
              <>
                <Sun className="h-5 w-5" />
                <span className="font-medium">Chế độ sáng</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-muted transition-colors mt-2"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>

        {/* Credits */}
        <div className="p-4 border-t border-sidebar-border bg-card">
          <p className="text-xs text-muted-foreground mb-2">Developed by:</p>
          <p className="text-sm font-medium text-accent">
            DLL Team
          </p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};
