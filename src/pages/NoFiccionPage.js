// Archivo: NoFiccionPage.js

import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function NoFiccionPage() {
  // CORRECCIÓN AQUÍ: Debe filtrar por 'no-ficcion'
  const librosDeNoFiccion = libros.filter(libro => libro.categoria === 'no-ficcion');

  return (
    <main className="container">
      <h2 className="mb-4">Categoría: No Ficción</h2>
      <section className="book-list">
        {librosDeNoFiccion.map(libro => (
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </section>
    </main>
  );
}

export default NoFiccionPage;