import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
          <>
            <Link to="/dashboard" className="action-link">
                <span className="icon-placeholder">👤</span>
                <span className="action-text">{user.name}</span>
            </Link>
            <button onClick={handleLogout} className="btn btn-sm btn-outline-primary">Salir</button>
          </>
        ) : (
          <Link to="/login" className="action-link">
            <span className="icon-placeholder">👤</span>
            <span className="action-text">Ingresar</span>
          </Link>
        )}
        
        {/* Contact Link */}
        <Link to="/contacto" className="action-link">
          <span className="icon-placeholder">✉️</span>
          <span className="action-text">Contacto</span>
        </Link>

        {/* Cart Link */}
        <Link to="/carrito" className="action-link position-relative">
          <span className="icon-placeholder">🛒</span>
          {cartItems.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItems.length}
              <span className="visually-hidden">libros en el carrito</span>
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;