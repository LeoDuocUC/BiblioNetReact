import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { performSearch } = useSearch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const safeUserName =
    typeof user === 'string' ? user : (user?.name || user?.email || 'Usuario');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    performSearch(searchTerm);
    navigate('/search');
    setSearchTerm('');
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

      <form className="search-container" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <span className="icon-placeholder">🔍</span>
        </button>
      </form>

      <div className="user-actions">
        {user ? (
          <>
            <Link to="/dashboard" className="action-link">
              <span className="icon-placeholder">👤</span>
              <span className="action-text">{safeUserName}</span>
            </Link>
            <button onClick={handleLogout} className="btn btn-sm btn-outline-primary">
              Salir
            </button>
          </>
        ) : (
          <Link to="/login" className="action-link">
            <span className="icon-placeholder">👤</span>
            <span className="action-text">Ingresar</span>
          </Link>
        )}

        {user && (
          <Link to="/contacto" className="action-link">
            <span className="icon-placeholder">✉️</span>
            <span className="action-text">Contacto</span>
          </Link>
        )}

        {user && (
          <Link to="/carrito" className="action-link position-relative" aria-label="Carrito">
            <span className="icon-placeholder">🛒</span>
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.length}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;