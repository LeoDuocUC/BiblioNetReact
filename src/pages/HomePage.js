// src/pages/HomePage.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';
import HeroCarousel from '../components/HeroCarousel'; // <-- 1. IMPORT THE CAROUSEL

function HomePage() {
  const { user } = useAuth();

  // Safe username for any shape (string or object)
  const safeUserName =
    typeof user === 'string' ? user : (user?.name || user?.email || 'Usuario');

  // Muestra algunos destacados (ajústalo si ya tenías otra selección)
  const destacados = Array.isArray(libros) ? libros.slice(0, 8) : [];

  return (
    <main className="container py-4">
      {/* 2. RENDER THE CAROUSEL HERE */}
      <HeroCarousel />

      {/* Bienvenida SOLO si hay sesión */}
      {user && (
        <div className="my-4"> {/* Added 'my-4' for spacing */}
          <h1 className="h3">Bienvenido, {safeUserName}</h1>
        </div>
      )}

      <h2 className="h4 mb-3">Libros Disponibles</h2>

      <div
        className="row g-4"
        style={{
          alignItems: 'stretch',
        }}
      >
        {destacados.map((libro) => (
          <div key={`${libro.id}-${libro.titulo}`} className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex">
            <div className="w-100">
              <LibroCard libro={libro} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default HomePage;