import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../constants/styles';

const PaginaNaoImplementada = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Esta funcionalidade ainda não foi implementada!</Text>
      <Text style={globalStyles.subtitle}>Por favor, volte mais tarde.</Text>
    </View>
  );
};

export default PaginaNaoImplementada;