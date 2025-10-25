import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; 
import LibroCard from './LibroCard'; 
import { CartContext } from '../context/CartContext'; 

const mockAddToCart = jasmine.createSpy('addToCart'); 

describe('Pruebas en <LibroCard />', () => {
  const mockLibro = {
    id: 1,
    titulo: 'El Caballero de la Noche',
    autor: 'Frank Miller',
    genero: 'Ficción',
    imagenUrl: '/ruta/imagen.jpg'
  };

  const MAX_ITEMS = 5;
  let baseCartState; 
  
  beforeEach(() => {
    mockAddToCart.calls.reset(); 
    baseCartState = {
      addToCart: mockAddToCart,
      cartItems: [],
      MAX_ITEMS: MAX_ITEMS,
    };
  });

  const CartProviderWrapper = ({ children }) => (
    <CartContext.Provider value={baseCartState}>
      {children}
    </CartContext.Provider>
  );

  it('Debe renderizar la información del libro correctamente', () => {
    render(
      <CartProviderWrapper>
        <LibroCard libro={mockLibro} />
      </CartProviderWrapper>
    ); 

    expect(screen.queryByText(/el caballero de la noche/i)).toBeTruthy();
    expect(screen.queryByText(/frank miller/i)).toBeTruthy();
  });
  
  it('Debe llamar a addToCart al hacer clic en el botón de añadir', () => {
    render(
      <CartProviderWrapper>
        <LibroCard libro={mockLibro} />
      </CartProviderWrapper>
    );
    
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));
    
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockLibro); 
  });
});
