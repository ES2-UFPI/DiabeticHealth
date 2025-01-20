import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { globalStyles } from '../../constants/styles';

const GraficoInsulina = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [newDate, setNewDate] = useState('');

  const addData = () => {
    if (!newValue || !newDate) return;
    setData([...data, { value: parseInt(newValue), label: newDate }]);
    setNewValue('');
    setNewDate('');
    setModalVisible(false);
  };

  return (
    <View style={globalStyles.container}>
      {/* Título */}
      <Text style={globalStyles.title}>Insulina no Último Mês</Text>

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
      <TouchableOpacity style={globalStyles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={globalStyles.addButtonText}>Adicionar Valor</Text>
      </TouchableOpacity>

      {/* Modal para adicionar valor */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalTitle}>Adicionar Insulina</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Data (ex: 25 Nov)"
              value={newDate}
              onChangeText={setNewDate}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Valor (ex: 45)"
              keyboardType="numeric"
              value={newValue}
              onChangeText={setNewValue}
            />
            <View style={globalStyles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Adicionar" onPress={addData} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GraficoInsulina;