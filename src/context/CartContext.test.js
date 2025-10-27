import React from 'react';
import { renderHook } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

describe('Pruebas en <CartContext />', () => {

  let warnSpy;
  let logSpy;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');
    logSpy = spyOn(console, 'log');
  });

  it('debe iniciar con un carrito vacío', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.MAX_ITEMS).toBe(5);
  });

  it('debe agregar libros correctamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    const libro = { id: 1, titulo: 'Libro A' };

    React.act(() => {
      result.current.addToCart(libro);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0]).toEqual(libro);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('debe evitar agregar un libro duplicado', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    const libro = { id: 1, titulo: 'Libro A' };

    React.act(() => {
      result.current.addToCart(libro);
      result.current.addToCart(libro);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(warnSpy).toHaveBeenCalledWith(`${libro.titulo} ya está en tu carrito.`);
  });

  it('debe evitar agregar más de 5 libros', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    React.act(() => {
      for (let i = 1; i <= 6; i++) {
        result.current.addToCart({ id: i, titulo: `Libro ${i}` });
      }
    });

    expect(result.current.cartItems.length).toBe(5);
    expect(warnSpy).toHaveBeenCalledWith('No puedes solicitar más de 5 libros.');
  });

  it('debe eliminar libros del carrito correctamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    const libro = { id: 1, titulo: 'Libro A' };

    React.act(() => {
      result.current.addToCart(libro);
      result.current.removeFromCart(1);
    });

    expect(result.current.cartItems.length).toBe(0);
  });

  it('debe advertir si se intenta hacer pedido con carrito vacío', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    React.act(() => {
      result.current.placeOrder();
    });

    expect(warnSpy).toHaveBeenCalledWith('El carrito está vacío.');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('debe limpiar el carrito al realizar un pedido válido', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    React.act(() => {
      result.current.addToCart({ id: 1, titulo: 'Libro A' });
      result.current.placeOrder();
    });

    expect(logSpy).toHaveBeenCalledWith(
      '¡Tu solicitud ha sido procesada! Los libros ahora aparecen en tu panel de usuario.'
    );
    expect(result.current.cartItems).toEqual([]);
  });

});
