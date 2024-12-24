import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function AddMedicationReminderScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [interval, setInterval] = useState('');

  const scheduleNotification = async (reminder) => {
    const trigger = new Date(`${reminder.date}T${reminder.time}:00`);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Hora de tomar ${reminder.title}!`,
        body: reminder.description || 'Não se esqueça de tomar seu medicamento.',
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

  const saveReminder = async () => {
    if (!title || !date || !time || !interval) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const newReminder = { title, description, date, time, interval };
    try {
      const storedReminders = await AsyncStorage.getItem('medicationReminders');
      const reminders = storedReminders ? JSON.parse(storedReminders) : [];
      reminders.push(newReminder);
      await AsyncStorage.setItem('medicationReminders', JSON.stringify(reminders));
      await scheduleNotification(newReminder);
      Alert.alert('Sucesso', 'Lembrete de medicamento salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar o lembrete.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Medicamento</Text>
      <Text style={styles.subtitle}>Preencha as informações abaixo para criar um lembrete de medicamento</Text>

      <Text style={styles.label}>Nome do Medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do medicamento"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.observacoes]}
        placeholder="Digite a descrição (opcional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Data Inicial</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a data (ex: 25/12/2024)"
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

      <Text style={styles.label}>Intervalo de Repetição (em horas)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o intervalo de horas"
        keyboardType="numeric"
        value={interval}
        onChangeText={setInterval}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveReminder}
      >
        <Text style={styles.buttonText}>Salvar Lembrete</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.testButton}
        onPress={testNotification}
      >
        <Text style={styles.buttonText}>Testar Notificação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 10,
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
  },
  observacoes: {
    height: 120,
    textAlignVertical: 'top',
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
