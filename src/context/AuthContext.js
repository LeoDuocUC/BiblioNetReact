import React, { createContext, useState, useContext } from 'react';

// 🚨 CORRECCIÓN CRÍTICA: Exportar el objeto de contexto
// para que las pruebas puedan importarlo y usar el Provider.
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loanedBooks, setLoanedBooks] = useState([]);

  const login = (userData) => {
    setUser(userData);
    setLoanedBooks([]); // Limpiamos la lista al iniciar una nueva sesión
  };

  const logout = () => {
    setUser(null);
    setLoanedBooks([]);
  };

  const addBooksToLoan = (books) => {
    const newBooks = books.map(book => ({
      ...book,
      fechaVencimiento: '30 de Octubre, 2025' // Añadimos una fecha de ejemplo
    }));
    // Evitamos duplicados al añadir libros
    setLoanedBooks(prevBooks => [...new Map([...prevBooks, ...newBooks].map(item => [item.id, item])).values()]);
  };

  const value = { user, login, logout, loanedBooks, addBooksToLoan };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);