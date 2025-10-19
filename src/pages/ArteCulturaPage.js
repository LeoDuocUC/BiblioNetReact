import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function ArteCulturaPage() {
  // Filtramos para obtener solo los libros de esta categoría
  const librosDeArte = libros.filter(libro => libro.categoria === 'arte-cultura');

  return (
    <main className="container">
      <h2>Categoría: Arte y Cultura</h2>
      <section className="book-list">
        {librosDeArte.map(libro => (
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

export default ArteCulturaPage;