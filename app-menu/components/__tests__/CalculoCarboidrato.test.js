import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalculoMacronutrientes from '../../components/screens/CalculoCarboidratos'; // Ajuste o caminho, se necessário

test('renders correctly and calculates carbohydrates', () => {
  const { getByText, getByPlaceholderText, getByTestId } = render(<CalculoMacronutrientes />);

  // Verifica a renderização inicial
  expect(getByText('Adicione alimentos e sua quantidade')).toBeTruthy();
  expect(getByText('Adicionar Alimento')).toBeTruthy();
  expect(getByText('Finalizar')).toBeTruthy();
  expect(getByText('Total de Carboidratos: 0.00g')).toBeTruthy();

  // Simula a seleção de um alimento
  const picker = getByTestId('picker'); // Adicione `testID` ao Picker no componente
  fireEvent(picker, 'onValueChange', 'arroz');

  // Simula a entrada de quantidade
  const quantidadeInput = getByPlaceholderText('Digite a quantidade');
  fireEvent.changeText(quantidadeInput, '100');

  // Clica no botão "Adicionar Alimento"
  const addButton = getByText('Adicionar Alimento');
  fireEvent.press(addButton);

  // Verifica se o total de carboidratos foi atualizado
  expect(getByText('Total de Carboidratos: 28.00g')).toBeTruthy();
});

test('alerts when fields are empty', () => {
  const { getByText } = render(<CalculoMacronutrientes />);

  // Tenta adicionar alimento sem preencher os campos
  const addButton = getByText('Adicionar Alimento');
  fireEvent.press(addButton);

  // Verifica se a mensagem de alerta foi exibida
  expect(() => getByText('Por favor, selecione um alimento e insira a quantidade.')).toBeTruthy();
});
