import React, { createContext, useContext, useState, useEffect } from 'react';

// ============= Theme Context =============
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return (stored as Theme) || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ============= User Context =============
interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User;
  updateUser: (user: User) => void;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('hdhnote_user');
    return saved ? JSON.parse(saved) : { name: 'Người dùng', email: '' };
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('hdhnote_logged_in') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('hdhnote_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hdhnote_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser({ name: 'Người dùng', email: '' });
    setIsLoggedIn(false);
    localStorage.removeItem('hdhnote_user');
    localStorage.removeItem('hdhnote_logged_in');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// ============= Notes Context =============
export interface Note {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  completed: boolean;
  author?: string;
  linkedDate?: string;
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
    content: '<h2>Docker Fundamentals</h2><p>Docker là platform để develop, ship và run applications trong containers.</p><h3>Key Concepts</h3><ul><li><strong>Image:</strong> Template chứa app và dependencies</li><li><strong>Container:</strong> Running instance của image</li><li><strong>Dockerfile:</strong> Instructions để build image</li><li><strong>Docker Compose:</strong> Tool để define multi-container apps</li></ul><h3>Basic Dockerfile</h3><pre>FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]</pre><h3>Docker Compose Example</h3><pre>version: "3.8"\nservices:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD: password</pre>',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '18 phút',
    completed: false,
    author: 'DLL Team',
  },
  {
    id: 5,
    title: 'Git Best Practices & Workflows',
    excerpt: 'Git là version control system phổ biến nhất. Branching strategy như Git Flow hoặc GitHub Flow giúp team collaboration. Commit messages nên clear và descriptive.',
    content: '<h2>Git Workflow Best Practices</h2><p>Git giúp track changes và collaborate hiệu quả trong team.</p><h3>Commit Message Convention</h3><pre>feat: add user authentication\nfix: resolve memory leak in data service\ndocs: update API documentation\nrefactor: restructure component hierarchy\ntest: add unit tests for auth module</pre><h3>Git Flow Branches</h3><ul><li><strong>main/master:</strong> Production-ready code</li><li><strong>develop:</strong> Integration branch</li><li><strong>feature/*:</strong> New features</li><li><strong>hotfix/*:</strong> Emergency fixes</li><li><strong>release/*:</strong> Release preparation</li></ul><h3>Useful Commands</h3><pre>git rebase -i HEAD~3  # Interactive rebase\ngit cherry-pick &lt;commit&gt;  # Apply specific commit\ngit stash  # Temporarily save changes\ngit bisect  # Find bug-introducing commit</pre>',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '14 phút',
    completed: false,
    author: 'DLL Team',
    linkedDate: '2025-01-25',
  },
  {
    id: 6,
    title: 'REST API Design Principles',
    excerpt: 'RESTful API sử dụng HTTP methods (GET, POST, PUT, DELETE) và status codes chuẩn. Resource naming nên noun-based, versioning quan trọng, authentication/authorization cần secure.',
    content: '<h2>REST API Design Guidelines</h2><p>REST (Representational State Transfer) là architectural style cho web services.</p><h3>HTTP Methods</h3><ul><li><strong>GET:</strong> Retrieve resources</li><li><strong>POST:</strong> Create new resources</li><li><strong>PUT/PATCH:</strong> Update resources</li><li><strong>DELETE:</strong> Remove resources</li></ul><h3>Status Codes</h3><pre>200 OK - Success\n201 Created - Resource created\n400 Bad Request - Invalid input\n401 Unauthorized - Auth required\n403 Forbidden - No permission\n404 Not Found - Resource not found\n500 Internal Server Error</pre><h3>Best Practices</h3><ul><li>Use nouns for endpoints: /users, /products</li><li>Version your API: /api/v1/users</li><li>Use query params for filtering: /users?role=admin</li><li>Return meaningful error messages</li><li>Implement rate limiting and caching</li></ul>',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '16 phút',
    completed: false,
    author: 'DLL Team',
  },
];

const STORAGE_KEY = 'hdhnote_notes';
const COMPLETED_KEY = 'hdhnote_completed';

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : getDefaultNotes();
  });

  const [completedNotes, setCompletedNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(COMPLETED_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completedNotes));
  }, [completedNotes]);

  const addNote = (note: Omit<Note, 'id' | 'date' | 'readTime' | 'completed'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      readTime: `${Math.ceil(note.content.length / 1000)} phút`,
      completed: false,
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id: number, updatedFields: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updatedFields, readTime: `${Math.ceil((updatedFields.content?.length || note.content.length) / 1000)} phút` }
        : note
    ));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleComplete = (id: number) => {
    const noteToComplete = notes.find(note => note.id === id);
    if (noteToComplete) {
      setCompletedNotes([{ ...noteToComplete, completed: true }, ...completedNotes]);
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const restoreNote = (id: number) => {
    const noteToRestore = completedNotes.find(note => note.id === id);
    if (noteToRestore) {
      setNotes([{ ...noteToRestore, completed: false }, ...notes]);
      setCompletedNotes(completedNotes.filter(note => note.id !== id));
    }
  };

  const permanentDelete = (id: number) => {
    setCompletedNotes(completedNotes.filter(note => note.id !== id));
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
