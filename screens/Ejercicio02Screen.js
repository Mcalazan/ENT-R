import React, { useRef, useState } from 'react';
import { View, Pressable, Image, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../styles/globalStyles';
import { useRespuestas } from '../context/RespuestasContext';

export default function Ejercicio02Screen({ navigation }) {
  const soundRef = useRef(null);
  const [respuestasHabilitadas, setRespuestasHabilitadas] = useState(false);
  const { guardarRespuesta, suspenderPrueba } = useRespuestas(); // ✅ usar contexto

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
    guardarRespuesta(1, valor); // ✅ índice 1 = A2
    console.log(`Respuesta A2: ${valor}`);
    navigation.navigate('Ejercicio03');
  };

  const handleSuspender = () => {
    guardarRespuesta(1, 'SP'); // asegura que A2 quede marcada como SP si no ha sido respondida
    suspenderPrueba(); // las demás vacías se marcarán como SP
    setTimeout(() => {
      navigation.navigate('ResultadosT');
    }, 200); // pequeño delay para que se actualicen las respuestas antes de mostrar resultados
  };

  return (
    <View style={styles.container}>
      {/* Imagen táctil */}
      <Pressable onPress={reproducirSonido} style={styles.imagenContainer}>
        <Image
          source={require('../assets/A2.jpg')}
          style={styles.imagen}
          resizeMode="contain"
        />
      </Pressable>

      {/* Botón Regresar */}
      <View style={styles.backButton}>
        <TouchableOpacity
          style={[styles.boton, styles.azul]}
          onLongPress={() => navigation.navigate('Ejercicio01')}
          delayLongPress={2000}
        >
          <Text style={styles.botonTexto}>Regresar 🔙</Text>
        </TouchableOpacity>
      </View>

      {/* Fila inferior */}
      <View style={styles.filaInferior}>
        {/* Título + SP */}
        <View style={styles.tituloRS}>
          <Text style={styles.titulo}>Ejercicio A2</Text>
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
            onPress={() => irAlSiguiente(1)} // ✅ correcta
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
            onPress={() => irAlSiguiente(0)} // ❌ incorrecta
          >
            <Text style={styles.botonTexto}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
