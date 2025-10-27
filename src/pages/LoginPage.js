import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage({ mockNavigate, mockLogin }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Usa el mock si está disponible, sino el hook real
  const navigate = mockNavigate || useNavigate(); 
  
  // 💡 AJUSTE CRÍTICO: Obtenemos el objeto completo de useAuth() 
  // para evitar la desestructuración si devuelve null/undefined.
  const authContext = useAuth();
  
  // Definimos la función de login (mock, si se inyectó, o la del contexto)
  // Usamos el operador de encadenamiento opcional (?) para evitar fallar si authContext es null.
  const loginFn = mockLogin || authContext?.login; 

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    // Asegúrate de que la función de login exista antes de intentar usarla
    if (!loginFn) {
        // Esto solo debería pasar si el contexto no está envuelto en producción 
        // y no se inyectó un mock en testing.
        console.error("Auth context login function is missing.");
        return; 
    }

    // Lógica de validación
    if (email === 'usuario' && password === '1234') {
      setError('');
      
      const userData = { name: 'Leo', email: 'usuario' };
      
      // Llama a la función de login (mock o real)
      loginFn(userData);
      
      // Redirige al usuario (mock o real)
      navigate('/dashboard'); 
    } else {
      // Muestra un mensaje de error
      setError('Usuario o contraseña incorrecta.');
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