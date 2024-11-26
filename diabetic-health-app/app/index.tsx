import { Text, SafeAreaView, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import React from 'react';

export default function App() {
  const handlePress = () => {
    Alert.alert('Você clicou no botão!');
  };

  const renderButton = (title: string, onPress: () => void, isBack: boolean = false) => (
    <TouchableOpacity
      style={[styles.buttonContainer, isBack ? styles.backButtonContainer : styles.mainButtonContainer]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.buttonGroup}>
        {renderButton("Acessar Histórico", handlePress)}
        {renderButton("Cálculo de macronutrientes", handlePress)}
        {renderButton("Adicionar Lembrete", handlePress)}
        {renderButton("Adicionar Medicamento", handlePress)}
        {renderButton("Monitorar Pressão Arterial", handlePress)}
        {renderButton("Registrar Glicemia", handlePress)}
        {renderButton("Voltar", handlePress, true)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'space-evenly', // Distribui os botões uniformemente
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    width: '80%',
  },
  mainButtonContainer: {
    backgroundColor: 'black', // Todos os botões com fundo preto
  },
  backButtonContainer: {
    backgroundColor: 'black', // Botão "Voltar" também com fundo preto
    width: '50%', // Menor largura para o botão "Voltar"
  },
  buttonText: {
    color: '#fff', // Texto branco para contraste
    fontSize: 16,
    fontWeight: 'bold',
  },
});
