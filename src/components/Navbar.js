import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el componente Link para la navegación

function Navbar() {
  return (
    <nav className="categories-navbar">
      <ul className="nav-links">
        <li className="dropdown">
          {/* Este enlace puede ser un '#' o 'button' ya que solo despliega el menú */}
          <a href="#">CATEGORÍAS ▼</a> 
          <ul className="dropdown-menu">
            {/* Aquí está el cambio clave: 
              Usamos <Link> en lugar de <a href="">.
              'to' especifica la ruta a la que navegará el usuario.
              Estas rutas coinciden con las que definimos en App.js.
            */}
            <li><Link to="/ficcion">📚 Ficción</Link></li>
            <li><Link to="/no-ficcion">🧠 No ficción</Link></li>
            <li><Link to="/ciencia-tecnologia">🔬 Ciencia y tecnología</Link></li>
            {/* (Aquí puedes añadir los enlaces a las otras categorías cuando las crees) */}
          </ul>
        </li>
        {/* El enlace principal ahora apunta a la ruta raíz de la aplicación */}
        <li><Link to="/">LIBROS</Link></li>
        {/* Este enlace también necesitará su propia página y ruta */}
        <li><Link to="/infantil-juvenil">INFANTIL Y JUVENIL</Link></li>
      </ul>
      <hr className="nav-separator" />
    </nav>
  );
}

export default Navbar;

