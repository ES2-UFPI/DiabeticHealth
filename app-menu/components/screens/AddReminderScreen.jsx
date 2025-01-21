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
import * as Notifications from 'expo-notifications';
import { Picker } from '@react-native-picker/picker';
import { globalStyles } from '../../constants/styles';

export default function AddReminderScreen() {
  // -- LISTA DE MEDICAMENTOS (carregada do AsyncStorage)
  const [medicationsList, setMedicationsList] = useState([]);

  // -- TIPOS DE ATIVIDADES FIXAS
  const activitiesList = [
    'medir insulina',
    'medir pressão arterial',
    'alimentação',
    'beber água',
    'dormir',
  ];

  // -- ESTADOS PARA CONTROLE DO TIPO DE LEMBRETE E ESCOLHAS
  const [typeOfReminder, setTypeOfReminder] = useState(''); // 'medicamento' ou 'atividade'
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // -- CAMPOS GERAIS DE LEMBRETE
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // -- INTERVALO PARA ATIVIDADE
  // (para medicamentos, já vem armazenado no objeto do medicamento)
  const [activityInterval, setActivityInterval] = useState('');

  // -- LISTA DE LEMBRETES
  const [remindersList, setRemindersList] = useState([]);

  // Carregar medicamentos e lembretes ao montar
  useEffect(() => {
    loadMedications();
    loadReminders();
  }, []);

  const loadMedications = async () => {
    try {
      const storedMedicines = await AsyncStorage.getItem('listaMedicamentos');
      if (storedMedicines) {
        setMedicationsList(JSON.parse(storedMedicines));
      } else {
        setMedicationsList([]);
      }
    } catch (error) {
      console.log('Erro ao carregar medicamentos:', error);
    }
  };

  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem('medicationReminders');
      if (storedReminders) {
        setRemindersList(JSON.parse(storedReminders));
      } else {
        setRemindersList([]);
      }
    } catch (error) {
      console.log('Erro ao carregar lembretes:', error);
    }
  };

  // Função para agendar notificação
  const scheduleNotification = async (reminder) => {
    const trigger = new Date(`${reminder.date}T${reminder.time}:00`);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Lembrete: ${reminder.title}`,
        body: reminder.description || 'Não se esqueça do seu compromisso!',
      },
      trigger: {
        date: trigger,
        repeats: true,
        repeatInterval: parseInt(reminder.interval) * 60 * 60,
      },
    });
  };

  const testNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Teste de Notificação',
        body: 'Isso é uma notificação de teste!',
      },
      trigger: { seconds: 5 },
    });
    Alert.alert('Sucesso', 'Notificação de teste agendada!');
  };

  // Função para salvar o lembrete
  const saveReminder = async () => {
    // Valida se usuário selecionou um tipo
    if (!typeOfReminder) {
      Alert.alert('Erro', 'Por favor, selecione o tipo de lembrete (medicamento ou atividade).');
      return;
    }

    // Valida se data e hora foram preenchidas
    if (!date || !time) {
      Alert.alert('Erro', 'Preencha a data e a hora para o lembrete.');
      return;
    }

    // Monta o objeto de lembrete final
    let newReminder = {};

    if (typeOfReminder === 'medicamento') {
      // Verifica se selecionou um medicamento
      if (!selectedMedication) {
        Alert.alert('Erro', 'Por favor, selecione um medicamento.');
        return;
      }
      newReminder = {
        type: 'medicamento',
        title: selectedMedication.nome,
        description: selectedMedication.descricao,
        date,
        time,
        interval: selectedMedication.interval, // vem do AsyncStorage
      };
    } else {
      // typeOfReminder === 'atividade'
      if (!selectedActivity) {
        Alert.alert('Erro', 'Por favor, selecione uma atividade.');
        return;
      }
      if (!activityInterval) {
        Alert.alert('Erro', 'Por favor, informe o intervalo para a atividade.');
        return;
      }
      newReminder = {
        type: 'atividade',
        title: selectedActivity,
        // como "atividade" não tem "descrição" em si, deixamos opcional
        description: `Lembrete de ${selectedActivity}`,
        date,
        time,
        interval: activityInterval, // digitado pelo usuário
      };
    }

    try {
      // Lê a lista de lembretes
      const storedReminders = await AsyncStorage.getItem('medicationReminders');
      const reminders = storedReminders ? JSON.parse(storedReminders) : [];

      // Adiciona o novo lembrete
      reminders.push(newReminder);

      // Salva no AsyncStorage
      await AsyncStorage.setItem('medicationReminders', JSON.stringify(reminders));

      // Agenda a notificação
      await scheduleNotification(newReminder);

      // Atualiza o estado local
      setRemindersList(reminders);

      // Limpa os campos
      setTypeOfReminder('');
      setSelectedMedication(null);
      setSelectedActivity(null);
      setDate('');
      setTime('');
      setActivityInterval('');

      Alert.alert('Sucesso', 'Lembrete salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar o lembrete.');
      console.log(error);
    }
  };

  // Remover lembrete pelo índice
  const removeReminder = async (index) => {
    try {
      const storedReminders = await AsyncStorage.getItem('medicationReminders');
      let reminders = storedReminders ? JSON.parse(storedReminders) : [];

      reminders.splice(index, 1);

      await AsyncStorage.setItem('medicationReminders', JSON.stringify(reminders));
      setRemindersList(reminders);

      Alert.alert('Sucesso', 'Lembrete removido com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao remover o lembrete.');
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Cadastro de Lembretes</Text>
      <Text style={globalStyles.subtitle}>
        Selecione o tipo de lembrete e preencha as informações abaixo
      </Text>

      {/* Tipo de Lembrete */}
      <Text style={globalStyles.label}>Selecione o Tipo de Lembrete</Text>
      <View style={globalStyles.pickerContainer}>
        <Picker
          selectedValue={typeOfReminder}
          onValueChange={(value) => setTypeOfReminder(value)}
          style={globalStyles.picker}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Medicamento" value="medicamento" />
          <Picker.Item label="Atividade" value="atividade" />
        </Picker>
      </View>

      {/* Se for Medicamento, exibir a lista de medicamentos */}
      {typeOfReminder === 'medicamento' && (
        <>
          <Text style={globalStyles.label}>Selecione o Medicamento</Text>
          {medicationsList.length === 0 ? (
            <Text style={globalStyles.emptyList}>
              Nenhum medicamento cadastrado. Vá para "Adicionar Medicamento" primeiro.
            </Text>
          ) : (
            <View style={globalStyles.pickerContainer}>
              <Picker
                selectedValue={selectedMedication}
                onValueChange={(itemValue) => setSelectedMedication(itemValue)}
                style={globalStyles.picker}
              >
                <Picker.Item label="Selecione..." value={null} />
                {medicationsList.map((med, index) => (
                  <Picker.Item key={index} label={med.nome} value={med} />
                ))}
              </Picker>
            </View>
          )}

          {/* Mostrar informações do medicamento selecionado, se quiser */}
          {selectedMedication && (
            <>
              <Text style={globalStyles.selectedText}>
                Medicamento: {selectedMedication.nome}
              </Text>
              {selectedMedication.descricao ? (
                <Text style={globalStyles.selectedText}>
                  Descrição: {selectedMedication.descricao}
                </Text>
              ) : null}
              <Text style={globalStyles.selectedText}>
                Intervalo (horas): {selectedMedication.interval}
              </Text>
            </>
          )}
        </>
      )}

      {/* Se for Atividade, exibir a lista de atividades + campo de intervalo */}
      {typeOfReminder === 'atividade' && (
        <>
          <Text style={globalStyles.label}>Selecione a Atividade</Text>
          <View style={globalStyles.pickerContainer}>
            <Picker
              selectedValue={selectedActivity}
              onValueChange={(itemValue) => setSelectedActivity(itemValue)}
              style={globalStyles.picker}
            >
              <Picker.Item label="Selecione..." value={null} />
              {activitiesList.map((act, index) => (
                <Picker.Item key={index} label={act} value={act} />
              ))}
            </Picker>
          </View>

          {/* Intervalo para atividades */}
          <Text style={globalStyles.label}>Intervalo (horas)</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite o intervalo em horas"
            value={activityInterval}
            onChangeText={setActivityInterval}
            keyboardType="numeric"
          />
        </>
      )}

      {/* CAMPOS GERAIS (DATA/HORA) */}
      <Text style={globalStyles.label}>Data Inicial</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite a data (ex: 2025-01-10)"
        value={date}
        onChangeText={setDate}
      />

      <Text style={globalStyles.label}>Hora Inicial</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite a hora (ex: 14:30)"
        value={time}
        onChangeText={setTime}
      />

      {/* Botões */}
      <TouchableOpacity style={globalStyles.button} onPress={saveReminder}>
        <Text style={globalStyles.buttonText}>Salvar Lembrete</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.testButton} onPress={testNotification}>
        <Text style={globalStyles.buttonText}>Testar Notificação</Text>
      </TouchableOpacity>

      <Text style={globalStyles.listTitle}>Lembretes Criados:</Text>
      {remindersList.length === 0 ? (
        <Text style={globalStyles.emptyList}>Nenhum lembrete criado ainda.</Text>
      ) : (
        remindersList.map((reminder, index) => (
          <View key={index} style={globalStyles.reminderItem}>
            <Text style={globalStyles.reminderTitle}>{reminder.title}</Text>
            {reminder.description ? (
              <Text style={globalStyles.reminderDescription}>{reminder.description}</Text>
            ) : null}
            <Text style={globalStyles.reminderInfo}>
              {reminder.date} às {reminder.time}
            </Text>
            <Text style={globalStyles.reminderInfo}>
              Intervalo: {reminder.interval} hora(s)
            </Text>
            <Text style={globalStyles.reminderInfo}>
              Tipo: {reminder.type}
            </Text>

            <TouchableOpacity
              style={globalStyles.removeButton}
              onPress={() => removeReminder(index)}
            >
              <Text style={globalStyles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}
