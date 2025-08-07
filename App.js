import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  useEffect(() => {
    // ✅ Opción 1: Ocultar completamente la barra
    NavigationBar.setVisibilityAsync('hidden');

  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
