import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  // El estado para controlar la visibilidad sigue siendo el mismo.
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // CLAVE: Creamos una nueva función que se ejecutará al hacer clic.
  // Esta función invierte el valor actual de 'isMenuVisible'.
  // Si está en 'false', lo cambia a 'true', y viceversa.
  const handleToggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <nav className="categories-navbar">
      <ul className="nav-links">
        {/*
          - Eliminamos los eventos onMouseEnter y onMouseLeave.
          - Ahora, el 'li' ya no controla el menú.
        */}
        <li className="dropdown">
          {/*
            - El evento 'onClick' ahora está en el enlace <a>.
            - 'event.preventDefault()' se añade para evitar que el enlace '#' intente navegar a algún sitio.
          */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => { e.preventDefault(); handleToggleMenu(); }}>
            CATEGORÍAS ▼
          </a>

          {/* La lógica para añadir la clase 'visible' no cambia. Sigue dependiendo del estado. */}
          <ul className={`dropdown-menu ${isMenuVisible ? 'visible' : ''}`}>
            {/* Para que el menú se cierre al hacer clic en una opción, añadimos 'onClick' aquí también */}
            <li onClick={() => setIsMenuVisible(false)}><Link to="/ficcion">📚 Ficción</Link></li>
            <li onClick={() => setIsMenuVisible(false)}><Link to="/no-ficcion">🧠 No ficción</Link></li>
            <li onClick={() => setIsMenuVisible(false)}><Link to="/ciencia-tecnologia">🔬 Ciencia y tecnología</Link></li>
            <li onClick={() => setIsMenuVisible(false)}><Link to="/arte-cultura">🎨 Arte y cultura</Link></li>
            <li onClick={() => setIsMenuVisible(false)}><Link to="/negocios-economia">💼 Negocios y economía</Link></li>
            <li onClick={() => setIsMenuVisible(false)}><Link to="/infantil-juvenil">👧 Infantil y juvenil</Link></li>
          </ul>
        </li>
        <li><Link to="/">LIBROS</Link></li>
        <li><Link to="/infantil-juvenil">INFANTIL Y JUVENIL</Link></li>
      </ul>
      <hr className="nav-separator" />
    </nav>
  );
}

export default Navbar;