// Archivo: src/context/CartContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext();
export const MAX_ITEMS = 5;

export const CartProvider = ({ children }) => {
  // Hidratación SÍNCRONA: lee localStorage en el primer render
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cartItems');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Para enviar los libros al panel del usuario cuando se confirma
  const { addBooksToLoan } = useAuth();

  // Persiste el carrito y un contador rápido
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('cartCount', String(cartItems.length));
    } catch {
      // no-op
    }
  }, [cartItems]);

  const isLimitReached = cartItems.length >= MAX_ITEMS;

  const addToCart = (libro) => {
    setCartItems((prev) => {
      // No duplicados
      if (prev.some((b) => b.id === libro.id)) return prev;
      // Respeta el límite
      if (prev.length >= MAX_ITEMS) return prev;
      return [...prev, libro];
    });
  };

  const removeFromCart = (libroId) => {
    setCartItems((prev) => prev.filter((b) => b.id !== libroId));
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    // Pasa los libros al AuthContext (tu panel del usuario)
    addBooksToLoan(cartItems);
    // Limpia carrito
    setCartItems([]);
  };

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      placeOrder,
      isLimitReached,
      MAX_ITEMS,
    }),
    [cartItems, isLimitReached]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
