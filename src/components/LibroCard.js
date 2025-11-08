import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavourites } from '../context/FavouritesContext'; // <-- 1. IMPORT Favourites

function LibroCard({ libro }) {
  const { addToCart, cartItems, MAX_ITEMS } = useCart();
  const { user, hasLoan, activeLoansCount } = useAuth();
  
  // --- 2. GET Favourites functions ---
  const { addFavourite, removeFavourite, isFavourite, isFavouritesFull } = useFavourites();

  const isInCart = cartItems.some((item) => item.id === libro.id);
  const isInLoans = hasLoan(libro.id);

  // Global limit considers loans + cart
  const isGlobalLimitReached = activeLoansCount + cartItems.length >= MAX_ITEMS;

  const buttonLabel = isInCart || isInLoans
    ? 'Solicitado'
    : isGlobalLimitReached
    ? 'Límite Alcanzado'
    : 'Agregar para Pedir';

  const handleAdd = () => {
    if (isInCart || isInLoans || isGlobalLimitReached) return;
    addToCart(libro);
  };

  // --- 3. ADD Favourites logic ---
  const isFav = isFavourite(libro.id);
  const canAddFav = !isFavouritesFull || isFav;

  const handleAddFav = () => {
    addFavourite(libro);
  };
  
  const handleRemoveFav = () => {
    removeFavourite(libro.id);
  };
  // --- End of Favourites logic ---

  return (
    <article className="book">
      <img src={libro.imagenUrl} alt={`Portada de ${libro.titulo}`} />
      <h3>{libro.titulo}</h3>
      <p>Autor: {libro.autor}</p>
      <p>Género: {libro.genero}</p>

      {!user ? (
        <small className="text-muted d-block mt-2">Inicia sesión para pedir</small>
      ) : (
        // Use a Fragment <> to hold both buttons
        <> 
          <button
            className="add-to-cart-btn mt-auto"
            onClick={handleAdd}
            disabled={isInCart || isInLoans || isGlobalLimitReached}
            aria-disabled={isInCart || isInLoans || isGlobalLimitReached}
            title={
              isGlobalLimitReached
                ? `Alcanzaste el máximo de ${MAX_ITEMS} libros`
                : undefined
            }
          >
            {buttonLabel}
          </button>

          {/* --- 4. NEW FAVOURITES BUTTONS --- */}
          <div className="mt-2"> {/* Added margin for spacing */}
            {isFav ? (
              <button
                className="btn btn-outline-danger w-100" // Using Bootstrap classes
                onClick={handleRemoveFav}
              >
                Quitar de Favoritos
              </button>
            ) : (
              <button
                className="btn btn-outline-primary w-100"
                onClick={handleAddFav}
                disabled={!canAddFav} // Disable if max is reached
                title={!canAddFav ? 'Lista de favoritos llena' : 'Agregar a Favoritos'}
              >
                {isFavouritesFull ? 'Lista de favoritos llena' : 'Agregar a Favoritos'}
              </button>
            )}
          </div>
          {/* --- End of Favourites buttons --- */}
        </>
      )}
    </article>
  );
}

export default LibroCard;