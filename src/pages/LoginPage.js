import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage({ mockNavigate, mockLogin }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Navigation (mock-safe)
  const reactNavigate = useNavigate();
  const navigate = mockNavigate || reactNavigate;

  // Safe Auth Hook (no provider protection)
  const authContext = (typeof useAuth === 'function' ? useAuth() : {}) || {};
  const loginFn = mockLogin || authContext.login || (() => {
    console.warn('Auth context login function is missing.');
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    if (email === 'usuario' && password === '1234') {
      setError('');
      const userData = { name: 'Leo', email: 'usuario' };
      loginFn(userData);
      navigate('/dashboard');
      console.log('Login successful');
    } else {
      setError('Usuario o contraseña incorrecta.');
      console.log('Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Acceso Usuario</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Ingresar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
