import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext (Karma + Jasmine)', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('debería inicializar con valores nulos', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.activeLoansCount).toBe(0);
  });

  it('debería establecer usuario con login()', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login({ name: 'Leo', password: '123' });
    });
    expect(result.current.user.name).toBe('Leo');
    expect(result.current.user.loans.length).toBe(0); 
  });

  it('debería limpiar usuario y préstamos con logout()', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // --- THIS IS THE FIX ---
    // Separate state updates into their own 'act' blocks
    act(() => {
      result.current.login({ name: 'Leo', password: '123' });
    }); 
    
    act(() => {
      result.current.addBooksToLoan([{ id: 1, titulo: 'Libro 1' }]);
    });
    // --- END FIX ---

    // Now this check will pass
    expect(result.current.user.name).toBe('Leo'); 
    expect(result.current.user.loans.length).toBe(1);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull(); 
    expect(result.current.activeLoansCount).toBe(0);
  });

  it('debería agregar libros y evitar duplicados', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login({ name: 'Test User', password: '123' });
    });
    const libros = [{ id: 1, titulo: 'Libro A' }, { id: 2, titulo: 'Libro B' }];
    act(() => result.current.addBooksToLoan(libros));
    act(() => result.current.addBooksToLoan([{ id: 2, titulo: 'Libro B' }])); // Duplicate
    expect(result.current.user.loans.length).toBe(2);
  });

  it('debería asignar fecha de vencimiento a cada libro', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login({ name: 'Test User', password: '123' });
    });
    const libros = [{ id: 1, titulo: 'Libro A' }];
    act(() => result.current.addBooksToLoan(libros));
    expect(result.current.user.loans[0].dueDate).toBeDefined();
  });
});