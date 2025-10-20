import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage'; // 1. Import the new page
import FiccionPage from './pages/FiccionPage';
import NoFiccionPage from './pages/NoFiccionPage';
import CienciaPage from './pages/CienciaPage';
import ArteCulturaPage from './pages/ArteCulturaPage';
import NegociosEconomiaPage from './pages/NegociosEconomiaPage';
import InfantilJuvenilPage from './pages/InfantilJuvenilPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Navbar />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/contacto" element={<ContactPage />} /> {/* 2. Add the route */}
              
              {/* Category Routes */}
              <Route path="/ficcion" element={<FiccionPage />} />
              <Route path="/no-ficcion" element={<NoFiccionPage />} />
              <Route path="/ciencia-tecnologia" element={<CienciaPage />} />
              <Route path="/arte-cultura" element={<ArteCulturaPage />} />
              <Route path="/negocios-economia" element={<NegociosEconomiaPage />} />
              <Route path="/infantil-juvenil" element={<InfantilJuvenilPage />} />
              
              {/* Protected Route */}
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