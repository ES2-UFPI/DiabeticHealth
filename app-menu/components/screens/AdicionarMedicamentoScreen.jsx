import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../constants/styles';
import { useMedicamentos } from '../../hooks/useMedicamentos';

const AdicionarMedicamentoScreen = () => {
  const {
    nome,
    setNome,
    descricao,
    setDescricao,
    intervalo,
    setIntervalo,
    listaMedicamentos,
    salvarMedicamento,
    removeMedicamento,
  } = useMedicamentos();

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
};

export default AdicionarMedicamentoScreen;
