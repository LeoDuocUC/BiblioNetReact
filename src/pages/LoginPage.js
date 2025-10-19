import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Hook para redirigir al usuario
  const { login } = useAuth(); // Obtenemos la función login de nuestro contexto

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevenimos que el formulario recargue la página

    // Lógica de validación (la misma que en tu HTML)
    if (email === 'usuario' && password === '1234') {
      // Si las credenciales son correctas:
      setError('');
      
      // Creamos un objeto de usuario de ejemplo
      const userData = { name: 'Leo', email: 'usuario' };
      
      // Llamamos a la función login del contexto
      login(userData);
      
      // Redirigimos al usuario al panel principal
      navigate('/dashboard'); 
    } else {
      // Si son incorrectas, mostramos un mensaje de error
      setError('Usuario o contraseña incorrecta.');
    }
  };

  // Usamos clases de Bootstrap para el estilo del formulario
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
                    required
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
                    required
                  />
                </div>
                
                {/* Mostramos el mensaje de error si existe */}
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