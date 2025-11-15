import { useState } from "react";
import { Server, Terminal, Database, Code, Heart, Box } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Software {
  name: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  version?: string;
}

const softwareList: Software[] = [
  {
    name: "VMware Workstation",
    icon: <Box className="h-8 w-8" />,
    description: "Phần mềm ảo hóa máy tính",
    details: "VMware Workstation là một hypervisor cho phép chạy nhiều hệ điều hành trên cùng một máy tính vật lý. Được sử dụng để phát triển và kiểm thử ứng dụng trong môi trường Linux.",
    version: "17.x"
  },
  {
    name: "Arch Linux",
    icon: <Terminal className="h-8 w-8" />,
    description: "Hệ điều hành Linux",
    details: "Arch Linux là một bản phân phối Linux độc lập, được thiết kế để đơn giản, hiện đại và thực dụng. Cung cấp môi trường phát triển linh hoạt và mạnh mẽ cho dự án.",
    version: "Latest"
  },
  {
    name: "Apache",
    icon: <Server className="h-8 w-8" />,
    description: "Web Server",
    details: "Apache HTTP Server là một máy chủ web mã nguồn mở phổ biến nhất thế giới. Được sử dụng để phục vụ các trang web và ứng dụng web, xử lý các yêu cầu HTTP/HTTPS.",
    version: "2.4.x"
  },
  {
    name: "MariaDB",
    icon: <Database className="h-8 w-8" />,
    description: "Hệ quản trị cơ sở dữ liệu",
    details: "MariaDB là một hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở, được phát triển từ MySQL. Lưu trữ và quản lý dữ liệu ghi chú, người dùng và các thông tin khác của ứng dụng.",
    version: "10.x"
  },
  {
    name: "PHP",
    icon: <Code className="h-8 w-8" />,
    description: "Ngôn ngữ lập trình Backend",
    details: "PHP là ngôn ngữ lập trình kịch bản phía máy chủ được thiết kế cho phát triển web. Xử lý logic nghiệp vụ, kết nối cơ sở dữ liệu và tạo API cho ứng dụng.",
    version: "8.x"
  },
  {
    name: "Lovable",
    icon: <Heart className="h-8 w-8" />,
    description: "Nền tảng phát triển AI",
    details: "Lovable là nền tảng phát triển ứng dụng web được hỗ trợ bởi AI. Giúp xây dựng giao diện người dùng React hiện đại, responsive với TypeScript và Tailwind CSS một cách nhanh chóng.",
    version: "Latest"
  },
];

export const SoftwareInfo = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {softwareList.map((software) => (
          <button
            key={software.name}
            onClick={() => setSelectedSoftware(software)}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all group cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-accent group-hover:scale-110 transition-transform">
                {software.icon}
              </div>
              <h3 className="font-mono font-semibold text-foreground text-center text-sm">
                {software.name}
              </h3>
              <p className="text-xs text-muted-foreground text-center">
                {software.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!selectedSoftware} onOpenChange={() => setSelectedSoftware(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="text-accent">
                {selectedSoftware?.icon}
              </div>
              {selectedSoftware?.name}
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <div>
                <p className="font-semibold text-foreground mb-2">Mô tả:</p>
                <p className="text-muted-foreground">{selectedSoftware?.description}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Chi tiết:</p>
                <p className="text-muted-foreground">{selectedSoftware?.details}</p>
              </div>
              {selectedSoftware?.version && (
                <div>
                  <p className="font-semibold text-foreground mb-2">Phiên bản:</p>
                  <p className="text-muted-foreground font-mono">{selectedSoftware.version}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
