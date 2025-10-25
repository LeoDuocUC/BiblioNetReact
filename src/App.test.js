import React from 'react';
import { render, screen } from '@testing-library/react';

// Simula tu componente principal
const App = () => <h1>Bienvenido a BiblioNet</h1>;

describe('Componente App', () => {
  it('muestra el texto de bienvenida', () => {
    render(<App />);
    expect(screen.getByText('Bienvenido a BiblioNet')).toBeTruthy();
  });
});
