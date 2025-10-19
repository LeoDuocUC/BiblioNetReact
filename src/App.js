import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 1. Importamos el AuthProvider

// Importamos los componentes del layout
import Header from './components/Header';
import Navbar from './components/Navbar';

// Importamos todas las páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; // 2. Importamos la nueva página de Login
import FiccionPage from './pages/FiccionPage';
import NoFiccionPage from './pages/NoFiccionPage';
import CienciaPage from './pages/CienciaPage';
import ArteCulturaPage from './pages/ArteCulturaPage';
import NegociosEconomiaPage from './pages/NegociosEconomiaPage';
import InfantilJuvenilPage from './pages/InfantilJuvenilPage';

function App() {
  return (
    // 3. Envolvemos toda la aplicación con AuthProvider.
    //    Esto hace que el contexto (user, login, logout) esté disponible en todas partes.
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} /> {/* 4. Añadimos la ruta para /login */}
            
            {/* Rutas de Categorías */}
            <Route path="/ficcion" element={<FiccionPage />} />
            <Route path="/no-ficcion" element={<NoFiccionPage />} />
            <Route path="/ciencia-tecnologia" element={<CienciaPage />} />
            <Route path="/arte-cultura" element={<ArteCulturaPage />} />
            <Route path="/negocios-economia" element={<NegociosEconomiaPage />} />
            <Route path="/infantil-juvenil" element={<InfantilJuvenilPage />} />
            
            {/* Próximamente añadiremos la ruta para el panel de usuario: */}
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;