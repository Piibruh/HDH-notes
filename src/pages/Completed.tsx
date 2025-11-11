import { useState } from 'react';
import { RotateCcw, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNotes } from '@/contexts/NotesContext';

const Completed = () => {
  const { toast } = useToast();
  const { completedNotes, restoreNote, permanentDelete } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = completedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestore = (id: number) => {
    restoreNote(id);
    toast({
      title: 'Đã khôi phục',
      description: 'Ghi chú đã được khôi phục về danh sách chính.',
    });
  };

  const handleDelete = (id: number) => {
    permanentDelete(id);
    toast({
      title: 'Đã xóa vĩnh viễn',
      description: 'Ghi chú đã được xóa khỏi hệ thống.',
      variant: 'destructive',
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">Ghi chú đã hoàn thành</h1>
        <p className="text-muted-foreground">Quản lý các ghi chú đã hoàn thành</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm kiếm ghi chú đã hoàn thành..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
      </div>

      {/* Completed Notes List */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground">
            {searchQuery ? 'Không tìm thấy ghi chú nào.' : 'Chưa có ghi chú nào được hoàn thành.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-mono font-semibold text-foreground mb-2 line-through">
                    {note.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 line-through">{note.excerpt}</p>
                  <p className="text-sm text-muted-foreground">
                    Hoàn thành: {note.date}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestore(note.id)}
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Khôi phục
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(note.id)}
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Completed;
