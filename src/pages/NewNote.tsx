import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenSquare, Save } from "lucide-react";
import { toast } from "sonner";

const NewNote = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true); // Mock state
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock save logic
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Ghi chú đã được đăng thành công!");
      navigate("/");
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={isLoggedIn} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <PenSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-mono">Viết ghi chú mới</CardTitle>
                  <CardDescription>
                    Chia sẻ kiến thức và ý tưởng của bạn
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base">
                    Tiêu đề <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Nhập tiêu đề ghi chú..."
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="bg-secondary text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary" className="text-base">
                    Tóm tắt <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="summary"
                    placeholder="Viết tóm tắt ngắn gọn về ghi chú..."
                    value={formData.summary}
                    onChange={handleChange}
                    required
                    className="bg-secondary min-h-[80px] resize-none"
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.summary.length}/200 ký tự
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-base">
                    Nội dung <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Viết nội dung ghi chú của bạn ở đây...&#10;&#10;Hỗ trợ Markdown:&#10;## Tiêu đề&#10;**in đậm**&#10;```code```"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="bg-secondary min-h-[400px] font-mono"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="gap-2"
                    disabled={isLoading}
                  >
                    <Save className="h-4 w-4" />
                    {isLoading ? "Đang đăng..." : "Đăng ghi chú"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewNote;
