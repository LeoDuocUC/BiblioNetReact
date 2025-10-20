import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function NoFiccionPage() {
  const librosDeNoFiccion = libros.filter(libro => libro.categoria === 'no-ficcion');

  return (
    <main className="container">
      <h2 className="mb-4">Categoría: No Ficción</h2>
      <section className="book-list">
        {librosDeNoFiccion.map(libro => (
          // CORRECCIÓN CLAVE: Pasamos el objeto 'libro' completo en una sola prop.
          // Esto permite que LibroCard tenga toda la información que necesita 
          // para funcionar con el carrito de compras.
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </section>
    </main>
  );
}

export default NoFiccionPage;