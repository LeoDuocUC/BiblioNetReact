import React from 'react';
import { libros } from '../data/libros'; // Importamos la lista completa de libros desde nuestro archivo de datos
import LibroCard from '../components/LibroCard'; // Importamos el componente reutilizable para cada tarjeta de libro

// Este es el componente que funcionará como la página de inicio de la aplicación.
function HomePage() {
  return (
    <main className="container">
      <h2>Libros Disponibles</h2>
      
      {/* Esta sección contendrá la lista de todas las tarjetas de libros */}
      <section className="book-list">
        
        {/* Usamos el método .map() para recorrer el array 'libros'.
          Por cada objeto 'libro' en el array, creamos un componente <LibroCard>.
          Esto es mucho más eficiente que escribir el HTML para cada libro manualmente.
        */}
        {libros.map(libro => (
          <LibroCard
            key={libro.id} // La 'key' es un identificador único que React necesita para optimizar el renderizado de listas.
            
            // Pasamos los datos de cada libro como 'props' al componente LibroCard.
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

export default HomePage;
