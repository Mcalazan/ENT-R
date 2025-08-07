// navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RespuestasProvider } from '../context/RespuestasContext';

import PortadaScreen from '../screens/PortadaScreen';
import Ejercicio01Screen from '../screens/Ejercicio01Screen';
import Ejercicio02Screen from '../screens/Ejercicio02Screen';
import Ejercicio03Screen from '../screens/Ejercicio03Screen';
import Ejercicio04Screen from '../screens/Ejercicio04Screen';
import Ejercicio05Screen from '../screens/Ejercicio05Screen';
import Ejercicio06Screen from '../screens/Ejercicio06Screen';
import Ejercicio07Screen from '../screens/Ejercicio07Screen';
import Ejercicio08Screen from '../screens/Ejercicio08Screen';
import Ejercicio09Screen from '../screens/Ejercicio09Screen';
import Ejercicio10Screen from '../screens/Ejercicio10Screen';
import Ejercicio11Screen from '../screens/Ejercicio11Screen';
import Ejercicio12Screen from '../screens/Ejercicio12Screen';
import Ejercicio13Screen from '../screens/Ejercicio13Screen';
import Ejercicio14Screen from '../screens/Ejercicio14Screen';
import Ejercicio15Screen from '../screens/Ejercicio15Screen';
import Ejercicio16Screen from '../screens/Ejercicio16Screen';
import Ejercicio17Screen from '../screens/Ejercicio17Screen';
import Ejercicio18Screen from '../screens/Ejercicio18Screen';
import Ejercicio19Screen from '../screens/Ejercicio19Screen';
import Ejercicio20Screen from '../screens/Ejercicio20Screen';
import Ejercicio21Screen from '../screens/Ejercicio21Screen';
import Ejercicio22Screen from '../screens/Ejercicio22Screen';
import Ejercicio23Screen from '../screens/Ejercicio23Screen';
import Ejercicio24Screen from '../screens/Ejercicio24Screen';
import Ejercicio25Screen from '../screens/Ejercicio25Screen';
import ResultadosT from '../screens/ResultadosT';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <RespuestasProvider>
      <Stack.Navigator initialRouteName="Portada" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Portada" component={PortadaScreen} />
        <Stack.Screen name="Ejercicio01" component={Ejercicio01Screen} />
        <Stack.Screen name="Ejercicio02" component={Ejercicio02Screen} />
        <Stack.Screen name="Ejercicio03" component={Ejercicio03Screen} />
        <Stack.Screen name="Ejercicio04" component={Ejercicio04Screen} />
        <Stack.Screen name="Ejercicio05" component={Ejercicio05Screen} />
        <Stack.Screen name="Ejercicio06" component={Ejercicio06Screen} />
        <Stack.Screen name="Ejercicio07" component={Ejercicio07Screen} />
        <Stack.Screen name="Ejercicio08" component={Ejercicio08Screen} />
        <Stack.Screen name="Ejercicio09" component={Ejercicio09Screen} />
        <Stack.Screen name="Ejercicio10" component={Ejercicio10Screen} />
        <Stack.Screen name="Ejercicio11" component={Ejercicio11Screen} />
        <Stack.Screen name="Ejercicio12" component={Ejercicio12Screen} />
        <Stack.Screen name="Ejercicio13" component={Ejercicio13Screen} />
        <Stack.Screen name="Ejercicio14" component={Ejercicio14Screen} />
        <Stack.Screen name="Ejercicio15" component={Ejercicio15Screen} />
        <Stack.Screen name="Ejercicio16" component={Ejercicio16Screen} />
        <Stack.Screen name="Ejercicio17" component={Ejercicio17Screen} />
        <Stack.Screen name="Ejercicio18" component={Ejercicio18Screen} />
        <Stack.Screen name="Ejercicio19" component={Ejercicio19Screen} />
        <Stack.Screen name="Ejercicio20" component={Ejercicio20Screen} />
        <Stack.Screen name="Ejercicio21" component={Ejercicio21Screen} />
        <Stack.Screen name="Ejercicio22" component={Ejercicio22Screen} />
        <Stack.Screen name="Ejercicio23" component={Ejercicio23Screen} />
        <Stack.Screen name="Ejercicio24" component={Ejercicio24Screen} />
        <Stack.Screen name="Ejercicio25" component={Ejercicio25Screen} />
        <Stack.Screen name="ResultadosT" component={ResultadosT} />
      </Stack.Navigator>
    </RespuestasProvider>
  );
}
