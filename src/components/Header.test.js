import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { MemoryRouter } from 'react-router-dom'; 

// Importamos los objetos de Contexto
import { AuthContext } from '../context/AuthContext'; 
import { CartContext } from '../context/CartContext'; 
import { SearchContext } from '../context/SearchContext'; 
// *** NO IMPORTAR '@testing-library/jest-dom' AQUÍ ***

// CORRECCIÓN: Reemplazamos todas las llamadas a jest.fn() por jasmine.createSpy()
const mockLogout = jasmine.createSpy('logout');
const mockPerformSearch = jasmine.createSpy('performSearch');
const mockAddBooksToLoan = jasmine.createSpy('addBooksToLoan');

describe('Pruebas en <Header />', () => {
    
    let authValue;
    let cartValue;
    let searchValue;

    beforeEach(() => {
        // Limpiamos los spies antes de cada prueba
        mockLogout.calls.reset();
        mockPerformSearch.calls.reset();
        mockAddBooksToLoan.calls.reset();
        
        authValue = { 
            user: null, 
            logout: mockLogout, 
            loanedBooks: [], 
            addBooksToLoan: mockAddBooksToLoan 
        };
        cartValue = { cartItems: [] }; 
        searchValue = { performSearch: mockPerformSearch };
    });

    const renderHeader = () => render(
        <AuthContext.Provider value={authValue}> 
            <CartContext.Provider value={cartValue}>
                <SearchContext.Provider value={searchValue}>
                    <MemoryRouter> 
                        <Header />
                    </MemoryRouter>
                </SearchContext.Provider>
            </CartContext.Provider>
        </AuthContext.Provider>
    );

    it('Debe mostrar "Ingresar" cuando NO hay un usuario autenticado', () => {
        renderHeader();
        // Usamos not.toBeNull() para verificar la existencia del elemento
        expect(screen.queryByText('Ingresar')).not.toBeNull();
    });
    
    it('Debe mostrar el nombre del usuario y el botón "Salir" cuando está autenticado', () => {
        authValue = { 
            ...authValue, 
            user: { name: 'Bryan', id: '123' } 
        };
        renderHeader();
        
        expect(screen.queryByText('Bryan')).not.toBeNull();
        expect(screen.queryByRole('button', { name: /Salir/i })).not.toBeNull();
    });
    
    it('Debe llamar a logout cuando se hace clic en "Salir"', () => {
        authValue = { ...authValue, user: { name: 'Test' } };
        
        renderHeader();
        
        fireEvent.click(screen.getByRole('button', { name: /Salir/i }));
        
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});