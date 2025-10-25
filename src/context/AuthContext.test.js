// src/context/AuthContext.test.js

// 1. Importaciones necesarias: 
import React from 'react';
import { renderHook, act } from '@testing-library/react'; 
import { useAuth, AuthProvider } from './AuthContext';

describe('Pruebas funcionales en AuthContext', () => {

    // Helper para envolver el hook con el Provider
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    
    // Datos de prueba
    const testUser = { id: 101, name: 'Alice' };
    const libro1 = { id: 1, title: 'Libro A', author: 'Autor A' };
    const libro2 = { id: 2, title: 'Libro B', author: 'Autor B' };


    // --- PRUEBAS DE INICIALIZACIÓN ---

    it('Debe inicializar el estado del usuario como null y la lista de prestados vacía', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current.user).toBeNull();
        expect(result.current.loanedBooks.length).toBe(0);
    });

    // --- PRUEBAS DE AUTENTICACIÓN Y LIMPIEZA ---

    it('La función login debe establecer el usuario y asegurar que la lista de libros prestados se limpie', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });
        
        // Simular que ya hay libros antes del login (por si viene de una sesión anterior)
        act(() => {
            result.current.addBooksToLoan([libro1]); 
        });

        // Ejecutar el login
        act(() => {
            result.current.login(testUser);
        });

        // Verificaciones
        expect(result.current.user).toEqual(testUser);
        expect(result.current.loanedBooks.length).toBe(0); // Debe limpiarse
    });

    it('La función logout debe establecer el usuario a null y vaciar la lista de libros prestados', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });
        
        // Simular que el usuario está logueado y tiene libros
        act(() => {
            result.current.login(testUser);
            result.current.addBooksToLoan([libro1, libro2]);
        });
        
        // Ejecutar el logout
        act(() => {
            result.current.logout();
        });

        // Verificaciones
        expect(result.current.user).toBeNull();
        expect(result.current.loanedBooks.length).toBe(0); 
    });

    // --- PRUEBAS DE PRÉSTAMOS (loanedBooks) ---

    it('La función addBooksToLoan debe agregar libros y asignarles una fecha de vencimiento', () => {
        // Mockear Date.now para controlar la fecha y poder hacer la aserción
        const originalDate = Date;
        global.Date = class extends Date {
            constructor(date) {
                if (date) return new originalDate(date);
                return new originalDate('2025-10-25T00:00:00.000Z');
            }
        };

        const { result } = renderHook(() => useAuth(), { wrapper });
        
        act(() => {
            result.current.addBooksToLoan([libro1]); 
        });

        // Verificaciones
        expect(result.current.loanedBooks.length).toBe(1);
        const book = result.current.loanedBooks[0];
        expect(book.id).toBe(libro1.id);
        
        // 🚨 CORRECCIÓN: Usar .toEqual en lugar de .toHaveProperty (Incompatible con Jasmine)
        expect(book.fechaVencimiento).toEqual('30 de Octubre, 2025'); 
        
        // Restaurar Date después de la prueba
        global.Date = originalDate;
    });

    it('La función addBooksToLoan debe prevenir duplicados por ID', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });
        
        act(() => {
            // Añadir el mismo libro dos veces
            result.current.addBooksToLoan([libro1]);
            result.current.addBooksToLoan([libro1]); 
        });

        // Verificación (solo debe haber 1 libro en la lista)
        expect(result.current.loanedBooks.length).toBe(1);
        
        // Añadir un libro diferente
        act(() => {
            result.current.addBooksToLoan([libro2]);
        });
        
        // Verificación (debe haber 2 libros en total)
        expect(result.current.loanedBooks.length).toBe(2);
    });
});