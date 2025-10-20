import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Importamos el proveedor del carrito

// Importamos todos los componentes y páginas
import Header from './components/Header';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage'; // Importamos la página del carrito
import FiccionPage from './pages/FiccionPage';
import NoFiccionPage from './pages/NoFiccionPage';
import CienciaPage from './pages/CienciaPage';
import ArteCulturaPage from './pages/ArteCulturaPage';
import NegociosEconomiaPage from './pages/NegociosEconomiaPage';
import InfantilJuvenilPage from './pages/InfantilJuvenilPage';

function App() {
  return (
    <AuthProvider>
      {/* Envolvemos la aplicación también con CartProvider */}
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Navbar />
            
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/carrito" element={<CartPage />} /> {/* Añadimos la ruta del carrito */}
              
              {/* Rutas de Categorías */}
              <Route path="/ficcion" element={<FiccionPage />} />
              <Route path="/no-ficcion" element={<NoFiccionPage />} />
              <Route path="/ciencia-tecnologia" element={<CienciaPage />} />
              <Route path="/arte-cultura" element={<ArteCulturaPage />} />
              <Route path="/negocios-economia" element={<NegociosEconomiaPage />} />
              <Route path="/infantil-juvenil" element={<InfantilJuvenilPage />} />
              
              {/* Ruta Protegida */}
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
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
