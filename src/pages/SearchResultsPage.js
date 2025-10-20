import React from 'react';
import { useSearch } from '../context/SearchContext';
import LibroCard from '../components/LibroCard';

function SearchResultsPage() {
  const { searchResults, query } = useSearch();

  return (
    <main className="container my-5">
      <h2 className="mb-4">
        Resultados de búsqueda para: <em className="text-primary">{query}</em>
      </h2>
      
      {searchResults.length > 0 ? (
        <section className="book-list">
          {searchResults.map(libro => (
            <LibroCard key={libro.id} libro={libro} />
          ))}
        </section>
      ) : (
        <div className="text-center">
          <p>No se encontraron libros que coincidan con tu búsqueda.</p>
        </div>
      )}
    </main>
  );
}

export default SearchResultsPage;