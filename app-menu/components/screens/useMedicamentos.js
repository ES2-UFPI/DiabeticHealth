import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const useMedicamentos = () => {
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
      limparCampos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o medicamento.');
      console.log(error);
    }
  };

  const removeMedicamento = async (index) => {
    try {
      let listaAtual = [...listaMedicamentos];
      listaAtual.splice(index, 1);
      await AsyncStorage.setItem('listaMedicamentos', JSON.stringify(listaAtual));
      setListaMedicamentos(listaAtual);
      Alert.alert('Sucesso', 'Medicamento removido com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o medicamento.');
      console.log(error);
    }
  };

  const limparCampos = () => {
    setNome('');
    setDescricao('');
    setIntervalo('');
  };

  return {
    nome,
    setNome,
    descricao,
    setDescricao,
    intervalo,
    setIntervalo,
    listaMedicamentos,
    salvarMedicamento,
    removeMedicamento,
  };
};
