import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

// Helper function to render with the router
const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('Navbar Component (Karma + Jasmine)', () => {

  it('debería renderizar el navbar y todos los enlaces', () => {
    renderWithRouter(<Navbar />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeTruthy();

    // Check that all links are now visible
    expect(screen.getByRole('link', { name: /Inicio/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Libros/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Infantil y Juvenil/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Ciencia y Tecnología/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /No Ficción/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Negocios y Economía/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Arte y Cultura/i })).toBeTruthy();
  });

  // --- ALL DROPDOWN-RELATED TESTS HAVE BEEN REMOVED ---
  // The test 'debería mostrar enlaces del menú...' has been deleted.
  // The test 'debería contener todos los enlaces...' has been deleted.

});