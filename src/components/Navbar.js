// src/components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav className="categories-navbar">
      <ul className="nav-links">
        <li className="dropdown">
          <a href="#">CATEGORÍAS ▼</a> 
          <ul className="dropdown-menu">
            <li><a href="ficcion.html">📚 Ficción – novelas, cuentos, sagas, etc.</a></li>
            <li><a href="no-ficcion.html">🧠 No ficción – biografías, historia, ciencia, filosofía.</a></li>
            <li><a href="ciencia-tecnologia.html">🔬 Ciencia y tecnología – informática, medicina, ingeniería, robótica.</a></li>
            <li><a href="negocios-economia.html">💼 Negocios y economía – emprendimiento, finanzas, liderazgo.</a></li>
            <li><a href="arte-cultura.html">🎨 Arte y cultura – música, pintura, cine, diseño.</a></li>
            <li><a href="infantil-juvenil-categoria.html">👧 Infantil y juvenil – cuentos, aventuras, aprendizaje.</a></li>
          </ul>
        </li>
        <li><a href="index.html">LIBROS</a></li>
        <li><a href="infantil-juvenil.html">INFANTIL Y JUVENIL</a></li>
      </ul>
      <hr className="nav-separator" />
    </nav>
  );
}

export default Navbar;