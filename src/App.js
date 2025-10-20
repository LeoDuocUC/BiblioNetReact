import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos todos nuestros "Proveedores" de contexto
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext'; // 1. Importamos el nuevo SearchProvider

// Importamos los componentes y páginas
import Header from './components/Header';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import SearchResultsPage from './pages/SearchResultsPage'; // 2. Importamos la nueva página de resultados
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
        {/* 3. Envolvemos la aplicación en el SearchProvider */}
        <SearchProvider>
          <Router>
            <div className="App">
              <Header />
              <Navbar />
              <Routes>
                {/* ... (tus otras rutas) ... */}
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
                
                {/* 4. Añadimos la nueva ruta para los resultados de búsqueda */}
                <Route path="/search" element={<SearchResultsPage />} />
              </Routes>
            </div>
          </Router>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;