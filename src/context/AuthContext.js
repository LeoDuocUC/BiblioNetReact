import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto. Es como un "almacén" global para el estado de autenticación.
const AuthContext = createContext(null);

// 2. Creamos un "Proveedor" (Provider). Este componente envolverá nuestra aplicación
//    y hará que el estado de autenticación esté disponible para todos los componentes hijos.
export const AuthProvider = ({ children }) => {
  // Guardamos la información del usuario en el estado. 'null' significa que no hay sesión iniciada.
  const [user, setUser] = useState(null);

  // Función de login
  const login = (userData) => {
    // En una app real, aquí se haría una llamada a una API.
    // Para este ejemplo, simplemente guardamos los datos del usuario.
    setUser(userData);
  };

  // Función de logout
  const logout = () => {
    setUser(null);
  };

  // El Provider devuelve el contexto con los valores que queremos compartir:
  // el usuario actual y las funciones de login y logout.
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Creamos un "hook" personalizado. Esto nos facilitará el acceso al contexto
//    desde cualquier componente, simplemente llamando a useAuth().
export const useAuth = () => {
  return useContext(AuthContext);
};