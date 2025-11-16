import React, { createContext, useContext, useState, useEffect } from 'react';

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
