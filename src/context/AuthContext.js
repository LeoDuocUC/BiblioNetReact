import React, { createContext, useState, useContext } from 'react';

// =========================
// 📌 Crear el contexto
// =========================
export const AuthContext = createContext(null);

// =========================
// 🧠 Provider del contexto
// =========================
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loanedBooks, setLoanedBooks] = useState([]);

  // Iniciar sesión y limpiar préstamos previos
  const login = (userData) => {
    setUser(userData);
    setLoanedBooks([]);
  };

  // Cerrar sesión y limpiar datos
  const logout = () => {
    setUser(null);
    setLoanedBooks([]);
  };

  // Añadir libros evitando duplicados
  const addBooksToLoan = (books) => {
    if (!Array.isArray(books)) return;

    const newBooks = books.map((book) => ({
      ...book,
      fechaVencimiento: new Date().toISOString(),
    }));

    setLoanedBooks((prevBooks) => {
      const merged = [...prevBooks, ...newBooks];
      const map = new Map();
      merged.forEach((item) => {
        if (item && item.id !== undefined) {
          map.set(item.id, item);
        }
      });
      return Array.from(map.values());
    });
  };

  const value = {
    user,
    login,
    logout,
    loanedBooks,
    addBooksToLoan,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// =========================
// 🧭 Hook para consumir el contexto
// =========================
export const useAuth = () => useContext(AuthContext);
