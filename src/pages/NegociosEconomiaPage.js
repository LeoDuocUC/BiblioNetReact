import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function NegociosEconomiaPage() {
  // Filtramos para obtener solo los libros de esta categoría
  const librosDeNegocios = libros.filter(libro => libro.categoria === 'negocios-economia');

  return (
    <main className="container">
      <h2>Categoría: Negocios y Economía</h2>
      <section className="book-list">
        {librosDeNegocios.map(libro => (
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

export default NegociosEconomiaPage;
