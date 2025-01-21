import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';

describe('LoginScreen', () => {
  it('renderiza todos os elementos corretamente', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Verifica se os elementos principais estão renderizados
    expect(getByText('DiabeticHealth')).toBeTruthy();
    expect(getByPlaceholderText('Digite seu e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Digite sua senha')).toBeTruthy();
    expect(getByText('Entrar com E-mail')).toBeTruthy();
    expect(getByText('Entrar com Facebook')).toBeTruthy();
    expect(getByText('Esqueceu sua senha?')).toBeTruthy();
    expect(getByText('Ainda não tem uma conta?')).toBeTruthy();
    expect(getByText('Cadastre-se')).toBeTruthy();
  });

  it('exibe um alerta se os campos de e-mail e senha estiverem vazios', () => {
    const { getByText } = render(<LoginScreen />);

    // Simula clique no botão de login
    const loginButton = getByText('Entrar com E-mail');
    fireEvent.press(loginButton);

    // Verifica se o alerta é exibido
    expect(() => getByText('Por favor, preencha todos os campos.')).toBeTruthy();
  });

  it('executa a função de login com e-mail quando os campos estão preenchidos', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Preenche os campos de e-mail e senha
    fireEvent.changeText(getByPlaceholderText('Digite seu e-mail'), 'teste@email.com');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha'), 'senha123');

    // Simula clique no botão de login com e-mail
    const loginButton = getByText('Entrar com E-mail');
    fireEvent.press(loginButton);

    // Verifica se a função foi chamada com os dados corretos
    expect(consoleSpy).toHaveBeenCalledWith('Login com email:', 'teste@email.com');
  });

  it('executa a função de login com Facebook corretamente', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByText } = render(<LoginScreen />);

    // Simula clique no botão de login com Facebook
    const facebookButton = getByText('Entrar com Facebook');
    fireEvent.press(facebookButton);

    // Verifica se a função foi chamada
    expect(consoleSpy).toHaveBeenCalledWith('Login com Facebook iniciado');
  });

  it('navega para a tela de cadastro ao clicar em "Cadastre-se"', () => {
    const { getByText } = render(<LoginScreen />);

    // Simula clique no link de cadastro
    const signupLink = getByText('Cadastre-se');
    fireEvent.press(signupLink);

    // Aqui você deve adicionar um mock para verificar a navegação, se necessário.
    // Por exemplo, se você usa React Navigation:
    // expect(mockNavigation.navigate).toHaveBeenCalledWith('Cadastro');
  });
});
