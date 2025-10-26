import React from 'react';
import { renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// 'renderHook' nos permite probar un hook de React de forma aislada
describe('Contexto: AuthContext', () => {

  it('debería tener un usuario nulo por defecto', () => {
    // Renderizamos el hook 'useAuth' dentro de su Proveedor
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    // Verificamos que el valor inicial del usuario sea nulo
    expect(result.current.user).toBe(null);
  });

  it('debería actualizar el usuario al llamar a login', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const mockUser = { name: 'Leo', email: 'usuario' };

    // Actuamos: llamamos a la función login
    React.act(() => {
      result.current.login(mockUser);
    });
    
    // Verificamos: el estado 'user' en el contexto debe ser el mockUser
    expect(result.current.user).toEqual(mockUser);
  });

  it('debería limpiar el usuario al llamar a logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const mockUser = { name: 'Leo', email: 'usuario' };

    // Primero iniciamos sesión
    React.act(() => {
      result.current.login(mockUser);
    });
    expect(result.current.user).not.toBe(null); // Verificamos que el login funcionó

    // Actuamos: llamamos a logout
    React.act(() => {
      result.current.logout();
    });

    // Verificamos: el usuario debe ser nulo nuevamente
    expect(result.current.user).toBe(null);
  });
});