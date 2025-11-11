import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>© 2025 HDH Note</span>
            <span className="text-primary">·</span>
            <span>All rights reserved</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Made with</span>
            <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
            <span className="text-muted-foreground">by</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-primary font-mono font-semibold hover:underline cursor-pointer transition-colors">
              Kiều Đức Duy
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-primary font-mono font-semibold hover:underline cursor-pointer transition-colors">
              Lưu Hương Ly
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-primary font-mono font-semibold hover:underline cursor-pointer transition-colors">
              Phạm Đức Long
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
