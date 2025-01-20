import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdicionarMedicamentoScreen = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [intervalo, setIntervalo] = useState('');
  const [listaMedicamentos, setListaMedicamentos] = useState([]);

  // Carrega os medicamentos ao montar o componente
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
    // Validação simples de campos obrigatórios
    if (!nome || !intervalo) {
      Alert.alert('Erro', 'Por favor, preencha o nome e o intervalo do medicamento.');
      return;
    }

    const novoMedicamento = {
      nome,
      descricao,
      interval: intervalo, // ou "intervalo", fique à vontade para usar a mesma key
    };

    try {
      // Lê o array existente no AsyncStorage
      const medicamentosArmazenados = await AsyncStorage.getItem('listaMedicamentos');
      const listaAtual = medicamentosArmazenados ? JSON.parse(medicamentosArmazenados) : [];

      // Adiciona o novo medicamento à lista
      listaAtual.push(novoMedicamento);

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('listaMedicamentos', JSON.stringify(listaAtual));

      // Atualiza a lista local no state
      setListaMedicamentos(listaAtual);

      Alert.alert('Sucesso', 'Medicamento salvo com sucesso!');

      // Limpa os campos
      setNome('');
      setDescricao('');
      setIntervalo('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o medicamento.');
      console.log(error);
    }
  };

  /**
   * Remove um medicamento pelo índice na lista
   */
  const removeMedicamento = async (index) => {
    try {
      const medicamentosArmazenados = await AsyncStorage.getItem('listaMedicamentos');
      let listaAtual = medicamentosArmazenados ? JSON.parse(medicamentosArmazenados) : [];

      // Remove o item pelo índice
      listaAtual.splice(index, 1);

      // Atualiza o AsyncStorage
      await AsyncStorage.setItem('listaMedicamentos', JSON.stringify(listaAtual));

      // Atualiza o state
      setListaMedicamentos(listaAtual);

      Alert.alert('Sucesso', 'Medicamento removido com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o medicamento.');
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Medicamento</Text>
      <Text style={styles.subtitle}>
        Preencha as informações abaixo para cadastrar um novo medicamento.
      </Text>

      <Text style={styles.label}>Nome do Medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do medicamento"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Digite a descrição (opcional)"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Text style={styles.label}>Intervalo (horas)</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantas horas entre as doses?"
        value={intervalo}
        onChangeText={setIntervalo}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={salvarMedicamento}>
        <Text style={styles.buttonText}>Salvar Medicamento</Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Medicamentos Cadastrados:</Text>
      {listaMedicamentos.length === 0 ? (
        <Text style={styles.emptyList}>Nenhum medicamento cadastrado ainda.</Text>
      ) : (
        listaMedicamentos.map((item, index) => (
          <View key={index} style={styles.medicamentoItem}>
            <Text style={styles.medicamentoNome}>{item.nome}</Text>
            {item.descricao ? (
              <Text style={styles.medicamentoDescricao}>{item.descricao}</Text>
            ) : null}
            <Text style={styles.medicamentoInfo}>
              Intervalo: {item.interval} hora(s)
            </Text>

            {/* Botão para remover o medicamento */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeMedicamento(index)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

export default AdicionarMedicamentoScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyList: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  medicamentoItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f3f3f3',
  },
  medicamentoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  medicamentoDescricao: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  medicamentoInfo: {
    fontSize: 14,
    marginBottom: 3,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
