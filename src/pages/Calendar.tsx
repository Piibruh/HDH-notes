import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useNotes } from '@/contexts/NotesContext';
import { Link } from 'react-router-dom';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { notes } = useNotes();

  // Group notes by date
  const notesData: Record<string, typeof notes> = {};
  notes.forEach(note => {
    if (note.linkedDate) {
      if (!notesData[note.linkedDate]) {
        notesData[note.linkedDate] = [];
      }
      notesData[note.linkedDate].push(note);
    }
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">Lịch Ghi Chú</h1>
        <p className="text-muted-foreground">Xem ghi chú theo ngày tháng</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          <h2 className="text-xl font-mono font-bold text-foreground">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateKey = getDateKey(day);
            const dayNotes = notesData[dateKey] || [];
            const hasNotes = dayNotes.length > 0;
            const isToday =
              day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear();

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(hasNotes ? dateKey : null)}
                className={`aspect-square rounded-lg border transition-all ${
                  isToday
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                } ${hasNotes ? 'bg-muted cursor-pointer' : 'bg-card'} ${
                  selectedDate === dateKey ? 'ring-2 ring-accent' : ''
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span
                    className={`text-sm font-medium ${
                      isToday ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {day}
                  </span>
                  {hasNotes && (
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: Math.min(dayNotes.length, 3) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-accent"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Có ghi chú</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded border-2 border-accent" />
              <span className="text-muted-foreground">Hôm nay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes for Selected Date */}
      {selectedDate && notesData[selectedDate] && (
        <div className="mt-8 bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-xl font-mono font-bold text-foreground mb-4">
            Ghi chú ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}
          </h2>
          <div className="space-y-3">
            {notesData[selectedDate].map((note) => (
              <Link
                key={note.id}
                to={`/note/${note.id}`}
                className="flex items-center gap-3 p-4 bg-muted rounded-lg hover:bg-accent/10 transition-colors border border-border"
              >
                <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-mono font-semibold text-foreground">{note.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{note.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
