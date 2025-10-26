import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header'; // Importación local correcta
import { MemoryRouter } from 'react-router-dom';

// Importamos los CONTEXTOS y los HOOKS para poder simularlos
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { SearchContext } from '../context/SearchContext';

// --- Spies de Jasmine ---
// Creamos spies (funciones simuladas) para las funciones que vienen de los contextos
const mockLogout = jasmine.createSpy('logoutSpy');
const mockPerformSearch = jasmine.createSpy('performSearchSpy');
// Añadimos spies para todas las funciones de los contextos, aunque no las usemos todas en esta prueba
const mockLogin = jasmine.createSpy('loginSpy');
const mockAddBooksToLoan = jasmine.createSpy('addBooksToLoanSpy');
const mockAddToCart = jasmine.createSpy('addToCartSpy');
const mockRemoveFromCart = jasmine.createSpy('removeFromCartSpy');
const mockPlaceOrder = jasmine.createSpy('placeOrderSpy');

// --- Función Helper para Renderizar con Contextos Simulados ---
// Esta función envuelve al Header con los Providers, pasándoles valores CONTROLADOS por la prueba
const renderHeaderWithProviders = (
  authValueOverrides = {}, // Permite pasar valores específicos para AuthContext
  cartValueOverrides = {}, // Permite pasar valores específicos para CartContext
  searchValueOverrides = {} // Permite pasar valores específicos para SearchContext
) => {
  // Valores por defecto para cada contexto (estado inicial)
  const defaultAuthValue = {
    user: null, // Clave: por defecto no hay usuario
    login: mockLogin,
    logout: mockLogout,
    loanedBooks: [],
    addBooksToLoan: mockAddBooksToLoan,
  };
  const defaultCartValue = {
    cartItems: [],
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
    placeOrder: mockPlaceOrder,
    MAX_ITEMS: 3,
  };
  const defaultSearchValue = {
    searchResults: [],
    performSearch: mockPerformSearch,
    query: '',
  };

  // Combinamos los valores por defecto con los que pasemos específicamente para la prueba
  // CORRECCIÓN IMPORTANTE: Pasamos el objeto 'value' COMPLETO al Provider
  const authProviderValue = { ...defaultAuthValue, ...authValueOverrides };
  const cartProviderValue = { ...defaultCartValue, ...cartValueOverrides };
  const searchProviderValue = { ...defaultSearchValue, ...searchValueOverrides };

  return render(
    // Envolvemos con los Providers REALES, pasando el 'value' simulado
    <AuthContext.Provider value={authProviderValue}>
      <CartContext.Provider value={cartProviderValue}>
        <SearchContext.Provider value={searchProviderValue}>
          {/* MemoryRouter es necesario porque Header usa <Link> */}
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </SearchContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

// --- Pruebas ---
describe('Componente Header', () => {
  // Limpiamos los spies antes de CADA prueba 'it'
  beforeEach(() => {
    mockLogout.calls.reset();
    mockPerformSearch.calls.reset();
    mockLogin.calls.reset();
    mockAddBooksToLoan.calls.reset();
    mockAddToCart.calls.reset();
    mockRemoveFromCart.calls.reset();
    mockPlaceOrder.calls.reset();
  });

  it('Debe mostrar "Ingresar" cuando NO hay un usuario autenticado', () => {
    renderHeaderWithProviders(); // User es null por defecto
    
    // CORRECCIÓN Matcher: Usamos getByText y toBeTruthy para verificar existencia
    expect(screen.getByText('Ingresar')).toBeTruthy();
    // queryByRole devuelve null si no lo encuentra
    expect(screen.queryByRole('button', { name: /Salir/i })).toBeNull(); 
  });

  it('Debe mostrar el nombre del usuario y el botón "Salir" cuando está autenticado', () => {
    // CORRECCIÓN Mocking: Pasamos el objeto user dentro de las overrides
    renderHeaderWithProviders({ user: { name: 'Leo Test', id: '123' } });

    expect(screen.getByText('Leo Test')).toBeTruthy(); // Verificamos que el nombre esté
    expect(screen.getByRole('button', { name: /Salir/i })).toBeTruthy(); // Verificamos que el botón Salir esté
    expect(screen.queryByText('Ingresar')).toBeNull(); // Verificamos que Ingresar NO esté
  });

  it('Debe llamar a logout cuando se hace clic en "Salir"', () => {
    // Renderizamos con un usuario simulado
    renderHeaderWithProviders({ user: { name: 'Test User' } });

    // Simulamos el clic en el botón Salir
    fireEvent.click(screen.getByRole('button', { name: /Salir/i }));

    // Verificamos si nuestro espía de Jasmine fue llamado
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('Debe llamar a performSearch al enviar el formulario de búsqueda con texto', () => {
    renderHeaderWithProviders();
    const input = screen.getByPlaceholderText(/Buscar por título o autor.../i);
    // 'closest' busca el ancestro más cercano que sea un formulario
    const form = input.closest('form'); 

    // Simulamos que el usuario escribe "React" en el input
    fireEvent.change(input, { target: { value: 'React' } });
    // Simulamos el envío del formulario
    fireEvent.submit(form);

    // Verificamos que la función de búsqueda fue llamada una vez y con el texto correcto
    expect(mockPerformSearch).toHaveBeenCalledTimes(1);
    expect(mockPerformSearch).toHaveBeenCalledWith('React');
  });

  it('NO debe llamar a performSearch si el campo de búsqueda está vacío', () => {
    renderHeaderWithProviders();
    const input = screen.getByPlaceholderText(/Buscar por título o autor.../i);
    const form = input.closest('form');

    // Aseguramos que el input esté vacío o solo con espacios
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);

    // Verificamos que la función de búsqueda NO fue llamada
    expect(mockPerformSearch).not.toHaveBeenCalled();
  });
});

