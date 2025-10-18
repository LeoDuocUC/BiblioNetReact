import React from 'react';

// Este componente es una "plantilla" que recibe los datos de cada libro a través de 'props'.
// 'props' es un objeto que contiene toda la información que le pasamos desde la página padre
// (por ejemplo, desde HomePage.js o FiccionPage.js).
function LibroCard(props) {
  return (
    // Usamos la misma clase 'book' que en tu CSS original para mantener los estilos.
    <article className="book">
      {/* La URL de la imagen se recibe a través de props.imagenUrl.
        Las imágenes de la carpeta 'public' se pueden acceder directamente con una barra "/" al inicio.
      */}
      <img src={props.imagenUrl} alt={`Portada de ${props.titulo}`} />
      
      {/* Mostramos el título, autor y género que vienen en las props */}
      <h3>{props.titulo}</h3>
      <p>Autor: {props.autor}</p>
      <p>Género: {props.genero}</p>
      
      {/* Este es un renderizado condicional. El botón "Agregar" solo se mostrará en la pantalla
        si le pasamos la propiedad 'conBoton' como verdadera (true) al componente.
        Ejemplo de uso: <LibroCard conBoton={true} />
      */}
      {props.conBoton && <button className="add-to-cart-btn">Agregar</button>}
    </article>
  );
}

export default LibroCard;