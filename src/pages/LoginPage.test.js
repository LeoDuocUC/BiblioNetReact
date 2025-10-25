import React from 'react';
import { render, screen } from '@testing-library/react';

// Simula tu LoginPage
const LoginPage = () => (
  <form>
    <input placeholder="Correo" />
    <input placeholder="Contraseña" type="password" />
    <button>Ingresar</button>
  </form>
);

describe('LoginPage', () => {
  it('renderiza el formulario de login', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('Correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
  });
});
