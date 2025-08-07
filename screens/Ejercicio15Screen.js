import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import DraggableImage from '../components/DraggableImage';
import styles from '../styles/globalStyles';
import { useRespuestas } from '../context/RespuestasContext'; // ✅ importar contexto

export default function Ejercicio15({ navigation }) {
  const [resetCounter, setResetCounter] = useState(0);
  const [respuestasHabilitadas, setRespuestasHabilitadas] = useState(false);
  const { guardarRespuesta, suspenderPrueba } = useRespuestas(); // ✅ usar contexto

  const handleReset = () => {
    setResetCounter(prev => prev + 1);
    setRespuestasHabilitadas(false);
  };

  const irAlSiguiente = (valor) => {
    guardarRespuesta(14, valor); // ✅ índice 14 para A15
    console.log(`Respuesta A15: ${valor}`);
    navigation.navigate('Ejercicio16');
  };

  const handleSuspender = () => {
    guardarRespuesta(14, 'SP'); // A15
    suspenderPrueba(); // Marca A16–A25 como SP
    setTimeout(() => {
      navigation.navigate('ResultadosT');
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Imagen del abanico */}
      <Image
        source={require('../assets/abanico.png')}
        style={styles.abanicoCentroGrande}
      />

      {/* Imagen de la mano */}
      <Image source={require('../assets/mano.png')} style={styles.manoGrandeCentro} />

      {/* Conos arrastrables */}
      {Array.from({ length: 20 }).map((_, index) => (
        <DraggableImage
          key={index}
          source={require('../assets/cono.png')}
          initialX={30 + (index % 5) * 60}
          initialY={300 - Math.floor(index / 5) * 80}
          resetTrigger={resetCounter}
        />
      ))}

      {/* Fila inferior */}
      <View style={styles.filaInferior}>
        {/* Título + RS + Reiniciar */}
        <View style={styles.tituloRS}>
          <Text style={styles.titulo}>Ejercicio 15</Text>
          <View style={styles.filaRS}>
            <TouchableOpacity
              style={[styles.boton, styles.rojo]}
              onLongPress={handleSuspender}
              delayLongPress={2000}
            >
              <Text style={styles.botonTexto}>SP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.boton, styles.azul]}
              onPress={handleReset}
            >
              <Text style={styles.botonTexto}>🔄</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botones de navegación */}
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

      {/* Botón de regreso */}
      <View style={styles.backButton}>
        <TouchableOpacity
          style={[styles.boton, styles.azul]}
          onLongPress={() => navigation.navigate('Ejercicio14')}
          delayLongPress={2000}
        >
          <Text style={styles.botonTexto}>Regresar 🔙</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
