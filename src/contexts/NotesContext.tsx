import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Note {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  completed: boolean;
  author?: string; // Author name
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

const getDefaultNotes = (): Note[] => [
  {
    id: 1,
    title: 'React Hooks: useState và useEffect',
    excerpt: 'React Hooks cho phép sử dụng state và lifecycle trong function components. useState quản lý state, useEffect xử lý side effects như API calls, subscriptions.',
    content: '<h2>React Hooks - Tổng quan</h2><p>React Hooks là tính năng được giới thiệu trong React 16.8, cho phép sử dụng state và các tính năng React khác mà không cần class.</p><h3>useState</h3><p>Hook cơ bản nhất để quản lý state trong function component:</p><pre>const [count, setCount] = useState(0);</pre><h3>useEffect</h3><p>Xử lý side effects như fetching data, subscriptions, DOM manipulation:</p><pre>useEffect(() => {\n  fetchData();\n  return () => cleanup();\n}, [dependencies]);</pre><p><strong>Lưu ý:</strong> Dependency array quan trọng để tránh infinite loops và memory leaks.</p>',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '12 phút',
    completed: false,
    author: 'DLL Team',
    linkedDate: '2025-01-15',
  },
  {
    id: 2,
    title: 'TypeScript: Interfaces vs Types',
    excerpt: 'TypeScript cung cấp Interfaces và Types để định nghĩa cấu trúc dữ liệu. Interfaces có thể extend và merge, Types linh hoạt hơn với union, intersection, mapped types.',
    content: '<h2>TypeScript Best Practices</h2><p>TypeScript là superset của JavaScript, thêm static typing giúp code an toàn và dễ maintain hơn.</p><h3>Interface</h3><pre>interface User {\n  id: number;\n  name: string;\n  email?: string;\n}</pre><h3>Type Alias</h3><pre>type Status = "pending" | "approved" | "rejected";\ntype UserWithStatus = User & { status: Status };</pre><h3>Generic Types</h3><pre>function identity&lt;T&gt;(arg: T): T {\n  return arg;\n}</pre><p><strong>Best Practice:</strong> Sử dụng Interface cho object shapes, Type cho unions và complex types.</p>',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '10 phút',
    completed: false,
    author: 'DLL Team',
  },
  {
    id: 3,
    title: 'Node.js: Event Loop và Async/Await',
    excerpt: 'Node.js sử dụng event loop để xử lý non-blocking I/O. Async/await là syntax sugar của Promises, giúp code asynchronous dễ đọc hơn callbacks và promise chains.',
    content: '<h2>Node.js Event Loop</h2><p>Node.js chạy trên V8 engine và sử dụng event loop để xử lý operations không đồng bộ.</p><h3>Event Loop Phases</h3><ul><li>Timers: setTimeout, setInterval</li><li>Pending callbacks: I/O callbacks</li><li>Poll: retrieve new I/O events</li><li>Check: setImmediate</li><li>Close: socket.on("close")</li></ul><h3>Async/Await</h3><pre>async function fetchUser(id) {\n  try {\n    const response = await fetch(`/api/users/${id}`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}</pre><p><strong>Tip:</strong> Luôn dùng try/catch với async/await và xử lý errors đúng cách.</p>',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '15 phút',
    completed: false,
    author: 'DLL Team',
    linkedDate: '2025-01-20',
  },
  {
    id: 4,
    title: 'Docker: Containerization Basics',
    excerpt: 'Docker đóng gói ứng dụng và dependencies vào containers. Dockerfile định nghĩa image, docker-compose quản lý multi-container apps. Giúp consistency giữa dev và production.',
    content: '<h2>Docker Container Technology</h2><p>Docker cho phép đóng gói ứng dụng với tất cả dependencies thành một container có thể chạy ở bất kỳ đâu.</p><h3>Dockerfile Example</h3><pre>FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]</pre><h3>Docker Commands</h3><pre># Build image\ndocker build -t myapp .\n\n# Run container\ndocker run -p 3000:3000 myapp\n\n# List containers\ndocker ps</pre><h3>Docker Compose</h3><p>Quản lý multi-container applications với docker-compose.yml:</p><pre>version: "3.8"\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n  db:\n    image: postgres:14\n    environment:\n      POSTGRES_PASSWORD: secret</pre>',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '18 phút',
    completed: false,
    author: 'DLL Team',
  },
  {
    id: 5,
    title: 'Git Workflow: Branching Strategies',
    excerpt: 'Git flow sử dụng master/main cho production, develop cho integration, feature branches cho tính năng mới. Commit messages nên clear và descriptive.',
    content: '<h2>Git Best Practices</h2><p>Git là version control system phổ biến nhất, giúp quản lý source code và collaboration.</p><h3>Branching Strategy</h3><ul><li><strong>main/master:</strong> Production-ready code</li><li><strong>develop:</strong> Integration branch</li><li><strong>feature/*:</strong> New features</li><li><strong>hotfix/*:</strong> Production fixes</li></ul><h3>Essential Commands</h3><pre># Create and switch to branch\ngit checkout -b feature/new-feature\n\n# Stage and commit\ngit add .\ngit commit -m "feat: add user authentication"\n\n# Push to remote\ngit push origin feature/new-feature\n\n# Merge branch\ngit checkout main\ngit merge feature/new-feature</pre><h3>Commit Message Convention</h3><pre>feat: new feature\nfix: bug fix\ndocs: documentation\nstyle: formatting\nrefactor: code restructure\ntest: add tests\nchore: maintenance</pre>',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '14 phút',
    completed: false,
    author: 'DLL Team',
    linkedDate: '2025-01-25',
  },
  {
    id: 6,
    title: 'REST API Design Principles',
    excerpt: 'REST API sử dụng HTTP methods (GET, POST, PUT, DELETE) và status codes. URL nên resource-oriented, responses consistent format (JSON). Authentication với JWT hoặc OAuth.',
    content: '<h2>RESTful API Design</h2><p>REST (Representational State Transfer) là architectural style cho web services.</p><h3>HTTP Methods</h3><ul><li><strong>GET:</strong> Retrieve resources</li><li><strong>POST:</strong> Create new resource</li><li><strong>PUT/PATCH:</strong> Update resource</li><li><strong>DELETE:</strong> Remove resource</li></ul><h3>URL Structure</h3><pre>GET    /api/users          # List users\nGET    /api/users/:id      # Get specific user\nPOST   /api/users          # Create user\nPUT    /api/users/:id      # Update user\nDELETE /api/users/:id      # Delete user</pre><h3>Status Codes</h3><ul><li><strong>200:</strong> OK</li><li><strong>201:</strong> Created</li><li><strong>400:</strong> Bad Request</li><li><strong>401:</strong> Unauthorized</li><li><strong>404:</strong> Not Found</li><li><strong>500:</strong> Server Error</li></ul><h3>Response Format</h3><pre>{\n  "success": true,\n  "data": {...},\n  "message": "Operation successful"\n}</pre>',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '16 phút',
    completed: false,
    author: 'DLL Team',
  },
];

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return !localStorage.getItem('hdhnote_user') || localStorage.getItem('hdhnote_logged_in') !== 'true';
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    if (isDemoMode) {
      return getDefaultNotes();
    }
    const saved = localStorage.getItem('hdhnote_notes');
    return saved ? JSON.parse(saved) : getDefaultNotes();
  });

  const [completedNotes, setCompletedNotes] = useState<Note[]>(() => {
    if (isDemoMode) {
      return [];
    }
    const saved = localStorage.getItem('hdhnote_completed');
    return saved ? JSON.parse(saved) : [];
  });

  // Check if user logs in/out and update demo mode
  useEffect(() => {
    const checkAuthStatus = () => {
      const isLoggedIn = localStorage.getItem('hdhnote_logged_in') === 'true';
      const newDemoMode = !isLoggedIn;
      
      if (newDemoMode !== isDemoMode) {
        setIsDemoMode(newDemoMode);
        if (newDemoMode) {
          // Reset to demo data when logged out
          setNotes(getDefaultNotes());
          setCompletedNotes([]);
        } else {
          // Load user data when logged in
          const savedNotes = localStorage.getItem('hdhnote_notes');
          const savedCompleted = localStorage.getItem('hdhnote_completed');
          setNotes(savedNotes ? JSON.parse(savedNotes) : getDefaultNotes());
          setCompletedNotes(savedCompleted ? JSON.parse(savedCompleted) : []);
        }
      }
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, [isDemoMode]);

  // Only save to localStorage if not in demo mode
  useEffect(() => {
    if (!isDemoMode) {
      localStorage.setItem('hdhnote_notes', JSON.stringify(notes));
    }
  }, [notes, isDemoMode]);

  useEffect(() => {
    if (!isDemoMode) {
      localStorage.setItem('hdhnote_completed', JSON.stringify(completedNotes));
    }
  }, [completedNotes, isDemoMode]);

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
