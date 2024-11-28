import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainMenu from './components/screens/MainMenu';
import CalculoMacronutrientes from './components/screens/CalculoCarboidratos';
import GraficoInsulina from './components/screens/GraficoInsulina';
import PaginaNaoImplementada from './components/screens/PaginaNaoImplementada';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DiabeticHealth">
        <Stack.Screen name="DiabeticHealth" component={MainMenu} />
        <Stack.Screen name="Cálculo de Macronutrientes" component={CalculoMacronutrientes} />
        <Stack.Screen name="Gráfico Insulina" component={GraficoInsulina} />
        <Stack.Screen name="Não Implementada" component={PaginaNaoImplementada} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
