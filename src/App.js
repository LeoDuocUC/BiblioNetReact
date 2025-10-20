import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Importamos los componentes del layout y de protección
import Header from './components/Header';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; // Importamos la ruta protegida

// Importamos todas las páginas de la aplicación
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // Importamos la página del panel de usuario
import FiccionPage from './pages/FiccionPage';
import NoFiccionPage from './pages/NoFiccionPage';
import CienciaPage from './pages/CienciaPage';
import ArteCulturaPage from './pages/ArteCulturaPage';
import NegociosEconomiaPage from './pages/NegociosEconomiaPage';
import InfantilJuvenilPage from './pages/InfantilJuvenilPage';

function App() {
  return (
    // Envolvemos toda la aplicación en el AuthProvider para que el estado de login
    // esté disponible en todas partes.
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          
          <Routes>
            {/* Rutas Públicas (accesibles para todos) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Rutas de Categorías */}
            <Route path="/ficcion" element={<FiccionPage />} />
            <Route path="/no-ficcion" element={<NoFiccionPage />} />
            <Route path="/ciencia-tecnologia" element={<CienciaPage />} />
            <Route path="/arte-cultura" element={<ArteCulturaPage />} />
            <Route path="/negocios-economia" element={<NegociosEconomiaPage />} />
            <Route path="/infantil-juvenil" element={<InfantilJuvenilPage />} />
            
            {/* Ruta Protegida
              - El componente `DashboardPage` está envuelto en `ProtectedRoute`.
              - Si el usuario no ha iniciado sesión, `ProtectedRoute` lo redirigirá a /login.
              - Si ha iniciado sesión, mostrará el `DashboardPage`.
            */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;