import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

// Importamos cada una de nuestras nuevas páginas de categoría
import FiccionPage from './pages/FiccionPage';
import NoFiccionPage from './pages/NoFiccionPage';
import CienciaPage from './pages/CienciaPage';
// (Aquí importarías las otras páginas a medida que las crees, como InfantilPage, etc.)

function App() {
  return (
    <Router>
      <div className="App">
        {/* Estos componentes se mostrarán en todas las páginas */}
        <Header />
        <Navbar />
        
        {/* El componente <Routes> decide qué página mostrar según la URL */}
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<HomePage />} />

          {/* Rutas específicas para cada categoría */}
          <Route path="/ficcion" element={<FiccionPage />} />
          <Route path="/no-ficcion" element={<NoFiccionPage />} />
          <Route path="/ciencia-tecnologia" element={<CienciaPage />} />
          
          {/* (Aquí añadirías las rutas para las otras páginas que vayas creando) */}
          {/* Ejemplo: <Route path="/infantil-juvenil" element={<InfantilPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;