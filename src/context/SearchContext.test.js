import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useSearch, SearchProvider } from './SearchContext';

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const { searchResults, performSearch, query } = useSearch();
  return (
    <div>
      <span data-testid="query">{query}</span>
      <button onClick={() => performSearch('años')}>Search for años</button>
      <button onClick={() => performSearch('llosa')}>Search for llosa</button>
      <button onClick={() => performSearch(' ')}>Search empty</button>
      <div data-testid="results-count">{searchResults.length}</div>
    </div>
  );
};

// Se utiliza 'describe' para agrupar, funciona igual en Jest y Jasmine
describe('SearchContext', () => { 

  // Cambiamos 'test' por 'it' (Sintaxis de Jasmine)
  it('debería inicializar con un array vacío de resultados y un query vacío', () => { 
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    expect(screen.getByTestId('query')).toHaveTextContent('');
    expect(screen.getByTestId('results-count')).toHaveTextContent('0');
  });


  // Cambiamos 'test' por 'it'
  it('debería realizar una búsqueda y actualizar los resultados y el query', () => { 
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const searchButton = screen.getByText('Search for años');

    act(() => {
      searchButton.click();
    });

    expect(screen.getByTestId('query')).toHaveTextContent('años');
    const resultCount = parseInt(screen.getByTestId('results-count').textContent, 10);
    expect(resultCount).toBeGreaterThan(0); 
  });


  // Cambiamos 'test' por 'it'
  it('debería vaciar los resultados si el término de búsqueda está vacío o solo tiene espacios', () => { 
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const emptySearchButton = screen.getByText('Search empty');

    // 1. Realizamos una búsqueda válida primero para establecer resultados > 0
    act(() => {
      screen.getByText('Search for llosa').click();
    });
    const initialCount = parseInt(screen.getByTestId('results-count').textContent, 10);
    expect(initialCount).toBeGreaterThan(0); 

    // 2. Ejecutamos la búsqueda vacía (cubre la rama 'if (!searchTerm.trim())')
    act(() => {
      emptySearchButton.click();
    });

    expect(screen.getByTestId('query')).toHaveTextContent(' '); 
    expect(screen.getByTestId('results-count')).toHaveTextContent('0');
  });

});