import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Si no hay un usuario con sesión iniciada en nuestro contexto...
  if (!user) {
    // ...redirigimos al usuario a la página de login.
    return <Navigate to="/login" replace />;
  }

  // Si hay un usuario, mostramos el contenido de la página protegida.
  return children;
};

export default ProtectedRoute;
