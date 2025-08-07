import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, PanResponder, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styles from '../styles/globalStyles';
import { useRespuestas } from '../context/RespuestasContext';

export default function Ejercicio14Screen({ navigation }) {
  const [respuestasHabilitadas, setRespuestasHabilitadas] = useState(false);
  const [paths, setPaths] = useState([]);
  const currentPath = useRef('');
  const { guardarRespuesta, suspenderPrueba } = useRespuestas(); // ✅ usar contexto

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPath.current = `M${locationX},${locationY}`;
        setPaths(prev => [...prev, currentPath.current]);
      },
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPath.current += ` L${locationX},${locationY}`;
        setPaths(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = currentPath.current;
          return updated;
        });
      },
      onPanResponderRelease: () => {
        currentPath.current = '';
      }
    })
  ).current;

  const limpiarDibujo = () => {
    setPaths([]);
  };

  const irAlSiguiente = (valor) => {
    guardarRespuesta(13, valor); // ✅ A14 → índice 13
    console.log(`Respuesta A14: ${valor}`);
    navigation.navigate('Ejercicio15');
  };

  const handleSuspender = () => {
    guardarRespuesta(13, 'SP'); // A14
    suspenderPrueba(); // Marca A15–A25 como SP
    setTimeout(() => {
      navigation.navigate('ResultadosT');
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Imagen táctil para dibujar */}
      <View style={{ flex: 0.7 }} {...panResponder.panHandlers}>
        <ImageBackground
          source={require('../assets/A14.jpg')}
          style={{
            flex: 1,
            transform: [{ scaleX: 1.6 }],
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="contain"
        >
          <Svg style={StyleSheet.absoluteFill}>
            {paths.map((d, index) => (
              <Path key={index} d={d} stroke="black" strokeWidth={3} fill="none" />
            ))}
          </Svg>
        </ImageBackground>
      </View>

      {/* Botón de regresar */}
      <View style={styles.backButton}>
        <TouchableOpacity
          style={[styles.boton, styles.azul]}
          onLongPress={() => navigation.navigate('Ejercicio13')}
          delayLongPress={2000}
        >
          <Text style={styles.botonTexto}>Regresar 🔙</Text>
        </TouchableOpacity>
      </View>

      {/* Fila inferior */}
      <View style={styles.filaInferior}>
        {/* Título + SP + Limpiar */}
        <View style={styles.tituloRS}>
          <Text style={styles.titulo}>Ejercicio A14</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={[styles.boton, styles.rojo]}
              onLongPress={handleSuspender}
              delayLongPress={2000}
            >
              <Text style={styles.botonTexto}>SP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.boton, styles.amarillo]}
              onPress={limpiarDibujo}
            >
              <Text style={styles.botonTexto}>🧽</Text>
            </TouchableOpacity>
          </View>
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
