import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../constants/styles';

export default function MainMenu() {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const renderButton = (title, screen) => (
    <TouchableOpacity
      style={globalStyles.buttonContainer}
      onPress={() => handlePress(screen)}
    >
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.buttonGroup}>
        {renderButton("Histórico de Insulina", "Gráfico Insulina")}
        {renderButton("Cálculo de macronutrientes", "Cálculo de Macronutrientes")}
        {renderButton("Adicionar Lembrete", "Não Implementada")}
        {renderButton("Adicionar Medicamento", "Não Implementada")}
        {renderButton("Monitorar Pressão Arterial", "Monitorar Pressão")}
        {renderButton("Registrar Glicemia", "Não Implementada")}
      </View>
    </SafeAreaView>
  );
}