import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto para el carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito fácilmente
export const useCart = () => useContext(CartContext);

// 2. Creamos el Proveedor que envolverá nuestra aplicación
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const MAX_ITEMS = 3;

  // Función para agregar un libro al carrito
  const addToCart = (book) => {
    // Validar si el carrito ya está lleno
    if (cartItems.length >= MAX_ITEMS) {
      alert(`No puedes solicitar más de ${MAX_ITEMS} libros.`);
      return;
    }
    // Validar si el libro ya está en el carrito
    if (cartItems.find(item => item.id === book.id)) {
      alert(`${book.titulo} ya está en tu carrito.`);
      return;
    }
    // Agregar el libro al estado
    setCartItems(prevItems => [...prevItems, book]);
  };

  // Función para remover un libro del carrito
  const removeFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  // Función para "solicitar" los libros (limpia el carrito)
  const placeOrder = () => {
    if (cartItems.length === 0) return;
    alert('¡Tu solicitud ha sido procesada! Recibirás una notificación por correo.');
    setCartItems([]);
  };

  // El valor que compartirá el proveedor
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    placeOrder,
    MAX_ITEMS
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
