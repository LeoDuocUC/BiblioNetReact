import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

describe('CartContext', () => {
  it('Agrega libro correctamente', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, titulo: 'Libro A' });
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].titulo).toBe('Libro A');
  });

  it('No permite agregar libros repetidos', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, titulo: 'Libro A' });
      result.current.addToCart({ id: 1, titulo: 'Libro A' });
    });

    expect(result.current.cartItems.length).toBe(1); // no se duplica
  });

  it('No permite superar MAX_ITEMS', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      for (let i = 1; i <= 6; i++) {
        result.current.addToCart({ id: i, titulo: `Libro ${i}` });
      }
    });

    expect(result.current.cartItems.length).toBe(5); // MAX_ITEMS = 5
  });
});
