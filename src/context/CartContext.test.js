import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

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
