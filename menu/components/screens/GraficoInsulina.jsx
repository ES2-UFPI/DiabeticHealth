import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const GraficoInsulina = () => {
  const [data, setData] = useState([
    { value: 20, label: '1 Nov' },
    { value: 30, label: '5 Nov' },
    { value: 50, label: '10 Nov' },
    { value: 40, label: '15 Nov' },
    { value: 30, label: '20 Nov' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [newDate, setNewDate] = useState('');

  // Adiciona um novo valor ao gráfico
  const addData = () => {
    if (!newValue || !newDate) return;
    setData([...data, { value: parseInt(newValue), label: newDate }]);
    setNewValue('');
    setNewDate('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Insulina no Último Mês</Text>

      {/* Gráfico */}
      <BarChart
        data={data}
        width={300}
        height={200}
        barWidth={30}
        frontColor="#177AD5"
        barBorderRadius={4}
        yAxisThickness={0}
        xAxisLabelTextStyle={{ fontSize: 10 }}
        horizontal={false}
      />

      {/* Botão para abrir o modal */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Adicionar Valor</Text>
      </TouchableOpacity>

      {/* Modal para adicionar valor */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Insulina</Text>
            <TextInput
              style={styles.input}
              placeholder="Data (ex: 25 Nov)"
              value={newDate}
              onChangeText={setNewDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Valor (ex: 45)"
              keyboardType="numeric"
              value={newValue}
              onChangeText={setNewValue}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Adicionar" onPress={addData} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#177AD5',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GraficoInsulina;
