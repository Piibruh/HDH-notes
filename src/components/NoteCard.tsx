import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NoteCardProps {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
  readTime?: string;
}

const NoteCard = ({ id, title, summary, createdAt, readTime = "5 phút" }: NoteCardProps) => {
  return (
    <Link to={`/note/${id}`}>
      <Card className="group hover:border-primary transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
        <CardHeader>
          <CardTitle className="text-xl font-mono group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-muted-foreground">
            {summary}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{readTime} đọc</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NoteCard;
