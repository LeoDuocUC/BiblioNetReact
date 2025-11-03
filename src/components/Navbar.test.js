import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component (Karma + Jasmine)', () => {

  it('debería renderizar el navbar y enlaces visibles', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation', { hidden: true });
    expect(nav).toBeTruthy();

    // Verifica elementos principales
    expect(screen.getAllByText(/CATEGORÍAS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/LIBROS/i).length).toBeGreaterThan(0);
  });

  it('debería alternar visibilidad del menú al hacer clic en "CATEGORÍAS"', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleLink = screen.getByText(/CATEGORÍAS/i);
    const dropdown = document.querySelector('.dropdown-menu');

    expect(dropdown.classList.contains('visible')).toBeFalse();

    fireEvent.click(toggleLink);
    expect(dropdown.classList.contains('visible')).toBeTrue();

    fireEvent.click(toggleLink);
    expect(dropdown.classList.contains('visible')).toBeFalse();
  });

  it('debería cerrar el menú al hacer clic en una opción', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleLink = screen.getByText(/CATEGORÍAS/i);
    fireEvent.click(toggleLink);

    const opciones = screen.getAllByRole('link', { name: /Ficción/i });
    fireEvent.click(opciones[0]);

    const dropdown = document.querySelector('.dropdown-menu');
    expect(dropdown.classList.contains('visible')).toBeFalse();
  });

  it('debería contener todos los enlaces del menú desplegable', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const rutas = [
      { texto: /Ficción/i, href: '/ficcion' },
      { texto: /No ficción/i, href: '/no-ficcion' },
      { texto: /Ciencia y tecnología/i, href: '/ciencia-tecnologia' },
      { texto: /Arte y cultura/i, href: '/arte-cultura' },
      { texto: /Negocios y economía/i, href: '/negocios-economia' },
      { texto: /Infantil y juvenil/i, href: '/infantil-juvenil' }
    ];

    rutas.forEach(({ texto, href }) => {
      const links = screen.getAllByRole('link', { name: texto });
      const found = Array.from(links).some(a => a.getAttribute('href') === href);
      expect(found).toBeTrue();
    });
  });

  it('debería renderizar el separador visual (hr)', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const hr = document.querySelector('.nav-separator');
    expect(hr).toBeTruthy();
  });

  // 🎯 Nuevo: accesibilidad por teclado
  it('debería abrir y cerrar el menú con teclado (Enter / Escape)', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleLink = screen.getByText(/CATEGORÍAS/i);
    const dropdown = document.querySelector('.dropdown-menu');

    // Simula tecla Enter (abre)
    fireEvent.keyDown(toggleLink, { key: 'Enter', code: 'Enter' });
    expect(dropdown.classList.contains('visible')).toBeTrue();

    // Simula tecla Escape (cierra)
    fireEvent.keyDown(toggleLink, { key: 'Escape', code: 'Escape' });
    expect(dropdown.classList.contains('visible')).toBeFalse();
  });
});
