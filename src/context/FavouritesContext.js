import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // We need this to link favourites to a user

const FavouritesContext = createContext();
const LS_KEY_PREFIX = 'userFavourites_';
const MAX_FAVOURITES = 4;

export const FavouritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favourites, setFavourites] = useState([]);

  // Create a unique localStorage key for the current user
  const getStorageKey = () => {
    if (!user || !user.name) return null; // No user, no storage
    // Use user's name as a simple unique ID. In a real app, use user.id
    return `${LS_KEY_PREFIX}${user.name.toLowerCase()}`;
  };

  // Load favourites from localStorage when user changes
  useEffect(() => {
    const storageKey = getStorageKey();
    if (!storageKey) {
      setFavourites([]); // No user, clear favourites
      return;
    }
    
    try {
      const raw = localStorage.getItem(storageKey);
      setFavourites(raw ? JSON.parse(raw) : []);
    } catch {
      setFavourites([]);
    }
  }, [user]); // Re-run when user logs in or out

  // Save favourites to localStorage
  const saveFavourites = (favs) => {
    const storageKey = getStorageKey();
    if (!storageKey) return; // Don't save if no user
    
    setFavourites(favs);
    try {
      localStorage.setItem(storageKey, JSON.stringify(favs));
    } catch {}
  };

  const addFavourite = (book) => {
    if (favourites.length >= MAX_FAVOURITES) {
      alert(`No se pueden agregar más de ${MAX_FAVOURITES} favoritos.`);
      return;
    }
    if (favourites.some(fav => fav.id === book.id)) {
      return; // Already a favourite
    }
    saveFavourites([...favourites, book]);
  };

  const removeFavourite = (bookId) => {
    saveFavourites(favourites.filter(fav => fav.id !== bookId));
  };

  const isFavourite = (bookId) => {
    return favourites.some(fav => fav.id === bookId);
  };

  const value = useMemo(
    () => ({
      favourites,
      addFavourite,
      removeFavourite,
      isFavourite,
      isFavouritesFull: favourites.length >= MAX_FAVOURITES,
    }),
    [favourites, user] // Re-memoize when favourites or user change
  );

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
};

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error('useFavourites must be used within a FavouritesProvider');
  return ctx;
};