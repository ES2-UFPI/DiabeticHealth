import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from '../../constants/styles';

interface Registro {
  sistolica: string;
  diastolica: string;
  pulso: string;
  momento: string;
  data: Date;
}

const RegistroPressaoArterial = () => {
  const [sistolica, setSistolica] = useState("");
  const [diastolica, setDiastolica] = useState("");
  const [pulso, setPulso] = useState("");
  const [momento, setMomento] = useState("");
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdicionarRegistro = () => {
    if (sistolica && diastolica && pulso && momento) {
      const novoRegistro: Registro = {
        sistolica,
        diastolica,
        pulso,
        momento,
        data: new Date(),
      };
      setRegistros([...registros, novoRegistro]);
      setSistolica("");
      setDiastolica("");
      setPulso("");
      setMomento("");
      setModalVisible(false);
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <Text style={globalStyles.title}>Registrar Pressão Arterial</Text>

        <View style={globalStyles.form}>
          <Text style={globalStyles.label}>Sistólica:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite a pressão sistólica"
            keyboardType="numeric"
            value={sistolica}
            onChangeText={setSistolica}
          />

          <Text style={globalStyles.label}>Diastólica:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite a pressão diastólica"
            keyboardType="numeric"
            value={diastolica}
            onChangeText={setDiastolica}
          />

          <Text style={globalStyles.label}>Pulso:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite o pulso"
            keyboardType="numeric"
            value={pulso}
            onChangeText={setPulso}
          />

          <Text style={globalStyles.label}>Momento do Dia:</Text>
          <View style={globalStyles.pickerContainer}>
            <Picker
              selectedValue={momento}
              onValueChange={(itemValue) => setMomento(itemValue)}
              style={globalStyles.picker}
            >
              <Picker.Item label="Selecione o momento" value="" />
              <Picker.Item label="Manhã" value="Manhã" />
              <Picker.Item label="Tarde" value="Tarde" />
              <Picker.Item label="Noite" value="Noite" />
            </Picker>
          </View>

          <TouchableOpacity style={globalStyles.buttonContainer} onPress={() => setModalVisible(true)}>
            <Text style={globalStyles.buttonText}>Adicionar Registro</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={globalStyles.modalContainer}>
            <View style={globalStyles.modalContent}>
              <Text style={globalStyles.modalTitle}>Confirmar Registro</Text>
              <Text>Sistólica: {sistolica}</Text>
              <Text>Diastólica: {diastolica}</Text>
              <Text>Pulso: {pulso}</Text>
              <Text>Momento: {momento}</Text>

              <View style={globalStyles.modalButtons}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={globalStyles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAdicionarRegistro}>
                  <Text style={globalStyles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistroPressaoArterial;