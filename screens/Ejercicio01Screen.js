import React, { useRef, useState } from 'react';
import { View, Pressable, Image, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../styles/globalStyles';
import { useRespuestas } from '../context/RespuestasContext';

export default function Ejercicio01Screen({ navigation }) {
  const soundRef = useRef(null);
  const [respuestasHabilitadas, setRespuestasHabilitadas] = useState(false);
  const { guardarRespuesta, suspenderPrueba } = useRespuestas(); // ✅ usar suspenderPrueba del contexto

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
    guardarRespuesta(0, valor); // 0 es el índice para A1
    console.log(`Respuesta A1: ${valor}`);
    navigation.navigate('Ejercicio02');
  };

  const handleSuspender = () => {
    guardarRespuesta(0, 'SP'); // asegura que A1 esté en SP si no ha sido respondido
    suspenderPrueba(); // las demás se marcan SP solo si están vacías
    setTimeout(() => {
      navigation.navigate('ResultadosT');
    }, 200); // pequeño delay para que las respuestas se guarden antes de navegar
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={reproducirSonido} style={styles.imagenContainer}>
        <Image
          source={require('../assets/A1.jpg')}
          style={styles.imagen}
          resizeMode="contain"
        />
      </Pressable>

      <View style={styles.filaInferior}>
        <View style={styles.tituloRS}>
          <Text style={styles.titulo}>Ejercicio A1</Text>

          {/* Botón SP con pulsación larga */}
          <TouchableOpacity
            style={[styles.boton, styles.rojo]}
            onLongPress={handleSuspender}
            delayLongPress={2000}
          >
            <Text style={styles.botonTexto}>SP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.botones}>
          <TouchableOpacity
            style={[styles.boton, styles.verde, !respuestasHabilitadas && styles.deshabilitado]}
            disabled={!respuestasHabilitadas}
            onPress={() => irAlSiguiente(1)}
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
            onPress={() => irAlSiguiente(0)}
          >
            <Text style={styles.botonTexto}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
