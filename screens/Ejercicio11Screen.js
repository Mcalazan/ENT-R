import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import DraggableImage from '../components/DraggableImage';
import styles from '../styles/globalStyles';
import { useRespuestas } from '../context/RespuestasContext';

export default function EjercicioDadoCubosScreen({ navigation }) {
  const [resetCounter, setResetCounter] = useState(0);
  const [respuestasHabilitadas, setRespuestasHabilitadas] = useState(false);
  const { guardarRespuesta, suspenderPrueba } = useRespuestas();

  const handleReset = () => {
    setResetCounter(prev => prev + 1);
    setRespuestasHabilitadas(false);
  };

  const irAlSiguiente = (valor) => {
    guardarRespuesta(10, valor); // Índice 10 = A11
    console.log(`Respuesta A11: ${valor}`);
    navigation.navigate('Ejercicio12');
  };

  const handleSuspender = () => {
    guardarRespuesta(10, 'SP');
    suspenderPrueba();
    setTimeout(() => {
      navigation.navigate('ResultadosT');
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Imagen del dado */}
      <Image source={require('../assets/dado.jpg')} style={styles.dadoGrande} />

      {/* Imagen de la mano */}
      <Image source={require('../assets/mano.png')} style={styles.manoGrandeCentro} />

      {/* Cubos arrastrables */}
      {Array.from({ length: 10 }).map((_, index) => (
        <DraggableImage
          key={index}
          source={require('../assets/cubo.png')}
          initialX={30 + (index % 5) * 60}
          initialY={300 - Math.floor(index / 5) * 80}
          resetTrigger={resetCounter}
        />
      ))}

      {/* Fila inferior */}
      <View style={styles.filaInferior}>
        {/* Título + SP + Reset */}
        <View style={styles.tituloRS}>
          <Text style={styles.titulo}>Ejercicio 11</Text>

          <View style={styles.filaRS}>
            <TouchableOpacity
              style={[styles.boton, styles.rojo]}
              onLongPress={handleSuspender}
              delayLongPress={2000}
            >
              <Text style={styles.botonTexto}>SP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.boton, styles.azul]} onPress={handleReset}>
              <Text style={styles.botonTexto}>🔄</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botones de respuesta */}
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

      {/* Botón de regresar */}
      <View style={styles.backButton}>
        <TouchableOpacity
          style={[styles.boton, styles.azul]}
          onLongPress={() => navigation.navigate('Ejercicio10')}
          delayLongPress={2000}
        >
          <Text style={styles.botonTexto}>Regresar 🔙</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
