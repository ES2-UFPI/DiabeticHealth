import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import GraficoInsulina from '../screens/GraficoInsulina'; // Ajuste o caminho conforme necessário

describe('GraficoInsulina', () => {
  it('deve renderizar corretamente', () => {
    render(<GraficoInsulina />);

    // Verifica se o título está sendo exibido
    expect(screen.getByText('Insulina no Último Mês')).toBeTruthy();

    // Verifica se o gráfico é renderizado
    expect(screen.getByType('BarChart')).toBeTruthy();

    // Verifica se o botão de adicionar valor está presente
    expect(screen.getByText('Adicionar Valor')).toBeTruthy();
  });

  it('deve mostrar o modal ao pressionar o botão de adicionar', () => {
    render(<GraficoInsulina />);

    // Pressiona o botão para abrir o modal
    fireEvent.press(screen.getByText('Adicionar Valor'));

    // Verifica se o modal está visível
    expect(screen.getByText('Adicionar Insulina')).toBeTruthy();
    expect(screen.getByPlaceholderText('Data (ex: 25 Nov)')).toBeTruthy();
    expect(screen.getByPlaceholderText('Valor (ex: 45)')).toBeTruthy();
  });

  it('deve adicionar um novo valor no gráfico quando os campos forem preenchidos e o botão Adicionar for pressionado', async () => {
    render(<GraficoInsulina />);

    // Pressiona o botão para abrir o modal
    fireEvent.press(screen.getByText('Adicionar Valor'));

    // Preenche os campos do modal
    fireEvent.changeText(screen.getByPlaceholderText('Data (ex: 25 Nov)'), '25 Nov');
    fireEvent.changeText(screen.getByPlaceholderText('Valor (ex: 45)'), '45');

    // Pressiona o botão Adicionar
    fireEvent.press(screen.getByText('Adicionar'));

    // Aguarda a atualização do gráfico
    await waitFor(() => {
      // Verifica se o gráfico foi atualizado com o novo dado
      expect(screen.queryByText('25 Nov')).toBeTruthy(); // Verifica se a data foi adicionada
      expect(screen.queryByText('45')).toBeTruthy(); // Verifica se o valor foi adicionado
    });
  });

  it('não deve adicionar dados se os campos estiverem vazios', () => {
    render(<GraficoInsulina />);

    // Pressiona o botão para abrir o modal
    fireEvent.press(screen.getByText('Adicionar Valor'));

    // Deixa os campos vazios e pressiona o botão Adicionar
    fireEvent.press(screen.getByText('Adicionar'));

    // Verifica que o dado não foi adicionado ao gráfico
    expect(screen.queryByText('25 Nov')).toBeNull();
    expect(screen.queryByText('45')).toBeNull();
  });
});
