import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFavourites } from '../context/FavouritesContext'; // <-- 1. Import Favourites
import { useNavigate, Link } from 'react-router-dom';

function DashboardPage() {
  const { user, logout } = useAuth(); // Removed loanedBooks for simplicity, using user.loans
  const { favourites, removeFavourite } = useFavourites(); // <-- 2. Get Favourites
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  // Safe username for any shape
  const safeUserName =
    typeof user === 'string' ? user : (user?.name || 'Usuario');

  // Use user.loans directly
  const rawLoans = Array.isArray(user?.loans) ? user.loans : [];
  
  // Normalize fecha (dueDate / fechaVencimiento)
  const normalizedLoans = rawLoans.map((b) => ({
    ...b,
    fechaVencimiento: b.fechaVencimiento ?? b.dueDate ?? '',
  }));

  // Example Fines (you can pull this from context later if needed)
  const fines = [
    { id: 1, reason: 'Cien años de soledad', amount: 2500 }
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Bienvenido, {safeUserName}</h1>
          <button onClick={handleLogout} className="btn btn-outline-danger">
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* --- 3. THIS IS THE NEW FAVOURITES SECTION --- */}
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h3 className="h5 mb-0">⭐ Mis Favoritos ({favourites.length} / 4)</h3>
        </div>
        <div className="card-body">
          {favourites.length > 0 ? (
            <ul className="list-group list-group-flush">
              {favourites.map(book => (
                <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <Link to={`/libro/${book.id}`}><strong>{book.titulo}</strong></Link>
                    <span className="text-muted d-block small">por {book.autor}</span>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFavourite(book.id)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted mb-0">No tienes libros en tus favoritos. Puedes agregar hasta 4.</p>
          )}
        </div>
      </div>
      {/* --- END OF NEW SECTION --- */}

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card h-100 shadow-sm">
            <div className="card-header">
              <h3>📚 Mis Libros Solicitados</h3>
            </div>

            {normalizedLoans.length > 0 ? (
              <ul className="list-group list-group-flush">
                {normalizedLoans.map((libro) => (
                  <li key={libro.id} className="list-group-item">
                    <strong>{libro.titulo}</strong>
                    {libro.fechaVencimiento && (
                      <span className="text-muted d-block small">
                        Vence el {new Date(libro.fechaVencimiento).toLocaleDateString()}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <p className="mb-3">Aún no has solicitado ningún libro.</p>
                <Link to="/" className="btn btn-primary align-self-center">
                  Explorar libros
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header">
              <h3>💸 Multas Pendientes</h3>
            </div>
            {fines.length > 0 ? (
              <ul className="list-group list-group-flush">
                {fines.map(fine => (
                  <li key={fine.id} className="list-group-item list-group-item-warning">
                    <strong>{fine.reason}:</strong> ${fine.amount.toLocaleString('es-CL')} CLP
                  </li>
                ))}
              </ul>
            ) : (
               <div className="card-body text-center d-flex flex-column justify-content-center">
                <p className="text-muted mb-0">No tienes multas pendientes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;