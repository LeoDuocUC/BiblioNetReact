import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();
const LS_KEY = 'authUser';

export const AuthProvider = ({ children }) => {
  // Hydrate synchronously from localStorage
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      
      const parsedUser = JSON.parse(raw);
      
      // Fix for the old bug where 'name' was an object
      if (parsedUser && typeof parsedUser.name === 'object' && parsedUser.name !== null) {
        
        const fixedUser = {
          ...parsedUser, // keep loans, etc.
          name: parsedUser.name.name, // Just get the name
          // email property is removed
        };
        
        localStorage.setItem(LS_KEY, JSON.stringify(fixedUser));
        return fixedUser;
      }
      
      // If it's a good user, return it
      return parsedUser;
      
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  const saveUser = (u) => {
    setUser(u);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(u));
    } catch {}
  };

  // Updated login function
  const login = (credentials) => { 
    const existing = user || {};
    const u = {
      // Only save the name. We don't save the password.
      name: credentials.name || 'Usuario', 
      loans: Array.isArray(existing.loans) ? existing.loans : [],
      fines: existing.fines || [],
    };
    saveUser(u);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(LS_KEY);
    } catch {}
  };

  // Add books to "loans" (called from CartContext.placeOrder)
  const addBooksToLoan = (books) => {
    if (!Array.isArray(books) || books.length === 0) return;

    const now = new Date();
    const due = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(); // 14 days

    const current = user || { name: 'Usuario', loans: [], fines: [] };
    const currentLoans = Array.isArray(current.loans) ? current.loans : [];

    // Avoid duplicates by id
    const toAdd = books.filter(
      (b) => !currentLoans.some((l) => String(l.id) === String(b.id))
    );

    const updated = {
      ...current,
      loans: [
        ...currentLoans,
        ...toAdd.map((b) => ({ ...b, dueDate: due })),
      ],
    };

    saveUser(updated);
  };

  const hasLoan = (bookId) =>
    !!(user && Array.isArray(user.loans) && user.loans.some((l) => String(l.id) === String(bookId)));

  const activeLoansCount = user && Array.isArray(user.loans) ? user.loans.length : 0;

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      addBooksToLoan,
      hasLoan,
      activeLoansCount,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};