import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PortadaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ENT-R</Text>
      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Ejercicio01')}>
        <Text style={styles.botonTexto}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#06283D',
  },
  boton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  botonTexto: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
