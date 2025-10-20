import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function NegociosEconomiaPage() {
  // 1. Filtramos la lista de libros para obtener solo los de la categoría "negocios-economia".
  const librosDeNegocios = libros.filter(libro => libro.categoria === 'negocios-economia');

  return (
    <main className="container">
      <h2 className="mb-4">Categoría: Negocios y Economía</h2>
      <section className="book-list">
        {/* 2. Mapeamos la lista filtrada para crear una tarjeta por cada libro. */}
        {librosDeNegocios.map(libro => (
          // 3. CORRECCIÓN CLAVE: Pasamos el objeto 'libro' completo como una sola prop.
          //    Esto permite que LibroCard tenga toda la información necesaria para el carrito.
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </section>
    </main>
  );
}

export default NegociosEconomiaPage;