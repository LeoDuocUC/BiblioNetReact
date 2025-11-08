// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const safeUserName =
    typeof user === 'string' ? user : (user?.name || 'Usuario');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call login with the credentials object
    login({ name: name, password: password });

    // Go back to the previous protected route or dashboard
    const dest = location.state?.from || '/dashboard';
    navigate(dest, { replace: true });
  };

  return (
    <div className="container py-5" style={{ maxWidth: 560 }}>
      {user && (
        <div className="alert alert-info mb-4" role="alert">
          Ya iniciaste sesión como <strong>{safeUserName}</strong>.{' '}
          <Link to="/dashboard">Ir al panel</Link>
        </div>
      )}

      <h1 className="mb-4">Ingresar</h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="login-name" className="form-label">Nombre</label>
          <input
            id="login-name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="login-pass" className="form-label">Contraseña</label>
          <input
            id="login-pass"
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
          />
        </div>

        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>

      <p className="text-muted mt-3" style={{ fontSize: '0.9rem' }}>
        * Demo local de autenticación.
      </p>
    </div>
  );
}