import React from 'react';
import { libros } from '../data/libros';
import LibroCard from '../components/LibroCard';

function InfantilJuvenilPage() {
  // 1. Filtramos la lista de libros para obtener solo los de la categoría "infantil-juvenil".
  const librosInfantiles = libros.filter(libro => libro.categoria === 'infantil-juvenil');

  return (
    <main className="container">
      <h2 className="mb-4">Categoría: Infantil y Juvenil</h2>
      <section className="book-list">
        {/* 2. Mapeamos la lista filtrada para crear una tarjeta por cada libro. */}
        {librosInfantiles.map(libro => (
          // 3. CORRECCIÓN CLAVE: Pasamos el objeto 'libro' completo como una sola prop.
          //    Esto permite que LibroCard tenga toda la información necesaria para el carrito.
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </section>
    </main>
  );
}

export default InfantilJuvenilPage;