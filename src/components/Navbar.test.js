import React from 'react';
// --- FIX 1: REMOVE @testing-library/jest-dom ---
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

// --- FIX 2: Create a local render helper ---
const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('Navbar Component (Karma + Jasmine)', () => {

  it('debería renderizar el navbar y enlaces visibles', () => {
    renderWithRouter(<Navbar />);
    const nav = screen.getByRole('navigation');
    
    // --- FIX 3: Use .toBeTruthy() ---
    expect(nav).toBeTruthy(); 
    expect(screen.getByText(/Categorías/i)).toBeTruthy();
    expect(screen.getByText(/Libros/i)).toBeTruthy();
  });

  it('debería mostrar enlaces del menú al hacer clic en "CATEGORÍAS"', async () => {
    renderWithRouter(<Navbar />);
    const toggleLink = screen.getByRole('button', { name: /Categorías/i });
    
    // --- FIX 3: Use .toBeNull() ---
    expect(screen.queryByText(/^Ficción$/i)).toBeNull(); 

    fireEvent.click(toggleLink);

    // --- FIX 3: Use .toBeTruthy() ---
    const ficcionLink = await screen.findByText(/^Ficción$/i); // exact match
    expect(ficcionLink).toBeTruthy();
  });

  it('debería contener todos los enlaces del menú desplegable', async () => {
    renderWithRouter(<Navbar />);
    const toggleLink = screen.getByRole('button', { name: /Categorías/i });
    fireEvent.click(toggleLink);

    const rutas = [
      { texto: /^Ficción$/i, href: '/ficcion' },
      { texto: /^No Ficción$/i, href: '/no-ficcion' },
    ];

    for (const { texto, href } of rutas) {
      const link = await screen.findByRole('link', { name: texto });
      // --- FIX 3: Use .toBeTruthy() and manual attribute check ---
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe(href);
    }
  });
});