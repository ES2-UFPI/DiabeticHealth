import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainMenu from './components/screens/MainMenu';
import CalculoMacronutrientes from './components/screens/CalculoCarboidratos';
import GraficoInsulina from './components/screens/GraficoInsulina';
import PaginaNaoImplementada from './components/screens/PaginaNaoImplementada';
import RegistroPressaoArterial from './components/screens/PressaoArterial';
import AddReminderScreen from './components/screens/AddReminderScreen';
import AdicionarMedicamentoScreen from './components/screens/AdicionarMedicamentoScreen';
import LoginScreen from './components/screens/LoginScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DiabeticHealth">
        <Stack.Screen name="DiabeticHealth" component={MainMenu} />
        <Stack.Screen name="Cálculo de Macronutrientes" component={CalculoMacronutrientes} />
        <Stack.Screen name="Monitorar Pressão" component={RegistroPressaoArterial} />
        <Stack.Screen name="Gráfico Insulina" component={GraficoInsulina} />
        <Stack.Screen name="Não Implementada" component={PaginaNaoImplementada} />
        <Stack.Screen name="Adicionar Medicamento" component={AdicionarMedicamentoScreen} />
        <Stack.Screen name="Adicionar Lembrete" component={AddReminderScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
