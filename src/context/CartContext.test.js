import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext'; // ✅ import AuthContext

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const MAX_ITEMS = 5;
  const [cartItems, setCartItems] = useState([]);
  
  // ✅ Access user from AuthContext
  const { user } = useContext(AuthContext);

  const addToCart = (libro) => {
    // ✅ Step 1: check if user is logged in
    if (!user) {
      alert('Debes iniciar sesión para solicitar libros.');
      return; // stop execution
    }

    // ✅ Step 2: enforce limits and duplication
    setCartItems(prev => {
      if (prev.length >= MAX_ITEMS) {
        console.warn(`No puedes solicitar más de ${MAX_ITEMS} libros.`);
        return prev;
      }
      if (prev.find(item => item.id === libro.id)) {
        console.warn(`${libro.titulo} ya está en tu carrito.`);
        return prev;
      }
      return [...prev, libro];
    });
  };

  const removeFromCart = (libroId) => {
    setCartItems(prev => prev.filter(item => item.id !== libroId));
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      console.warn('El carrito está vacío.');
      return;
    }
    console.log('¡Tu solicitud ha sido procesada! Los libros ahora aparecen en tu panel de usuario.');
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, placeOrder, MAX_ITEMS }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
