import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../styles/globalStyles';
import { useRespuestas } from '../context/RespuestasContext'; // ✅ Importar contexto

export default function Ejercicio23Screen({ navigation }) {
  const soundRef = useRef(null);
  const [respuestasHabilitadas, setRespuestasHabilitadas] = useState(false);
  const { guardarRespuesta, suspenderPrueba } = useRespuestas(); // ✅ incluir suspenderPrueba

  const reproducirSonido = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/pop.mp3')
      );
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.log('Error al reproducir sonido:', error);
    }
  };

  const irAlSiguiente = (valor) => {
    guardarRespuesta(22, valor); // ✅ A23 → índice 22
    console.log(`Respuesta A23: ${valor}`);
    navigation.navigate('Ejercicio24');
  };

  const handleSuspender = () => {
    guardarRespuesta(22, 'SP'); // A23 = SP
    suspenderPrueba();          // A24 y A25 = SP
    setTimeout(() => {
      navigation.navigate('ResultadosT');
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Texto central grande */}
      <TouchableOpacity onPress={reproducirSonido} style={styles.imagenContainer}>
        <Text style={{ fontSize: 120, fontWeight: 'bold', textAlign: 'center' }}>
          Cuenta hasta 19 de 2 en 2
        </Text>
      </TouchableOpacity>

      {/* Botón Regresar */}
      <View style={styles.backButton}>
        <TouchableOpacity
          style={[styles.boton, styles.azul]}
          onLongPress={() => navigation.navigate('Ejercicio22')}
          delayLongPress={2000}
        >
          <Text style={styles.botonTexto}>Regresar 🔙</Text>
        </TouchableOpacity>
      </View>

      {/* Fila inferior */}
      <View style={styles.filaInferior}>
        {/* Título + SP */}
        <View style={styles.tituloRS}>
          <Text style={styles.titulo}>Ejercicio A23</Text>
          <TouchableOpacity
            style={[styles.boton, styles.rojo]}
            onLongPress={handleSuspender}
            delayLongPress={2000}
          >
            <Text style={styles.botonTexto}>SP</Text>
          </TouchableOpacity>
        </View>

        {/* Botones de navegación */}
        <View style={styles.botones}>
          <TouchableOpacity
            style={[styles.boton, styles.verde, !respuestasHabilitadas && styles.deshabilitado]}
            disabled={!respuestasHabilitadas}
            onPress={() => irAlSiguiente(1)} // ✅ Correcta
          >
            <Text style={styles.botonTexto}>O</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botonGrande, styles.azul]}
            onLongPress={() => setRespuestasHabilitadas(true)}
            delayLongPress={2000}
          >
            <Text style={styles.botonTextoGrande}>Habilitar respuesta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boton, styles.amarillo, !respuestasHabilitadas && styles.deshabilitado]}
            disabled={!respuestasHabilitadas}
            onPress={() => irAlSiguiente(0)} // ❌ Incorrecta
          >
            <Text style={styles.botonTexto}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
