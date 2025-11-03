import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

describe('AuthContext (Karma + Jasmine)', () => {

  it('debería inicializar con valores nulos', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    expect(result.current.user).toBeNull();
    expect(result.current.loanedBooks.length).toBe(0);
  });

  it('debería establecer usuario con login()', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.login({ name: 'Leo', email: 'usuario' });
    });

    expect(result.current.user.name).toBe('Leo');
    expect(result.current.loanedBooks.length).toBe(0);
  });

  it('debería limpiar usuario y préstamos con logout()', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.login({ name: 'Leo', email: 'usuario' });
      result.current.addBooksToLoan([{ id: 1, titulo: 'Libro 1' }]);
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loanedBooks.length).toBe(0);
  });

  it('debería agregar libros y evitar duplicados', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const libros = [
      { id: 1, titulo: 'Libro A' },
      { id: 2, titulo: 'Libro B' },
    ];

    act(() => result.current.addBooksToLoan(libros));
    act(() => result.current.addBooksToLoan([{ id: 2, titulo: 'Libro B' }]));

    expect(result.current.loanedBooks.length).toBe(2);
    expect(result.current.loanedBooks.some(b => b.id === 1)).toBeTrue();
    expect(result.current.loanedBooks.some(b => b.id === 2)).toBeTrue();
  });

  it('debería asignar fecha de vencimiento a cada libro', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const libros = [{ id: 1, titulo: 'Libro A' }];

    act(() => result.current.addBooksToLoan(libros));

    expect(result.current.loanedBooks[0].fechaVencimiento).toBeDefined();
    expect(typeof result.current.loanedBooks[0].fechaVencimiento).toBe('string');
  });
});
