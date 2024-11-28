import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar o hook de navegação

export default function MainMenu() {
  const navigation = useNavigation(); // Hook para navegação

  const handlePress = (screen) => {
    navigation.navigate(screen); // Navega para a tela selecionada
  };

  const renderButton = (title, screen) => (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => handlePress(screen)} // Passa o nome da tela para navegação
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonGroup}>
        {renderButton("Histórico de Insulina", "Gráfico Insulina")}
        {renderButton("Cálculo de macronutrientes", "Cálculo de Macronutrientes")}
        {renderButton("Adicionar Lembrete", "Não Implementada")}
        {renderButton("Adicionar Medicamento", "Não Implementada")}
        {renderButton("Monitorar Pressão Arterial", "Não Implementada")}
        {renderButton("Registrar Glicemia", "Não Implementada")}
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    width: '80%',
    backgroundColor: 'black', // Fundo preto para os botões
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
