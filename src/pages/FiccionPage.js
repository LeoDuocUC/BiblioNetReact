import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function FiccionPage() {
  const librosDeFiccion = libros.filter(libro => libro.categoria === 'ficcion');
  return (
    <main className="container">
      <h2>Categoría: Ficción</h2>
      <section className="book-list">
        {librosDeFiccion.map(libro => (
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
  );
}

export default FiccionPage;