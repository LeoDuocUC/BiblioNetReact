import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos todos nuestros "Proveedores" de contexto
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

// Importamos los componentes y páginas
import Header from './components/Header';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import SearchResultsPage from './pages/SearchResultsPage';
import FiccionPage from './pages/FiccionPage';
import NoFiccionPage from './pages/NoFiccionPage';
import CienciaPage from './pages/CienciaPage';
import ArteCulturaPage from './pages/ArteCulturaPage';
import NegociosEconomiaPage from './pages/NegociosEconomiaPage';
import InfantilJuvenilPage from './pages/InfantilJuvenilPage';

// Componente que contiene toda la estructura de rutas y UI, PERO NO EL ROUTER
const AppContent = () => (
    <div className="App">
        <Header />
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/ficcion" element={<FiccionPage />} />
            <Route path="/no-ficcion" element={<NoFiccionPage />} />
            <Route path="/ciencia-tecnologia" element={<CienciaPage />} />
            <Route path="/arte-cultura" element={<ArteCulturaPage />} />
            <Route path="/negocios-economia" element={<NegociosEconomiaPage />} />
            <Route path="/infantil-juvenil" element={<InfantilJuvenilPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
    </div>
);

// Componente principal que envuelve todo en Providers y el Router
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <Router>
            <AppContent />
          </Router>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

// Exportamos AppContent para usarlo en los tests sin el Router
export { AppContent };
export default App;
