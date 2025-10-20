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
          // CORRECCIÓN: Pasamos el objeto 'libro' completo
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </section>
    </main>
  );
}

export default NoFiccionPage;