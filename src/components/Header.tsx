import { Link, useLocation } from "react-router-dom";
import { FileText, PenSquare, LogOut, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header = ({ isLoggedIn = false }: HeaderProps) => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <FileText className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <h1 className="text-2xl font-bold font-mono text-primary">
              HDH Note
            </h1>
          </Link>

          <nav className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Button
                  asChild
                  variant={location.pathname === "/new-note" ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Link to="/new-note">
                    <PenSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Viết Note</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-destructive hover:text-destructive"
                  onClick={() => {
                    // Logout logic here
                    console.log("Logout");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Đăng xuất</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant={location.pathname === "/login" ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Link to="/login">
                    <LogIn className="h-4 w-4" />
                    Đăng nhập
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={location.pathname === "/register" ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                >
                  <Link to="/register">
                    <UserPlus className="h-4 w-4" />
                    Đăng ký
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
