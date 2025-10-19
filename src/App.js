import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import layout components
import Header from './components/Header';
import Navbar from './components/Navbar';

// Import all page components
import HomePage from './pages/HomePage';
import FiccionPage from './pages/FiccionPage';
import NoFiccionPage from './pages/NoFiccionPage';
import CienciaPage from './pages/CienciaPage';
import ArteCulturaPage from './pages/ArteCulturaPage';
import NegociosEconomiaPage from './pages/NegociosEconomiaPage';
import InfantilJuvenilPage from './pages/InfantilJuvenilPage';

function App() {
  return (
    // The Router component wraps the entire application to enable routing
    <Router>
      <div className="App">
        {/* These components will be displayed on every page */}
        <Header />
        <Navbar />
        
        {/* The Routes component determines which page component to render based on the URL */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<HomePage />} />

          {/* Specific routes for each category page */}
          <Route path="/ficcion" element={<FiccionPage />} />
          <Route path="/no-ficcion" element={<NoFiccionPage />} />
          <Route path="/ciencia-tecnologia" element={<CienciaPage />} />
          <Route path="/arte-cultura" element={<ArteCulturaPage />} />
          <Route path="/negocios-economia" element={<NegociosEconomiaPage />} />
          <Route path="/infantil-juvenil" element={<InfantilJuvenilPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;