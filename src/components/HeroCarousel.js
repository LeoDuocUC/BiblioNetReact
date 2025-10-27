import React from 'react';
import { Carousel } from 'react-bootstrap';

function HeroCarousel() {
  const carouselItems = [
    {
      imgSrc: '/imagen/Diapositiva1-34-e1593899389735.jpg',
      alt: 'Portada de 1984',
      captionTitle: 'Clásicos Inolvidables',
      captionText: 'Explora las obras que han definido generaciones.'
    },
    {
      imgSrc: '/imagen/la-isla-del-tesoro-edicion-actualizada-ilustrada-y-adaptada.jpg',
      alt: 'Portada de La Isla del Tesoro',
      captionTitle: 'Aventuras para Todos',
      captionText: 'Sumérgete en mundos llenos de misterio y emoción.'
    },
    {
      imgSrc: '/imagen/padre-rico-padre-pobre-libro.jpg',
      alt: 'Portada de Padre Rico, Padre Pobre',
      captionTitle: 'Nuevos Conocimientos',
      captionText: 'Expande tu mente con nuestra colección de no ficción.'
    }
  ];

  return (
    // 'fade' añade una transición suave entre las imágenes
    <Carousel fade className="mb-5 shadow-lg"> 
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          {/* Usamos un div contenedor para asegurar que la imagen se recorte bien */}
          {/* Añadimos un fondo gris por si la imagen no ocupa todo el espacio */}
          <div style={{ height: '500px', overflow: 'hidden', backgroundColor: '#eeeeee' }}>
             <img
              className="d-block w-100"
              src={item.imgSrc}
              alt={item.alt}
              style={{ 
                objectFit: 'contain', // <-- ESTE ES EL CAMBIO
                height: '100%', 
                width: '100%' 
              }}
            />
          </div>
          <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
            <h3>{item.captionTitle}</h3>
            <p>{item.captionText}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroCarousel;