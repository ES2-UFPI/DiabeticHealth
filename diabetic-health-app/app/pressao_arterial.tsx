import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, ScrollView, SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";

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
  const [observacoes, setObservacoes] = useState("");
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const momentos = [
    "Ao acordar",
    "Antes do café",
    "Após o café",
    "Antes do almoço",
    "Após o almoço",
    "Antes do jantar",
    "Após o jantar",
    "Antes de dormir"
  ];

  const handleAdicionarRegistro = () => {
    if (sistolica && diastolica && pulso && momento) {
      if (parseInt(sistolica) < 70 || parseInt(sistolica) > 200 ||
          parseInt(diastolica) < 40 || parseInt(diastolica) > 130) {
        alert("Por favor, verifique os valores da pressão arterial.");
        return;
      }

      const novoRegistro = {
        sistolica,
        diastolica,
        pulso,
        momento,
        data: new Date()
      };

      setRegistros(prev => [...prev, novoRegistro]);
      alert(`Registro adicionado:\nPressão: ${sistolica}/${diastolica} mmHg\nPulso: ${pulso} bpm\nMomento: ${momento}`);
      
      setSistolica("");
      setDiastolica("");
      setPulso("");
      setMomento("");
      setObservacoes("");
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handleVerHistorico = () => {
    setModalVisible(true);
  };

  const classificarPressao = (sistolica: number, diastolica: number): string => {
    if (sistolica < 120 && diastolica < 80) return "Normal";
    if (sistolica < 130 && diastolica < 85) return "Pré-hipertensão";
    if (sistolica < 140 && diastolica < 90) return "Limítrofe";
    return "Elevada";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Registro de Pressão Arterial</Text>
        <Text style={styles.subtitle}>Adicione suas medições diárias</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Pressão Sistólica (mmHg):</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a pressão sistólica"
            keyboardType="numeric"
            value={sistolica}
            onChangeText={setSistolica}
          />

          <Text style={styles.label}>Pressão Diastólica (mmHg):</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a pressão diastólica"
            keyboardType="numeric"
            value={diastolica}
            onChangeText={setDiastolica}
          />

          <Text style={styles.label}>Pulso (bpm):</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o pulso"
            keyboardType="numeric"
            value={pulso}
            onChangeText={setPulso}
          />

          <Text style={styles.label}>Momento da medição:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={momento}
              onValueChange={(itemValue: string) => setMomento(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione o momento" value="" />
              {momentos.map((m) => (
                <Picker.Item key={m} label={m} value={m} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Observações:</Text>
          <TextInput
            style={[styles.input, styles.observacoes]}
            placeholder="Adicione suas observações (opcional)"
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.button} onPress={handleAdicionarRegistro}>
            <Text style={styles.buttonText}>Adicionar Registro</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#444' }]} 
            onPress={handleVerHistorico}
          >
            <Text style={styles.buttonText}>Ver Histórico</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Histórico de Medições</Text>
            
            <ScrollView style={styles.modalScroll}>
              {registros.map((registro, index) => (
                <View key={index} style={styles.registroItem}>
                  <Text style={styles.registroData}>
                    {registro.data.toLocaleDateString()} - {registro.momento}
                  </Text>
                  <Text style={styles.registroValor}>
                    {registro.sistolica}/{registro.diastolica} mmHg - {registro.pulso} bpm
                  </Text>
                  <Text style={styles.registroClassificacao}>
                    {classificarPressao(parseInt(registro.sistolica), parseInt(registro.diastolica))}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
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
    paddingBottom: 20,
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
    maxHeight: "80%",
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  registroItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  registroData: {
    fontSize: 14,
    color: "#666",
  },
  registroValor: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  registroClassificacao: {
    fontSize: 14,
    color: "#444",
    fontStyle: "italic",
    marginTop: 3,
  },
});

export default RegistroPressaoArterial;