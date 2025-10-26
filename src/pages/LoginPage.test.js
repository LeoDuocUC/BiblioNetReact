import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Componente con lógica de validación
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Debe ingresar correo y contraseña');
      return;
    }
    if (onLogin) onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Ingresar</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
};

describe('LoginPage', () => {
  it('renderiza los campos y el botón', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('Correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(screen.getByText('Ingresar')).toBeTruthy();
  });

  it('muestra error si los campos están vacíos', () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByText('Ingresar'));
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage.textContent).toBe('Debe ingresar correo y contraseña');
  });

  it('llama a onLogin con los datos correctos', () => {
    const mockLogin = jasmine.createSpy('onLogin');
    render(<LoginPage onLogin={mockLogin} />);

    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'bryan@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByText('Ingresar'));

    expect(mockLogin).toHaveBeenCalledWith('bryan@test.com', '1234');
  });
});
