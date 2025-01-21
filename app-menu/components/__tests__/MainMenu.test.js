import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainMenu from '../screens/MainMenu';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

// Mock da função de navegação
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(),
  };
});

describe('MainMenu Screen', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  test('renders all menu buttons correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainMenu />
      </NavigationContainer>
    );

    expect(getByText('Histórico de Insulina')).toBeTruthy();
    expect(getByText('Cálculo de macronutrientes')).toBeTruthy();
    expect(getByText('Adicionar Lembrete')).toBeTruthy();
    expect(getByText('Adicionar Medicamento')).toBeTruthy();
    expect(getByText('Monitorar Pressão Arterial')).toBeTruthy();
  });

  test('calls navigation function on button press', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainMenu />
      </NavigationContainer>
    );

    fireEvent.press(getByText('Histórico de Insulina'));
    expect(mockNavigate).toHaveBeenCalledWith('Gráfico Insulina');

    fireEvent.press(getByText('Cálculo de macronutrientes'));
    expect(mockNavigate).toHaveBeenCalledWith('Cálculo de Macronutrientes');

    fireEvent.press(getByText('Adicionar Lembrete'));
    expect(mockNavigate).toHaveBeenCalledWith('Adicionar Lembrete');

    fireEvent.press(getByText('Adicionar Medicamento'));
    expect(mockNavigate).toHaveBeenCalledWith('Adicionar Medicamento');

    fireEvent.press(getByText('Monitorar Pressão Arterial'));
    expect(mockNavigate).toHaveBeenCalledWith('Monitorar Pressão');
  });
});
