import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

describe('LoginPage Component (Karma + Jasmine)', () => {
  const getPasswordInput = () => {
    // safer: find by id fallback because "ñ" gets misencoded on Windows
    return screen.getByLabelText(/Contrase/i) || document.querySelector('#password');
  };

  it('debería renderizar el formulario correctamente', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Acceso Usuario/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeTruthy();
    expect(screen.getByLabelText(/Usuario/i)).toBeTruthy();
    expect(getPasswordInput()).toBeTruthy();
  });

  it('debería actualizar los valores de los inputs', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usuarioInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = getPasswordInput();

    fireEvent.change(usuarioInput, { target: { value: 'usuario' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });

    expect(usuarioInput.value).toBe('usuario');
    expect(passwordInput.value).toBe('1234');
  });

  it('debería mostrar mensaje de error con credenciales incorrectas', () => {
    spyOn(console, 'log');

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usuarioInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = getPasswordInput();
    const form = screen.getByRole('button', { name: /Ingresar/i }).closest('form');

    fireEvent.change(usuarioInput, { target: { value: 'incorrecto' } });
    fireEvent.change(passwordInput, { target: { value: 'mala' } });
    fireEvent.submit(form);

    expect(console.log).toHaveBeenCalledWith('Credenciales incorrectas');
  });

  it('debería ejecutar login correctamente con credenciales válidas', () => {
    spyOn(console, 'log');

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usuarioInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = getPasswordInput();
    const form = screen.getByRole('button', { name: /Ingresar/i }).closest('form');

    fireEvent.change(usuarioInput, { target: { value: 'usuario' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.submit(form);

    expect(console.log).toHaveBeenCalledWith('Login successful');
  });

  it('debería manejar envío con campos vacíos sin fallar', () => {
    spyOn(console, 'log');

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const form = screen.getByRole('button', { name: /Ingresar/i }).closest('form');
    fireEvent.submit(form);

    expect(console.log).toHaveBeenCalledWith('Credenciales incorrectas');
  });
});
