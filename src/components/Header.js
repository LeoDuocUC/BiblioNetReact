// src/components/Header.js
import React from 'react';

function Header() {
  // Nota cómo 'class' se convierte en 'className' en JSX
  return (
    <header className="main-header-bar">
      <div className="logo-container">
        {/* Las imágenes en 'public' se pueden llamar directamente */}
        <img src="/logo-placeholder.png" alt="Logo BiblioNet Libros" className="logo-img" />
        <span className="logo-text">BIBLIONET<br />LIBROS</span>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Buscar en toda la tienda..." className="search-input" />
        <button className="search-button">
          <span className="icon-placeholder">🔍</span>
        </button>
      </div>
      <div className="user-actions">
        <a href="/login" className="action-link">
          <span className="icon-placeholder">👤</span>
          <span className="action-text">Ingresar</span>
        </a>
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