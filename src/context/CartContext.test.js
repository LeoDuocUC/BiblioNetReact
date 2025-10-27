<<<<<<< HEAD
import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
=======
import React from 'react';
import { renderHook } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
>>>>>>> c3b0dce6224a06b2cae9a23d77bdafc69967f175

describe('Pruebas en <CartContext />', () => {

<<<<<<< HEAD
export const CartProvider = ({ children }) => {
  const { user, addBooksToLoan } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    if (!user) {
      alert('Debes iniciar sesión para solicitar libros.');
      return;
    }

    if (cartItems.length >= 3) {
      alert('No puedes solicitar más de 3 libros.');
      return;
    }

    const existingBook = cartItems.find((item) => item.id === book.id);
    if (existingBook) {
      if (existingBook.titulo === book.titulo) {
        alert(`${book.titulo} ya está en tu carrito.`);
      } else {
        alert('Otro Título ya está en tu carrito.');
      }
      return;
    }

    setCartItems([...cartItems, book]);
  };

  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((b) => b.id !== bookId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = () => {
    if (!user) {
      alert('Debes iniciar sesión para solicitar libros.');
      return;
    }

    if (cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    if (addBooksToLoan) {
      addBooksToLoan(cartItems);
      alert('¡Tu solicitud ha sido procesada! Los libros ahora aparecen en tu panel.');
      clearCart();
    } else {
      console.warn('addBooksToLoan no está disponible en AuthContext.');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
=======
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
>>>>>>> c3b0dce6224a06b2cae9a23d77bdafc69967f175
