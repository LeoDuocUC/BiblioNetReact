import React from 'react';
import HeroCarousel from '../components/HeroCarousel'; // 1. Importamos el componente del carrusel
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function HomePage() {
  return (
    // Usamos un Fragment (<>) para poder devolver múltiples elementos sin un div extra
    <>
      {/* 2. Colocamos el componente del carrusel en la parte superior de la página */}
      <HeroCarousel />

      <main className="container">
        <h2 className="mb-4">Libros Disponibles</h2>
        <section className="book-list">
          {libros.map(libro => (
            <LibroCard
              key={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              genero={libro.genero}
              imagenUrl={libro.imagenUrl}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default HomePage;

