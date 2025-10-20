import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function DashboardPage() {
  // 1. OBTENEMOS la lista real y dinámica de 'loanedBooks' desde nuestro AuthContext.
  const { user, logout, loanedBooks } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // El componente ProtectedRoute ya se asegura de que 'user' exista,
  // pero esta es una buena práctica de seguridad.
  if (!user) return null;

  // Los datos de multas pueden seguir siendo de ejemplo por ahora.
  const multasPendientes = [
    { id: 1, libro: 'Cien años de soledad', monto: '$2.500 CLP' },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Bienvenido, {user.name}</h1>
          <button onClick={handleLogout} className="btn btn-outline-danger">Cerrar Sesión</button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card h-100 shadow-sm">
            <div className="card-header"><h3>📚 Mis Libros Solicitados</h3></div>
            
            {/* 2. LÓGICA DE VISUALIZACIÓN DINÁMICA:
                - Si la lista 'loanedBooks' tiene libros (su largo es mayor a 0), los mostramos.
                - Si está vacía, mostramos un mensaje amigable y un botón para explorar.
            */}
            {loanedBooks.length > 0 ? (
              <ul className="list-group list-group-flush">
                {loanedBooks.map(libro => (
                  <li key={libro.id} className="list-group-item">
                    <strong>{libro.titulo}</strong> - Vence el {libro.fechaVencimiento}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <p className="mb-3">Aún no has solicitado ningún libro.</p>
                <Link to="/" className="btn btn-primary align-self-center">Explorar libros</Link>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header"><h3>💸 Multas Pendientes</h3></div>
            <ul className="list-group list-group-flush">
              {multasPendientes.map(multa => (
                <li key={multa.id} className="list-group-item list-group-item-warning">
                  <strong>{multa.libro}:</strong> {multa.monto}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;