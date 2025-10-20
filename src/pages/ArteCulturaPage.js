import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function ArteCulturaPage() {
  // 1. Filtramos la lista de libros para obtener solo los de la categoría "arte-cultura".
  const librosDeArte = libros.filter(libro => libro.categoria === 'arte-cultura');

  return (
    <main className="container">
      <h2 className="mb-4">Categoría: Arte y Cultura</h2>
      <section className="book-list">
        {/* 2. Mapeamos la lista filtrada para crear una tarjeta por cada libro. */}
        {librosDeArte.map(libro => (
          // 3. CORRECCIÓN CLAVE: Pasamos el objeto 'libro' completo como una sola prop.
          //    Esto permite que LibroCard tenga toda la información necesaria para el carrito.
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </section>
    </main>
  );
}

export default ArteCulturaPage;
