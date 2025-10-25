import React, { createContext, useState, useContext } from 'react';
import { libros } from '../data/libros'; // Importamos nuestra base de datos

// 🚨 CORRECCIÓN CRÍTICA: Exportamos SearchContext para que los tests puedan usar <SearchContext.Provider>
export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const performSearch = (searchTerm) => {
    setQuery(searchTerm); // Guardamos lo que el usuario buscó
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    // Filtramos los libros. Buscamos coincidencias en el título o el autor.
    const filtered = libros.filter(
      (libro) =>
        libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        libro.autor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const value = { searchResults, performSearch, query };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
