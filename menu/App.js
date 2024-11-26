import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CalculoMacronutrientes = () => {
  const [quantidade, setQuantidade] = useState("");
  const [alimento, setAlimento] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [totalCarboidratos, setTotalCarboidratos] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [glicemiaMomento, setGlicemiaMomento] = useState("");
  const [glicemiaMeta, setGlicemiaMeta] = useState("");
  const [fatorSensibilidade, setFatorSensibilidade] = useState("");

  const carboidratos = {
    arroz: 28,
    feijao: 14,
    frango: 0,
    batata: 17,
  };

  const handleAdicionarAlimento = () => {
    if (alimento && quantidade) {
      const carbPor100g = carboidratos[alimento] || 0;
      const carbTotal = (carbPor100g * parseFloat(quantidade)) / 100;
      setTotalCarboidratos((prev) => prev + carbTotal);

      alert(`Alimento: ${alimento}\nQuantidade: ${quantidade}g\nCarboidratos: ${carbTotal.toFixed(2)}g`);
      setQuantidade("");
      setAlimento("");
    } else {
      alert("Por favor, selecione um alimento e insira a quantidade.");
    }
  };

  const handleFinalizar = () => {
    setModalVisible(true); // Abre o modal
  };

  const handleConfirmarInsulina = () => {
    const glicemiaAtual = parseFloat(glicemiaMomento);
    const meta = parseFloat(glicemiaMeta);
    const sensibilidade = parseFloat(fatorSensibilidade);

    if (isNaN(glicemiaAtual) || isNaN(meta) || isNaN(sensibilidade)) {
      alert("Por favor, preencha corretamente os campos de glicemia e sensibilidade.");
      return;
    }

    const insulinaCarboidratos = totalCarboidratos / 15;
    const insulinaCorreção = (glicemiaAtual - meta) / sensibilidade;
    const doseTotalInsulina = insulinaCarboidratos + insulinaCorreção;

    alert(
      `Total de carboidratos: ${totalCarboidratos.toFixed(2)}g\n` +
        `Observações: ${observacoes}\n` +
        `Dose de insulina recomendada: ${doseTotalInsulina.toFixed(2)} UI`
    );

    // Resetar estados após finalizar
    setTotalCarboidratos(0);
    setObservacoes("");
    setGlicemiaMomento("");
    setGlicemiaMeta("");
    setFatorSensibilidade("");
    setModalVisible(false); // Fecha o modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Macronutrientes</Text>
      <Text style={styles.subtitle}>Adicione alimentos e sua quantidade</Text>

      <View style={styles.form}>
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

        <Text style={styles.label}>Quantidade (g):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={(text) => setQuantidade(text)}
        />

        <Text style={styles.label}>Observações:</Text>
        <TextInput
          style={[styles.input, styles.observacoes]}
          placeholder="Adicione suas observações"
          value={observacoes}
          onChangeText={(text) => setObservacoes(text)}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleAdicionarAlimento}>
          <Text style={styles.buttonText}>Adicionar Alimento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFinalizar}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>

        <Text style={styles.totalText}>
          Total de Carboidratos: {totalCarboidratos.toFixed(2)}g
        </Text>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Insira os dados de glicemia</Text>
            <TextInput
              style={styles.input}
              placeholder="Glicemia do momento"
              keyboardType="numeric"
              value={glicemiaMomento}
              onChangeText={(text) => setGlicemiaMomento(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Glicemia meta"
              keyboardType="numeric"
              value={glicemiaMeta}
              onChangeText={(text) => setGlicemiaMeta(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Fator de sensibilidade"
              keyboardType="numeric"
              value={fatorSensibilidade}
              onChangeText={(text) => setFatorSensibilidade(text)}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleConfirmarInsulina}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 25,
  },
  picker: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    marginBottom: 25,
    backgroundColor: "#f9f9f9",
  },
  observacoes: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default CalculoMacronutrientes;
