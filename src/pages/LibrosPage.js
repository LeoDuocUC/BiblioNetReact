import React from 'react';
import { libros } from '../data/libros'; // Import all your books
import LibroCard from '../components/LibroCard';

function LibrosPage() {
  // Use all books, not a slice
  const todosLosLibros = Array.isArray(libros) ? libros : [];

  return (
    <main className="container py-4">
      <h2 className="h4 mb-3">Todos los Libros Disponibles</h2>

      <div
        className="row g-4"
        style={{
          alignItems: 'stretch',
        }}
      >
        {todosLosLibros.map((libro) => (
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

export default LibrosPage;