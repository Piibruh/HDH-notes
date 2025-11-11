import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Note {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  completed: boolean;
  linkedDate?: string; // For calendar
}

interface NotesContextType {
  notes: Note[];
  completedNotes: Note[];
  addNote: (note: Omit<Note, 'id' | 'date' | 'readTime' | 'completed'>) => void;
  updateNote: (id: number, note: Partial<Note>) => void;
  deleteNote: (id: number) => void;
  toggleComplete: (id: number) => void;
  restoreNote: (id: number) => void;
  permanentDelete: (id: number) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('hdhnote_notes');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'Giới thiệu về React Hooks',
        excerpt: 'React Hooks là một tính năng mới trong React 16.8 cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class.',
        content: '<p>React Hooks là một tính năng mới trong React 16.8...</p>',
        date: new Date().toLocaleDateString('vi-VN'),
        readTime: '8 phút',
        completed: false,
        linkedDate: '2025-01-15',
      },
      {
        id: 2,
        title: 'TypeScript Best Practices',
        excerpt: 'Các phương pháp hay nhất khi làm việc với TypeScript để tạo code an toàn và dễ bảo trì hơn.',
        content: '<p>TypeScript là một superset của JavaScript...</p>',
        date: new Date().toLocaleDateString('vi-VN'),
        readTime: '6 phút',
        completed: false,
      },
    ];
  });

  const [completedNotes, setCompletedNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('hdhnote_completed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hdhnote_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('hdhnote_completed', JSON.stringify(completedNotes));
  }, [completedNotes]);

  const addNote = (noteData: Omit<Note, 'id' | 'date' | 'readTime' | 'completed'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      readTime: '5 phút',
      completed: false,
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id: number, noteData: Partial<Note>) => {
    setNotes(notes.map(note => note.id === id ? { ...note, ...noteData } : note));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleComplete = (id: number) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      const completedNote = { ...note, completed: true };
      setCompletedNotes([completedNote, ...completedNotes]);
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const restoreNote = (id: number) => {
    const note = completedNotes.find(n => n.id === id);
    if (note) {
      const restoredNote = { ...note, completed: false };
      setNotes([restoredNote, ...notes]);
      setCompletedNotes(completedNotes.filter(n => n.id !== id));
    }
  };

  const permanentDelete = (id: number) => {
    setCompletedNotes(completedNotes.filter(n => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ 
      notes, 
      completedNotes,
      addNote, 
      updateNote, 
      deleteNote, 
      toggleComplete,
      restoreNote,
      permanentDelete
    }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
