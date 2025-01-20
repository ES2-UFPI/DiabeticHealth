import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from '../../constants/styles';

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
    <View style={globalStyles.container}>
      <Text style={globalStyles.subtitle}>Adicione alimentos e sua quantidade</Text>

      <View style={globalStyles.form}>
        <Text style={globalStyles.label}>Alimento:</Text>
        <View style={globalStyles.pickerContainer}>
          <Picker
            selectedValue={alimento}
            onValueChange={(itemValue) => setAlimento(itemValue)}
            style={globalStyles.picker}
            testID="picker"
          >
            <Picker.Item label="Selecione um alimento" value="" />
            <Picker.Item label="Arroz" value="arroz" />
            <Picker.Item label="Feijão" value="feijao" />
            <Picker.Item label="Frango" value="frango" />
            <Picker.Item label="Batata" value="batata" />
          </Picker>
        </View>

        <Text style={globalStyles.label}>Quantidade (g):</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite a quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={(text) => setQuantidade(text)}
        />

        <Text style={globalStyles.label}>Observações:</Text>
        <TextInput
          style={[globalStyles.input, globalStyles.observacoes]}
          placeholder="Adicione suas observações"
          value={observacoes}
          onChangeText={(text) => setObservacoes(text)}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={globalStyles.buttonContainer} onPress={handleAdicionarAlimento}>
          <Text style={globalStyles.buttonText}>Adicionar Alimento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.buttonContainer} onPress={handleFinalizar}>
          <Text style={globalStyles.buttonText}>Finalizar</Text>
        </TouchableOpacity>

        <Text style={globalStyles.totalText}>
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
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalTitle}>Insira os dados de glicemia</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Glicemia do momento"
              keyboardType="numeric"
              value={glicemiaMomento}
              onChangeText={(text) => setGlicemiaMomento(text)}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Glicemia meta"
              keyboardType="numeric"
              value={glicemiaMeta}
              onChangeText={(text) => setGlicemiaMeta(text)}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Fator de sensibilidade"
              keyboardType="numeric"
              value={fatorSensibilidade}
              onChangeText={(text) => setFatorSensibilidade(text)}
            />

            <TouchableOpacity
              style={globalStyles.buttonContainer}
              onPress={handleConfirmarInsulina}
            >
              <Text style={globalStyles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalculoMacronutrientes;