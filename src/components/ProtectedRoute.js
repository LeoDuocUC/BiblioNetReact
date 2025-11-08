// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth(); // usa flag si tu contexto lo expone
  const location = useLocation();

  const loggedIn = typeof isAuthenticated === 'boolean' ? isAuthenticated : !!user;

  if (!loggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, reason: 'login_required' }}
      />
    );
  }
  return children;
}
