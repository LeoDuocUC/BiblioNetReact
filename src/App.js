// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LibrosPage from './pages/LibrosPage'; // <-- 1. IMPORT THE NEW PAGE
import FiccionPage from './pages/FiccionPage';
import NoFiccionPage from './pages/NoFiccionPage';
import InfantilJuvenilPage from './pages/InfantilJuvenilPage';
import CienciaPage from './pages/CienciaPage';
import NegociosEconomiaPage from './pages/NegociosEconomiaPage';
import ArteCulturaPage from './pages/ArteCulturaPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/libros" element={<LibrosPage />} /> {/* <-- 2. ADD THE NEW ROUTE */}
        <Route path="/ficcion" element={<FiccionPage />} />
        <Route path="/no-ficcion" element={<NoFiccionPage />} />
        <Route path="/infantil-juvenil" element={<InfantilJuvenilPage />} />
        <Route path="/ciencia-tecnologia" element={<CienciaPage />} />
        <Route path="/negocios-economia" element={<NegociosEconomiaPage />} />
        <Route path="/arte-cultura" element={<ArteCulturaPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacto"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;