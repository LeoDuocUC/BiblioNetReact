import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function NoFiccionPage() {
  // Filtramos la lista de libros para obtener solo los de "no-ficcion"
  const librosDeNoFiccion = libros.filter(libro => libro.categoria === 'no-ficcion');

  return (
    <main className="container">
      <h2>Categoría: No Ficción</h2>
      <section className="book-list">
        {/* Usamos .map() para renderizar un componente LibroCard por cada libro filtrado */}
        {librosDeNoFiccion.map(libro => (
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

export default NoFiccionPage;