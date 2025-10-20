import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function HomePage() {
  return (
    <>
      <HeroCarousel />
      <main className="container">
        <h2 className="mb-4">Libros Disponibles</h2>
        <section className="book-list">
          {libros.map(libro => (
            // CORRECCIÓN: En lugar de pasar cada propiedad por separado,
            // ahora pasamos el objeto 'libro' completo en una sola prop.
            // Esto es necesario para que el nuevo LibroCard pueda añadir
            // el libro completo al carrito de compras.
            <LibroCard key={libro.id} libro={libro} />
          ))}
        </section>
      </main>
    </>
  );
}

export default HomePage;
