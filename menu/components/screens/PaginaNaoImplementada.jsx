import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaginaNaoImplementada = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta funcionalidade ainda não foi implementada!</Text>
      <Text style={styles.subtitle}>Por favor, volte mais tarde.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});

export default PaginaNaoImplementada;
