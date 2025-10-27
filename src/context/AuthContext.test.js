import React from 'react';
// Importamos 'act' porque modificaremos el estado del hook/contexto
import { renderHook, act } from '@testing-library/react';
// Importamos el Provider y el hook que vamos a probar
import { AuthProvider, useAuth } from './AuthContext';

<<<<<<< HEAD
describe('Contexto: AuthContext', () => {

  // --- Prueba 1: Estado Inicial ---
  it('debería tener user null y loanedBooks vacío por defecto', () => {
    // Arrange: Renderizamos el hook dentro de su Provider
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    // Assert: Verificamos los valores iniciales
    expect(result.current.user).toBe(null); // Jasmine: toBe(null)
    expect(result.current.loanedBooks).toEqual([]); // Jasmine: toEqual([]) para arrays vacíos
  });

  // --- Prueba 2: Función Login ---
  it('debería actualizar user al llamar a login y limpiar préstamos previos', () => {
    // Arrange
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const mockUser = { name: 'Leo', email: 'usuario' };
    // Simulamos un estado previo con libros prestados antes del login
    act(() => { result.current.addBooksToLoan([{id: 99, titulo: 'Libro Viejo'}]); });
    expect(result.current.loanedBooks.length).toBe(1); // Confirmamos estado previo

    // Act: Ejecutamos la función login
    act(() => { result.current.login(mockUser); });
    
    // Assert: Verificamos que el usuario se actualizó y los préstamos se limpiaron
    expect(result.current.user).toEqual(mockUser); // toEqual compara contenido de objetos
    expect(result.current.loanedBooks).toEqual([]);
  });

  // --- Prueba 3: Función Logout ---
  it('debería limpiar user y loanedBooks al llamar a logout', () => {
    // Arrange: Simulamos un estado de login y con libros prestados
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const mockUser = { name: 'Leo', email: 'usuario' };
    act(() => { result.current.login(mockUser); });
    act(() => { result.current.addBooksToLoan([{id: 1, titulo: 'Libro Prestado'}]); });
    // Verificamos el estado previo
    expect(result.current.user).not.toBe(null);
    expect(result.current.loanedBooks.length).toBe(1);

    // Act: Ejecutamos la función logout
    act(() => { result.current.logout(); });

    // Assert: Verificamos que todo se limpió
    expect(result.current.user).toBe(null);
    expect(result.current.loanedBooks).toEqual([]);
  });

  // --- Prueba 4: Función addBooksToLoan (Básico) ---
  it('debería añadir libros a loanedBooks con fechaVencimiento', () => {
    // Arrange
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const librosAAgregar = [{ id: 1, titulo: 'Libro A' }, { id: 2, titulo: 'Libro B' }];

    // Act: Ejecutamos la función para añadir libros
    act(() => { result.current.addBooksToLoan(librosAAgregar); });

    // Assert
    expect(result.current.loanedBooks.length).toBe(2);
    // Verificamos que los objetos añadidos tengan la propiedad 'fechaVencimiento'
    // 'toBeDefined()' es un matcher de Jasmine
    expect(result.current.loanedBooks[0].fechaVencimiento).toBeDefined();
    expect(result.current.loanedBooks[1].fechaVencimiento).toBeDefined();
    // Verificamos que los libros correctos estén (simplificado buscando por id)
    expect(result.current.loanedBooks.some(b => b.id === 1)).toBe(true); // 'toBe(true)' es Jasmine
    expect(result.current.loanedBooks.some(b => b.id === 2)).toBe(true);
  });

  // --- Prueba 5: Función addBooksToLoan (Evita Duplicados) ---
  it('debería evitar añadir libros duplicados por ID a loanedBooks, manteniendo el último añadido', () => {
    // Arrange
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const libroInicial = { id: 5, titulo: 'Inicial', autor: 'A' };
    // Mismo ID, diferente título/autor para verificar reemplazo
    const libroDuplicado = { id: 5, titulo: 'Reemplazado', autor: 'B' }; 
    const libroNuevo = { id: 6, titulo: 'Nuevo' };

    // Act: Añadimos el libro inicial
    act(() => { result.current.addBooksToLoan([libroInicial]); });
    expect(result.current.loanedBooks.length).toBe(1);

    // Act: Intentamos añadir el duplicado (mismo ID) y uno nuevo
    act(() => { result.current.addBooksToLoan([libroDuplicado, libroNuevo]); });

    // Assert:
    expect(result.current.loanedBooks.length).toBe(2); // Solo 2 libros en total
    const libro5 = result.current.loanedBooks.find(b => b.id === 5);
    expect(libro5).toBeDefined(); // Aseguramos que el libro con ID 5 existe
    expect(libro5.titulo).toBe('Reemplazado'); // Verificamos que se actualizó al último añadido con ese ID
    expect(result.current.loanedBooks.some(b => b.id === 6)).toBe(true); // Verificamos que el libro nuevo también está
=======
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
>>>>>>> c3b0dce6224a06b2cae9a23d77bdafc69967f175
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
