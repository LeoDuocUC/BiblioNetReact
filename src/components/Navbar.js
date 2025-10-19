import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  // Se crea una variable de estado para saber si el menú está visible o no.
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <nav className="categories-navbar">
      <ul className="nav-links">
        {/* Se añaden los eventos onMouseEnter y onMouseLeave.
          - Cuando el mouse entra, se llama a setIsMenuVisible(true).
          - Cuando el mouse sale, se llama a setIsMenuVisible(false).
        */}
        <li 
          className="dropdown" 
          onMouseEnter={() => setIsMenuVisible(true)} 
          onMouseLeave={() => setIsMenuVisible(false)}
        >
          <a href="#">CATEGORÍAS ▼</a> 
          
          {/* Esta es la parte clave: Se añade la clase 'visible' dinámicamente.
            - Si 'isMenuVisible' es true, la clase del <ul> será "dropdown-menu visible".
            - Si 'isMenuVisible' es false, la clase será "dropdown-menu".
            El CSS que modificamos antes se encargará de mostrar u ocultar el menú basado en esta clase.
          */}
          <ul className={`dropdown-menu ${isMenuVisible ? 'visible' : ''}`}>
            <li><Link to="/ficcion">📚 Ficción</Link></li>
            <li><Link to="/no-ficcion">🧠 No ficción</Link></li>
            <li><Link to="/ciencia-tecnologia">🔬 Ciencia y tecnología</Link></li>
            <li><Link to="/arte-cultura">🎨 Arte y cultura</Link></li>
            <li><Link to="/negocios-economia">💼 Negocios y economía</Link></li>
            <li><Link to="/infantil-juvenil">👧 Infantil y juvenil</Link></li>
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