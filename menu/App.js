import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CalculoMacronutrientes = () => {
  const [quantidade, setQuantidade] = useState("");
  const [alimento, setAlimento] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const handleAdicionarAlimento = () => {
    alert(`Alimento: ${alimento}\nQuantidade: ${quantidade}g`);
  };

  const handleFinalizar = () => {
    alert(`Finalizando com observações: ${observacoes}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Macronutrientes</Text>
      <Text style={styles.subtitle}>Adicione alimentos e sua quantidade</Text>

      <View style={styles.form}>
        {/* Campo de seleção de alimento */}
        <Text style={styles.label}>Alimento:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={alimento}
            onValueChange={(itemValue) => setAlimento(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um alimento" value="" />
            <Picker.Item label="Arroz" value="arroz" />
            <Picker.Item label="Feijão" value="feijao" />
            <Picker.Item label="Frango" value="frango" />
            <Picker.Item label="Batata" value="batata" />
          </Picker>
        </View>

        {/* Campo de quantidade */}
        <Text style={styles.label}>Quantidade (g):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={(text) => setQuantidade(text)}
        />

        {/* Campo de observações */}
        <Text style={styles.label}>Observações:</Text>
        <TextInput
          style={[styles.input, styles.observacoes]}
          placeholder="Adicione suas observações"
          value={observacoes}
          onChangeText={(text) => setObservacoes(text)}
          multiline
          numberOfLines={4}
        />

        {/* Botões */}
        <TouchableOpacity style={styles.button} onPress={handleAdicionarAlimento}>
          <Text style={styles.buttonText}>Adicionar Alimento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFinalizar}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  form: {
    flex: 1,
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 18, // Fonte aumentada
    fontWeight: "bold", // Texto em negrito
    marginBottom: 10, // Espaçamento entre o rótulo e o campo
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 25, // Aumentado o espaçamento
  },
  picker: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    marginBottom: 25, // Aumentado o espaçamento
    backgroundColor: "#f9f9f9",
  },
  observacoes: {
    height: 220, // Altura do campo de observações
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15, // Espaçamento ajustado entre os botões
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CalculoMacronutrientes;
