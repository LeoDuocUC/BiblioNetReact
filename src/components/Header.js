import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige a la página de inicio
  };

  return (
    <header className="main-header-bar">
      <div className="logo-container">
        <Link to="/">
            <img src="/logo-placeholder.png" alt="Logo BiblioNet Libros" className="logo-img" />
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="logo-text">BIBLIONET<br />LIBROS</span>
        </Link>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Buscar en toda la tienda..." className="search-input" />
        <button className="search-button">
          <span className="icon-placeholder">🔍</span>
        </button>
      </div>
      <div className="user-actions">
        {user ? (
          // Si el usuario ha iniciado sesión, muestra su nombre y un botón para salir.
          <>
            <div className="action-link">
                <span className="icon-placeholder">👤</span>
                <span className="action-text">{user.name}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-sm btn-outline-primary">Salir</button>
          </>
        ) : (
          // Si no, muestra el enlace para ingresar.
          <Link to="/login" className="action-link">
            <span className="icon-placeholder">👤</span>
            <span className="action-text">Ingresar</span>
          </Link>
        )}
        {/* Los otros íconos siguen siendo enlaces estáticos por ahora */}
        <a href="#" className="action-link">
          <span className="icon-placeholder">🤍</span>
        </a>
        <a href="#" className="action-link">
          <span className="icon-placeholder">🛒</span>
        </a>
      </div>
    </header>
  );
}

export default Header;