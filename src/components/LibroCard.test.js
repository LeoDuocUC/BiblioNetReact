import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import LibroCard from '../components/LibroCard';

describe('<LibroCard />', () => {
  const libro = { id: 1, titulo: 'Libro A', autor: 'Autor X', genero: 'Ficción' };

  it('Agrega libro al carrito y desactiva botón', () => {
    render(
      <CartProvider>
        <LibroCard libro={libro} />
      </CartProvider>
    );

    const boton = screen.getByText(/Agregar para Pedir/i);
    fireEvent.click(boton);

    const carritoBoton = screen.getByText(/En el carrito/i);
    expect(carritoBoton.disabled).toBe(true); // ✅ funciona en Karma/Jasmine
  });

  it('No permite agregar libros repetidos', () => {
    render(
      <CartProvider>
        <LibroCard libro={libro} />
        <LibroCard libro={libro} />
      </CartProvider>
    );

    const botones = screen.getAllByText(/Agregar para Pedir/i);
    fireEvent.click(botones[0]);
    fireEvent.click(botones[1]);

    const carritoBotones = screen.getAllByText(/En el carrito/i);
    expect(carritoBotones.length).toBe(2); // ambos botones muestran "En el carrito"
  });
});
