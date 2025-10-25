import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext'; // 1. Importamos el contexto de autenticación para poder usarlo

// 🚨 CORRECCIÓN: Exportamos CartContext
export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // 2. OBTENEMOS la función 'addBooksToLoan' y el estado del 'user' desde AuthContext
  const { user, addBooksToLoan } = useAuth();
  const MAX_ITEMS = 3;

  const addToCart = (book) => {
    // 🚨 CORRECCIÓN: Reemplazamos alert() por console.warn
    if (!user) {
      console.warn('Debes iniciar sesión para solicitar libros.');
      return;
    }
    if (cartItems.length >= MAX_ITEMS) {
      console.warn(`No puedes solicitar más de ${MAX_ITEMS} libros.`);
      return;
    }
    if (cartItems.find(item => item.id === book.id)) {
      console.warn(`${book.titulo} ya está en tu carrito.`);
      return;
    }
    setCartItems(prevItems => [...prevItems, book]);
  };

  const removeFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    // 3. ¡AQUÍ ESTÁ LA CONEXIÓN!
    addBooksToLoan(cartItems);

    // 🚨 CORRECCIÓN: Reemplazamos alert() por console.log.
    console.log('¡Tu solicitud ha sido procesada! Los libros ahora aparecen en tu panel de usuario.');
    setCartItems([]); // Limpiamos el carrito como antes
  };

  const value = { cartItems, addToCart, removeFromCart, placeOrder, MAX_ITEMS };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
