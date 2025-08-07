import React, { useRef, useState } from 'react';
import { View, Pressable, Image, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../styles/globalStyles';
import { useRespuestas } from '../context/RespuestasContext';

export default function Ejercicio04Screen({ navigation }) {
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
    guardarRespuesta(3, valor); // Índice 3 = A4
    console.log(`Respuesta A4: ${valor}`);
    navigation.navigate('Ejercicio05');
  };

  const handleSuspender = () => {
    guardarRespuesta(3, 'SP'); // asegura A4 en 'SP' si aún no fue respondido
    suspenderPrueba(); // marca las demás vacías como SP
    setTimeout(() => {
      navigation.navigate('ResultadosT');
    }, 200); // pequeño delay para asegurar actualización del estado
  };

  return (
    <View style={styles.container}>
      {/* Imagen táctil */}
      <Pressable onPress={reproducirSonido} style={styles.imagenContainer}>
        <Image
          source={require('../assets/A4.jpg')}
          style={styles.imagen}
          resizeMode="contain"
        />
      </Pressable>

      {/* Botón Regresar */}
      <View style={styles.backButton}>
        <TouchableOpacity
          style={[styles.boton, styles.azul]}
          onLongPress={() => navigation.navigate('Ejercicio03')}
          delayLongPress={2000}
        >
          <Text style={styles.botonTexto}>Regresar 🔙</Text>
        </TouchableOpacity>
      </View>

      {/* Fila inferior */}
      <View style={styles.filaInferior}>
        <View style={styles.tituloRS}>
          <Text style={styles.titulo}>Ejercicio A4</Text>
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
            onPress={() => irAlSiguiente(1)} // ✅ correcta
          >
            <Text style={styles.botonTexto}>O</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botonGrande, styles.azul]}
            onLongPress={() => setRespuestasHabilitadas(true)}
            delayLongPress={1000}
          >
            <Text style={styles.botonTextoGrande}>Habilitar respuesta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boton, styles.amarillo, !respuestasHabilitadas && styles.deshabilitado]}
            disabled={!respuestasHabilitadas}
            onPress={() => irAlSiguiente(0)} // ❌ incorrecta
          >
            <Text style={styles.botonTexto}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
