import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/LoginPage'; 

// --- Spies de Jasmine ---
const mockNavigate = jasmine.createSpy('navigate');
const mockLogin = jasmine.createSpy('login');

describe('LoginPage', () => {
  beforeEach(() => {
    mockNavigate.calls.reset();
    mockLogin.calls.reset();
  });

  // Función de ayuda para renderizar inyectando los mocks
  const renderLoginPageWithMocks = () => {
    // Ya que el componente fue modificado para manejar un contexto nulo,
    // simplemente pasamos los mocks como props.
    return render(
      <LoginPage 
        mockNavigate={mockNavigate} 
        mockLogin={mockLogin}     
      />
    );
  };
  
  // Test 1: Renderizado y Manejo de Inputs (EXITOSO)
  it('debería renderizar el formulario y actualizar los inputs', () => {
    renderLoginPageWithMocks();

    const emailInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  // Test 2: Login Exitoso (EXITOSO)
  it('debería llamar a login y redirigir con credenciales correctas', () => {
    renderLoginPageWithMocks();
    
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'usuario' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } });

    fireEvent.click(screen.getByText('Ingresar'));

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({ name: 'Leo', email: 'usuario' });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    
    expect(screen.queryByText('Usuario o contraseña incorrecta.')).toBeFalsy(); 
  });

  // Test 3: Login Fallido (EXITOSO)
  it('debería mostrar un error con credenciales incorrectas', () => {
    renderLoginPageWithMocks();
    
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'bad_user' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'wrong_pass' } });

    fireEvent.click(screen.getByText('Ingresar'));

    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();

    const errorAlert = screen.getByText('Usuario o contraseña incorrecta.');
    expect(errorAlert).toBeTruthy();
  });
});