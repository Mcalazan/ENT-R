import React, { useRef, useState } from 'react';
import { View, Pressable, Image, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../styles/globalStyles';
import { useRespuestas } from '../context/RespuestasContext';

export default function Ejercicio09Screen({ navigation }) {
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
    guardarRespuesta(8, valor); // Índice 8 = A9
    console.log(`Respuesta A9: ${valor}`);
    navigation.navigate('Ejercicio10');
  };

  const handleSuspender = () => {
    guardarRespuesta(8, 'SP'); // asegura que A9 quede como SP si no fue respondida
    suspenderPrueba(); // las demás vacías se marcan SP
    setTimeout(() => {
      navigation.navigate('ResultadosT');
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Imagen táctil */}
      <Pressable onPress={reproducirSonido} style={styles.imagenContainer}>
        <Image
          source={require('../assets/A9.jpg')}
          style={styles.imagen}
          resizeMode="contain"
        />
      </Pressable>

      {/* Botón Regresar */}
      <View style={styles.backButton}>
        <TouchableOpacity
          style={[styles.boton, styles.azul]}
          onLongPress={() => navigation.navigate('Ejercicio08')}
          delayLongPress={2000}
        >
          <Text style={styles.botonTexto}>Regresar 🔙</Text>
        </TouchableOpacity>
      </View>

      {/* Fila inferior */}
      <View style={styles.filaInferior}>
        {/* Título + SP */}
        <View style={styles.tituloRS}>
          <Text style={styles.titulo}>Ejercicio A9</Text>
          <TouchableOpacity
            style={[styles.boton, styles.rojo]}
            onLongPress={handleSuspender}
            delayLongPress={2000}
          >
            <Text style={styles.botonTexto}>SP</Text>
          </TouchableOpacity>
        </View>

        {/* Botones */}
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
