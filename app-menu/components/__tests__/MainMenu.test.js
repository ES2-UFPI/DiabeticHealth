import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import MainMenu from '../components/screens/MainMenu'; // Ajuste o caminho conforme necessário
import { NavigationContainer } from '@react-navigation/native'; // Importar o container de navegação

// Mock da navegação
const mockNavigate = jest.fn();

// Recriar o componente com navegação mockada
const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <MainMenu />
    </NavigationContainer>
  );
};

describe('MainMenu', () => {
  it('deve renderizar corretamente', () => {
    renderWithNavigation();

    // Verifica se o título de cada botão está sendo exibido
    expect(screen.getByText('Histórico de Insulina')).toBeTruthy();
    expect(screen.getByText('Cálculo de macronutrientes')).toBeTruthy();
    expect(screen.getByText('Adicionar Lembrete')).toBeTruthy();
    expect(screen.getByText('Adicionar Medicamento')).toBeTruthy();
    expect(screen.getByText('Monitorar Pressão Arterial')).toBeTruthy();
    expect(screen.getByText('Registrar Glicemia')).toBeTruthy();
  });

  it('deve chamar a navegação correta ao pressionar cada botão', () => {
    renderWithNavigation();

    // Simula o clique no botão "Histórico de Insulina"
    fireEvent.press(screen.getByText('Histórico de Insulina'));
    expect(mockNavigate).toHaveBeenCalledWith('Gráfico Insulina');

    // Simula o clique no botão "Cálculo de macronutrientes"
    fireEvent.press(screen.getByText('Cálculo de macronutrientes'));
    expect(mockNavigate).toHaveBeenCalledWith('Cálculo de Macronutrientes');

    // Simula o clique no botão "Adicionar Lembrete"
    fireEvent.press(screen.getByText('Adicionar Lembrete'));
    expect(mockNavigate).toHaveBeenCalledWith('Não Implementada');

    // Simula o clique no botão "Adicionar Medicamento"
    fireEvent.press(screen.getByText('Adicionar Medicamento'));
    expect(mockNavigate).toHaveBeenCalledWith('Não Implementada');

    // Simula o clique no botão "Monitorar Pressão Arterial"
    fireEvent.press(screen.getByText('Monitorar Pressão Arterial'));
    expect(mockNavigate).toHaveBeenCalledWith('Não Implementada');

    // Simula o clique no botão "Registrar Glicemia"
    fireEvent.press(screen.getByText('Registrar Glicemia'));
    expect(mockNavigate).toHaveBeenCalledWith('Não Implementada');
  });
});
