// Archivo: FiccionPage.js

import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function FiccionPage() {
  // CORRECCIÓN AQUÍ: Debe filtrar por 'ficcion'
  const librosDeFiccion = libros.filter(libro => libro.categoria === 'ficcion');

  return (
    <main className="container">
      <h2 className="mb-4">Categoría: Ficción</h2>
      <section className="book-list">
        {librosDeFiccion.map(libro => (
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </section>
    </main>
  );
}

export default FiccionPage;