// Archivo: CartContext.js

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext'; // <-- 1. IMPORTAR useAuth

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const MAX_ITEMS = 5;
  const [cartItems, setCartItems] = useState([]);
  
  // 2. OBTENER LA FUNCIÓN DEL AUTHCONTEXT
  // (Asegúrate de que AuthProvider esté "envolviendo" a CartProvider en App.js para que esto funcione)
  const { addBooksToLoan } = useAuth(); 

  const addToCart = (libro) => {
    setCartItems(prev => {
      if (prev.length >= MAX_ITEMS) {
        console.warn(`No puedes solicitar más de ${MAX_ITEMS} libros.`);
        return prev; // no agregar
      }
      if (prev.find(item => item.id === libro.id)) {
        console.warn(`${libro.titulo} ya está en tu carrito.`);
        return prev; // no agregar repetido
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

    // --- ¡AQUÍ ESTÁ EL ARREGLO! ---
    // 3. Antes de limpiar el carrito, pasamos los libros al AuthContext.
    addBooksToLoan(cartItems);
    // -----------------------------

    console.log('¡Tu solicitud ha sido procesada! Los libros ahora aparecen en tu panel de usuario.');
    
    // Ahora sí limpiamos el carrito, después de haberlos "enviado"
    setCartItems([]); 
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, placeOrder, MAX_ITEMS }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);