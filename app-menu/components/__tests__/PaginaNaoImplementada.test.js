import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PaginaNaoImplementada from '../components/screens/PaginaNaoImplementada'; // Ajuste o caminho conforme necessário

describe('PaginaNaoImplementada', () => {
  it('deve renderizar as mensagens corretamente', () => {
    render(<PaginaNaoImplementada />);

    // Verifica se o título está sendo exibido
    expect(screen.getByText('Esta funcionalidade ainda não foi implementada!')).toBeTruthy();

    // Verifica se a mensagem de subtítulo está sendo exibida
    expect(screen.getByText('Por favor, volte mais tarde.')).toBeTruthy();
  });

  it('deve renderizar o estilo corretamente', () => {
    render(<PaginaNaoImplementada />);

    // Verifica se o estilo do título está correto (fontSize e fontWeight)
    const title = screen.getByText('Esta funcionalidade ainda não foi implementada!');
    expect(title).toHaveStyle({ fontSize: 24, fontWeight: 'bold' });

    // Verifica se o estilo do subtítulo está correto (fontSize e color)
    const subtitle = screen.getByText('Por favor, volte mais tarde.');
    expect(subtitle).toHaveStyle({ fontSize: 18, color: '#666' });
  });
});
