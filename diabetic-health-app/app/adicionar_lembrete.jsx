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
import * as Notifications from 'expo-notifications';
import { Picker } from '@react-native-picker/picker';

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Lembretes</Text>
      <Text style={styles.subtitle}>
        Selecione o tipo de lembrete e preencha as informações abaixo
      </Text>

      {/* Tipo de Lembrete */}
      <Text style={styles.label}>Selecione o Tipo de Lembrete</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={typeOfReminder}
          onValueChange={(value) => setTypeOfReminder(value)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Medicamento" value="medicamento" />
          <Picker.Item label="Atividade" value="atividade" />
        </Picker>
      </View>

      {/* Se for Medicamento, exibir a lista de medicamentos */}
      {typeOfReminder === 'medicamento' && (
        <>
          <Text style={styles.label}>Selecione o Medicamento</Text>
          {medicationsList.length === 0 ? (
            <Text style={styles.emptyList}>
              Nenhum medicamento cadastrado. Vá para "Adicionar Medicamento" primeiro.
            </Text>
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedMedication}
                onValueChange={(itemValue) => setSelectedMedication(itemValue)}
                style={styles.picker}
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
              <Text style={styles.selectedText}>
                Medicamento: {selectedMedication.nome}
              </Text>
              {selectedMedication.descricao ? (
                <Text style={styles.selectedText}>
                  Descrição: {selectedMedication.descricao}
                </Text>
              ) : null}
              <Text style={styles.selectedText}>
                Intervalo (horas): {selectedMedication.interval}
              </Text>
            </>
          )}
        </>
      )}

      {/* Se for Atividade, exibir a lista de atividades + campo de intervalo */}
      {typeOfReminder === 'atividade' && (
        <>
          <Text style={styles.label}>Selecione a Atividade</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedActivity}
              onValueChange={(itemValue) => setSelectedActivity(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value={null} />
              {activitiesList.map((act, index) => (
                <Picker.Item key={index} label={act} value={act} />
              ))}
            </Picker>
          </View>

          {/* Intervalo para atividades */}
          <Text style={styles.label}>Intervalo (horas)</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o intervalo em horas"
            value={activityInterval}
            onChangeText={setActivityInterval}
            keyboardType="numeric"
          />
        </>
      )}

      {/* CAMPOS GERAIS (DATA/HORA) */}
      <Text style={styles.label}>Data Inicial</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a data (ex: 2025-01-10)"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Hora Inicial</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a hora (ex: 14:30)"
        value={time}
        onChangeText={setTime}
      />

      {/* Botões */}
      <TouchableOpacity style={styles.button} onPress={saveReminder}>
        <Text style={styles.buttonText}>Salvar Lembrete</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.testButton} onPress={testNotification}>
        <Text style={styles.buttonText}>Testar Notificação</Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Lembretes Criados:</Text>
      {remindersList.length === 0 ? (
        <Text style={styles.emptyList}>Nenhum lembrete criado ainda.</Text>
      ) : (
        remindersList.map((reminder, index) => (
          <View key={index} style={styles.reminderItem}>
            <Text style={styles.reminderTitle}>{reminder.title}</Text>
            {reminder.description ? (
              <Text style={styles.reminderDescription}>{reminder.description}</Text>
            ) : null}
            <Text style={styles.reminderInfo}>
              {reminder.date} às {reminder.time}
            </Text>
            <Text style={styles.reminderInfo}>
              Intervalo: {reminder.interval} hora(s)
            </Text>
            <Text style={styles.reminderInfo}>
              Tipo: {reminder.type}
            </Text>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeReminder(index)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

// -- ESTILOS --
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 40,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
    marginBottom: 10,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 10,
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  testButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  emptyList: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  reminderItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f3f3f3',
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reminderDescription: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  reminderInfo: {
    fontSize: 14,
    marginBottom: 3,
  },
});
