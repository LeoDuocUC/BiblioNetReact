import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  // Estado para controlar la visibilidad del menú
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Alterna la visibilidad del menú
  const handleToggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Cierra el menú
  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <nav className="categories-navbar" role="navigation">
      <ul className="nav-links">
        <li className="dropdown">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href="#"
            tabIndex="0"
            onClick={(e) => {
              e.preventDefault();
              handleToggleMenu();
            }}
            onKeyDown={(e) => {
              // 🔹 Nuevo: soporte de teclado
              if (e.key === 'Enter') {
                e.preventDefault();
                handleToggleMenu();
              }
              if (e.key === 'Escape') {
                e.preventDefault();
                handleCloseMenu();
              }
            }}
          >
            CATEGORÍAS ▼
          </a>

          {/* Menú desplegable controlado por estado */}
          <ul className={`dropdown-menu ${isMenuVisible ? 'visible' : ''}`}>
            <li onClick={handleCloseMenu}>
              <Link to="/ficcion">📚 Ficción</Link>
            </li>
            <li onClick={handleCloseMenu}>
              <Link to="/no-ficcion">🧠 No ficción</Link>
            </li>
            <li onClick={handleCloseMenu}>
              <Link to="/ciencia-tecnologia">🔬 Ciencia y tecnología</Link>
            </li>
            <li onClick={handleCloseMenu}>
              <Link to="/arte-cultura">🎨 Arte y cultura</Link>
            </li>
            <li onClick={handleCloseMenu}>
              <Link to="/negocios-economia">💼 Negocios y economía</Link>
            </li>
            <li onClick={handleCloseMenu}>
              <Link to="/infantil-juvenil">👧 Infantil y juvenil</Link>
            </li>
          </ul>
        </li>

        {/* Enlaces estáticos */}
        <li>
          <Link to="/">LIBROS</Link>
        </li>
        <li>
          <Link to="/infantil-juvenil">INFANTIL Y JUVENIL</Link>
        </li>
      </ul>

      <hr className="nav-separator" />
    </nav>
  );
}

export default Navbar;
