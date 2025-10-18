import React from 'react';
import { libros } from '../data/libros'; // Importamos la lista completa de libros
import LibroCard from '../components/LibroCard'; // Importamos el componente para mostrar cada libro

function CienciaPage() {
  // Filtramos el array de 'libros' para obtener solo aquellos
  // cuya propiedad 'categoria' sea igual a 'ciencia-tecnologia'.
  const librosDeCiencia = libros.filter(libro => libro.categoria === 'ciencia-tecnologia');

  return (
    <main className="container">
      <h2>Categoría: Ciencia y Tecnología</h2>
      <section className="book-list">
        {/* Usamos .map() para recorrer la lista de libros ya filtrada */}
        {/* y crear un componente <LibroCard> para cada uno. */}
        {librosDeCiencia.map(libro => (
          <LibroCard
            key={libro.id} // La 'key' es un identificador único para React
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

export default CienciaPage;