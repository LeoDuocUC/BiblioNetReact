import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // 1. AÑADIMOS UN NUEVO ESTADO para guardar los libros prestados
  const [loanedBooks, setLoanedBooks] = useState([]);

  const login = (userData) => {
    setUser(userData);
    setLoanedBooks([]); // Limpiamos la lista al iniciar una nueva sesión
  };

  const logout = () => {
    setUser(null);
    setLoanedBooks([]);
  };

  // 2. AÑADIMOS UNA NUEVA FUNCIÓN para agregar libros a la lista de prestados
  const addBooksToLoan = (books) => {
    const newBooks = books.map(book => ({
      ...book,
      fechaVencimiento: '30 de Octubre, 2025' // Añadimos una fecha de ejemplo
    }));
    // Evitamos duplicados al añadir libros
    setLoanedBooks(prevBooks => [...new Map([...prevBooks, ...newBooks].map(item => [item.id, item])).values()]);
  };

  // 3. EXPONEMOS los nuevos valores en el contexto
  const value = { user, login, logout, loanedBooks, addBooksToLoan };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);