import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../constants/styles';

const AdicionarMedicamentoScreen = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [intervalo, setIntervalo] = useState('');
  const [listaMedicamentos, setListaMedicamentos] = useState([]);

  useEffect(() => {
    carregarMedicamentos();
  }, []);

  const carregarMedicamentos = async () => {
    try {
      const medicamentosArmazenados = await AsyncStorage.getItem('listaMedicamentos');
      if (medicamentosArmazenados) {
        setListaMedicamentos(JSON.parse(medicamentosArmazenados));
      } else {
        setListaMedicamentos([]);
      }
    } catch (error) {
      console.log('Erro ao carregar medicamentos:', error);
    }
  };

  const salvarMedicamento = async () => {
    if (!nome || !intervalo) {
      Alert.alert('Erro', 'Por favor, preencha o nome e o intervalo do medicamento.');
      return;
    }

    const novoMedicamento = {
      nome,
      descricao,
      interval: intervalo,
    };

    try {
      const medicamentosArmazenados = await AsyncStorage.getItem('listaMedicamentos');
      const listaAtual = medicamentosArmazenados ? JSON.parse(medicamentosArmazenados) : [];
      listaAtual.push(novoMedicamento);
      await AsyncStorage.setItem('listaMedicamentos', JSON.stringify(listaAtual));
      setListaMedicamentos(listaAtual);
      Alert.alert('Sucesso', 'Medicamento salvo com sucesso!');
      setNome('');
      setDescricao('');
      setIntervalo('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o medicamento.');
      console.log(error);
    }
  };

  const removeMedicamento = async (index) => {
    try {
      const medicamentosArmazenados = await AsyncStorage.getItem('listaMedicamentos');
      let listaAtual = medicamentosArmazenados ? JSON.parse(medicamentosArmazenados) : [];
      listaAtual.splice(index, 1);
      await AsyncStorage.setItem('listaMedicamentos', JSON.stringify(listaAtual));
      setListaMedicamentos(listaAtual);
      Alert.alert('Sucesso', 'Medicamento removido com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o medicamento.');
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Adicionar Medicamento</Text>
      <Text style={globalStyles.subtitle}>
        Preencha as informações abaixo para cadastrar um novo medicamento.
      </Text>

      <Text style={globalStyles.label}>Nome do Medicamento</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite o nome do medicamento"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={globalStyles.label}>Descrição</Text>
      <TextInput
        style={[globalStyles.input, globalStyles.textArea]}
        placeholder="Digite a descrição (opcional)"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Text style={globalStyles.label}>Intervalo (horas)</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Quantas horas entre as doses?"
        value={intervalo}
        onChangeText={setIntervalo}
        keyboardType="numeric"
      />

      <TouchableOpacity style={globalStyles.button} onPress={salvarMedicamento}>
        <Text style={globalStyles.buttonText}>Salvar Medicamento</Text>
      </TouchableOpacity>

      <Text style={globalStyles.listTitle}>Medicamentos Cadastrados:</Text>
      {listaMedicamentos.length === 0 ? (
        <Text style={globalStyles.emptyList}>Nenhum medicamento cadastrado ainda.</Text>
      ) : (
        listaMedicamentos.map((item, index) => (
          <View key={index} style={globalStyles.medicamentoItem}>
            <Text style={globalStyles.medicamentoNome}>{item.nome}</Text>
            {item.descricao ? (
              <Text style={globalStyles.medicamentoDescricao}>{item.descricao}</Text>
            ) : null}
            <Text style={globalStyles.medicamentoInfo}>
              Intervalo: {item.interval} hora(s)
            </Text>

            <TouchableOpacity
              style={globalStyles.removeButton}
              onPress={() => removeMedicamento(index)}
            >
              <Text style={globalStyles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

export default AdicionarMedicamentoScreen;
