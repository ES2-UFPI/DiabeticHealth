import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegistroPressaoArterial from '../../components/screens/PressaoArterial';

describe('RegistroPressaoArterial', () => {
  it('should add a new record when all fields are filled and the button is pressed', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<RegistroPressaoArterial />);

    // Fill the input fields
    fireEvent.changeText(getByPlaceholderText('Digite a pressão sistólica'), '120');
    fireEvent.changeText(getByPlaceholderText('Digite a pressão diastólica'), '80');
    fireEvent.changeText(getByPlaceholderText('Digite o pulso'), '70');

    // Press the button to add the record
    fireEvent.press(getByText('Adicionar Registro'));

    // Confirm the record in the modal
    fireEvent.press(getByText('Confirmar'));

    // Check if the record was added
    expect(queryByText('Sistólica: 120')).toBeTruthy();
    expect(queryByText('Diastólica: 80')).toBeTruthy();
    expect(queryByText('Pulso: 70')).toBeTruthy();
    expect(queryByText('Momento: Manhã')).toBeTruthy();
  });

  it('should show an alert when not all fields are filled', () => {
    const { getByPlaceholderText, getByText } = render(<RegistroPressaoArterial />);

    // Fill only some input fields
    fireEvent.changeText(getByPlaceholderText('Digite a pressão sistólica'), '120');
    fireEvent.changeText(getByPlaceholderText('Digite a pressão diastólica'), '80');

    // Mock the alert function
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    // Press the button to add the record
    fireEvent.press(getByText('Adicionar Registro'));
  });
});
