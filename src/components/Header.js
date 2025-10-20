import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext'; // 1. Importamos el hook de búsqueda

function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { performSearch } = useSearch(); // 2. Obtenemos la función para buscar del contexto
  const navigate = useNavigate();
  
  // 3. Creamos un estado local para guardar lo que el usuario escribe en la barra de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 4. Creamos la función que se ejecutará al enviar el formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Evitamos que la página se recargue
    if (!searchTerm.trim()) return; // No hacemos nada si la búsqueda está vacía
    
    performSearch(searchTerm); // Llamamos a la función de búsqueda del contexto
    navigate('/search'); // Redirigimos al usuario a la página de resultados
    setSearchTerm(''); // Limpiamos la barra de búsqueda después de buscar
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

      {/* 5. Convertimos el div de la búsqueda en un formulario con el evento onSubmit */}
      <form className="search-container" onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Buscar por título o autor..." 
          className="search-input"
          value={searchTerm} // El valor del input está controlado por nuestro estado
          onChange={(e) => setSearchTerm(e.target.value)} // Cada cambio actualiza el estado
        />
        <button type="submit" className="search-button">
          <span className="icon-placeholder">🔍</span>
        </button>
      </form>

      <div className="user-actions">
        {/* El resto del código para el usuario y el carrito no cambia */}
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
        
        <Link to="/contacto" className="action-link">
          <span className="icon-placeholder">✉️</span>
          <span className="action-text">Contacto</span>
        </Link>

        <Link to="/carrito" className="action-link position-relative">
          <span className="icon-placeholder">🛒</span>
          {cartItems.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
