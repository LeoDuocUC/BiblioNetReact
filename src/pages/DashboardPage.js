import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige a la página de inicio después de cerrar sesión
  };

  // El ProtectedRoute se encargará de que 'user' siempre exista aquí.
  if (!user) {
    return null; // O un spinner de carga
  }

  // Datos de ejemplo como en tu usuarioprincipal.html
  const librosPrestados = [
    { id: 1, titulo: '1984', fechaVencimiento: '25 de Octubre, 2025' },
    { id: 2, titulo: 'El Principito', fechaVencimiento: '29 de Octubre, 2025' },
  ];
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
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header"><h3>📚 Mis Libros Prestados</h3></div>
            <ul className="list-group list-group-flush">
              {librosPrestados.map(libro => (
                <li key={libro.id} className="list-group-item">
                  <strong>{libro.titulo}</strong> - Vence el {libro.fechaVencimiento}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
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