import React from 'react';
import { useCart } from '../context/CartContext'; // Importamos el hook para usar el carrito

// CORRECCIÓN: Ahora recibimos el objeto 'libro' completo como una sola prop.
function LibroCard({ libro }) {
  // Obtenemos las funciones y datos que necesitamos del contexto del carrito.
  const { addToCart, cartItems, MAX_ITEMS } = useCart();

  // Verificamos si este libro ya está en el carrito.
  const isInCart = cartItems.some(item => item.id === libro.id);
  // Verificamos si el carrito ha alcanzado su capacidad máxima.
  const isCartFull = cartItems.length >= MAX_ITEMS;

  return (
    <article className="book">
      <img src={libro.imagenUrl} alt={`Portada de ${libro.titulo}`} />
      <h3>{libro.titulo}</h3>
      <p>Autor: {libro.autor}</p>
      <p>Género: {libro.genero}</p>
      
      {/* El botón ahora tiene una lógica más inteligente:
        - onClick: Llama a la función 'addToCart' pasándole el objeto 'libro' completo.
        - disabled: Se deshabilita si el libro ya está en el carrito O si el carrito está lleno.
        - Texto dinámico: El texto del botón cambia para informar al usuario sobre el estado.
      */}
      <button 
        className="add-to-cart-btn mt-auto" 
        onClick={() => addToCart(libro)}
        disabled={isInCart || isCartFull}
      >
        {isInCart 
          ? 'En el carrito' 
          : (isCartFull && !isInCart ? 'Carrito lleno' : 'Agregar para Pedir')}
      </button>
    </article>
  );
}

export default LibroCard;