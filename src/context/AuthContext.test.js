import React from 'react';
import { renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

describe('Pruebas en <AuthContext />', () => {

  it('debe tener usuario y libros prestados vacíos por defecto', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    expect(result.current.user).toBe(null);
    expect(result.current.loanedBooks).toEqual([]);
  });

  it('debe permitir hacer login y guardar el usuario', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const mockUser = { name: 'Leo', email: 'usuario@correo.com' };

    React.act(() => {
      result.current.login(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loanedBooks).toEqual([]); // se limpia al iniciar sesión
  });

  it('debe hacer logout correctamente', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const mockUser = { name: 'Leo', email: 'usuario@correo.com' };

    React.act(() => {
      result.current.login(mockUser);
      result.current.addBooksToLoan([{ id: 1, titulo: 'Libro A' }]);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loanedBooks.length).toBe(1);

    React.act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBe(null);
    expect(result.current.loanedBooks).toEqual([]);
  });

  it('debe agregar libros a loanedBooks sin duplicados', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const books = [
      { id: 1, titulo: 'Libro A' },
      { id: 2, titulo: 'Libro B' }
    ];

    React.act(() => {
      result.current.addBooksToLoan(books);
      result.current.addBooksToLoan([{ id: 1, titulo: 'Libro A (duplicado)' }]);
    });

    expect(result.current.loanedBooks.length).toBe(2);
    expect(result.current.loanedBooks[0]).toEqual(
      jasmine.objectContaining({ id: 1, titulo: 'Libro A' })
    );
    expect(result.current.loanedBooks[0].fechaVencimiento)
      .toBe('30 de Octubre, 2025');
  });

  it('debe mantener la misma referencia del contexto', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const firstValue = result.current;
    const secondValue = renderHook(() => useAuth(), { wrapper: AuthProvider }).result.current;

    expect(typeof firstValue.login).toBe('function');
    expect(typeof firstValue.logout).toBe('function');
    expect(typeof firstValue.addBooksToLoan).toBe('function');
    expect(firstValue.user).toBe(null);
    expect(secondValue.user).toBe(null);
  });

});
