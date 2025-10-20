import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, placeOrder } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h2>Tu carrito de solicitudes está vacío.</h2>
        <Link to="/" className="btn btn-primary mt-3">Explorar libros</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tu Carrito de Solicitudes</h2>
      <ul className="list-group shadow-sm mb-4">
        {cartItems.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{item.titulo}</h5>
              <small className="text-muted">{item.autor}</small>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-danger btn-sm">
              Quitar
            </button>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-end">
        <button onClick={placeOrder} className="btn btn-success btn-lg">
          Solicitar Libros ({cartItems.length})
        </button>
      </div>
    </div>
  );
}

export default CartPage;