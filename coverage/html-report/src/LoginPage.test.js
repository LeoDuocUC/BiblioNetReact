import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Import the necessary providers
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage'; 

// --- Spies de Jasmine ---
// We create the spies here
const mockNavigate = jasmine.createSpy('navigate');
const mockLogin = jasmine.createSpy('login');

// Mock the react-router-dom module to intercept useNavigate
// This is a bit advanced, but it's how we check if navigate was called
// **NOTE:** This type of mock might need specific setup in your karma.conf.js
// A simpler way is to just test that login was called.
// For now, let's mock the AuthContext, which is the main problem.

describe('LoginPage', () => {
  beforeEach(() => {
    mockLogin.calls.reset();
    // We can't easily reset the navigate spy this way,
    // so we'll just check its call count.
  });

  // Función de ayuda para renderizar con los CONTEXTOS REALES
  const renderLoginPageWithContexts = () => {
    // This is the mock value for AuthContext
    const authContextValue = {
      user: null,
      login: mockLogin, // We inject our Jasmine spy here
      logout: () => {},
      loanedBooks: [],
      addBooksToLoan: () => {},
    };

    return render(
      <MemoryRouter>
        {/* Provide the mock login function via the context */}
        <AuthProvider value={authContextValue}>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );
  };
  
  // Test 1: Renderizado y Manejo de Inputs (Este test pasaba)
  it('debería renderizar el formulario y actualizar los inputs', () => {
    renderLoginPageWithContexts();

    const emailInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contrase?a'); // Correcto
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  // Test 2: Login Exitoso (ESTE ES EL TEST CORREGIDO)
  it('debería llamar a login con credenciales correctas', async () => { // <--- CAMBIO 1: AÑADIDO 'async'
    renderLoginPageWithContexts();
    
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'usuario' } });
    fireEvent.change(screen.getByLabelText('Contrase?a'), { target: { value: '1234' } }); // Correcto

    // <--- CAMBIO 2: AÑADIDO 'await'
    // Esto espera a que React termine de actualizar el estado
    // antes de que Jasmine revise los 'expect'.
    await fireEvent.click(screen.getByText('Ingresar'));

    // Ahora los 'expect' se ejecutan DESPUÉS del click y la actualización
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({ name: 'Leo', email: 'usuario' });
    
    expect(screen.queryByText('Usuario o contrase?a incorrecta.')).toBeFalsy(); 
  });

  // Test 3: Login Fallido (Este test pasaba)
  it('debería mostrar un error con credenciales incorrectas', () => {
    renderLoginPageWithContexts();
    
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'bad_user' } });
    fireEvent.change(screen.getByLabelText('Contrase?a'), { target: { value: 'wrong_pass' } }); // Correcto

    fireEvent.click(screen.getByText('Ingresar'));

    // The login function from the context should NOT be called
    expect(mockLogin).not.toHaveBeenCalled();

    // The error message SHOULD appear
    const errorAlert = screen.getByText('Usuario o contrase?a incorrecta.');
    expect(errorAlert).toBeTruthy();
  });
});