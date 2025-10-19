import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function InfantilJuvenilPage() {
  // Filtramos para obtener solo los libros de esta categoría
  const librosInfantiles = libros.filter(libro => libro.categoria === 'infantil-juvenil');

  return (
    <main className="container">
      <h2>Categoría: Infantil y Juvenil</h2>
      <section className="book-list">
        {librosInfantiles.map(libro => (
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

export default InfantilJuvenilPage;