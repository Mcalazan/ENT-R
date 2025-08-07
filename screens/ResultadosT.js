import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';
import { useRespuestas } from '../context/RespuestasContext'; // asegúrate de que el contexto esté bien importado

export default function ResultadosScreen({ navigation }) {
  const [nip, setNip] = useState('');
  const [nie, setNie] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [datosRegistrados, setDatosRegistrados] = useState(false);
  const viewRef = useRef();
  const { respuestas, guardarRespuesta, resetearRespuestas  } = useRespuestas();

  const todoListo = nip && nie && institucion;

  const handleCaptura = async () => {
    try {
      const uri = await viewRef.current.capture();
      await MediaLibrary.createAssetAsync(uri);
      alert('Captura guardada en galería.');
    } catch (error) {
      alert('Error al capturar pantalla');
      console.log(error);
    }
  };

  const handleFinalizar = () => {
  Alert.alert(
    'Confirmar finalización',
    '¿Está seguro que desea finalizar?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        onPress: () => {
          resetearRespuestas(); // ✅ Aquí se resetea todo
          navigation.navigate('Portada');
        },
      },
    ]
  );
};

  const ejercicios = Array.from({ length: 25 }, (_, i) => `A${i + 1}`);
  const mitad = Math.ceil(ejercicios.length / 2);
  const columna1 = ejercicios.slice(0, mitad);
  const columna2 = ejercicios.slice(mitad);

  const renderRespuesta = (index) => {
  const valor = respuestas[index];
  let texto = '-';
  let estilo = styles.noRespondido;

  if (valor === 'SP') {
    texto = 'SP';
    estilo = styles.sp;
  } else if (valor === 1) {
    texto = 'Correcto';
    estilo = styles.correcto;
  } else if (valor === 0) {
    texto = 'Incorrecto';
    estilo = styles.incorrecto;
  }

  // Si es null, no mostrar nada
  if (valor === null) return <Text style={styles.noRespondido}>-</Text>;

  return <Text style={estilo}>{texto}</Text>;
};


  return (
    <ViewShot style={styles.rootContainer} ref={viewRef} options={{ format: 'png', quality: 1 }}>
      {/* DERECHA: Formulario */}
      <View style={styles.formulario}>
        <Text style={styles.label}>NIE: Número de Identificación del Estudiante</Text>
        <TextInput
          style={styles.input}
          value={nie}
          onChangeText={setNie}
          placeholder="Ingrese NIE"
        />

        <Text style={styles.label}>NIP: Número de Identificación Profesional</Text>
        <TextInput
          style={styles.input}
          value={nip}
          onChangeText={setNip}
          placeholder="Ingrese NIP"
        />

        <Text style={styles.label}>Nombre del Instituto:</Text>
        <TextInput
          style={styles.input}
          value={institucion}
          onChangeText={setInstitucion}
          placeholder="Nombre del instituto: "
        />

        <TouchableOpacity
          style={[styles.boton, !todoListo && styles.deshabilitado]}
          disabled={!todoListo}
          onPress={() => setDatosRegistrados(true)}
        >
          <Text style={styles.botonTexto}>Ya he registrado Datos ✅</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, !datosRegistrados && styles.deshabilitado]}
          disabled={!datosRegistrados}
          onPress={handleCaptura}
        >
          <Text style={styles.botonTexto}>Tomar captura 📸</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, { backgroundColor: '#e74c3c' }, !datosRegistrados && styles.deshabilitado]}
          disabled={!datosRegistrados}
          onPress={handleFinalizar}
        >
          <Text style={styles.botonTexto}>Finalizar 🔚</Text>
        </TouchableOpacity>
      </View>

      {/* IZQUIERDA: Tabla de ejercicios en 2 columnas */}
      <View style={styles.tablaContainer}>
        <Text style={styles.header}>REGISTRO DE RESPUESTAS</Text>
        <View style={styles.tablaDobleColumna}>
          <View style={styles.tablaColumna}>
            {columna1.map((label, i) => (
              <View key={i} style={styles.fila}>
                <Text style={styles.labelEjercicio}>{label}:</Text>
                {renderRespuesta(i)}
              </View>
            ))}
          </View>
          <View style={styles.tablaColumna}>
            {columna2.map((label, i) => (
              <View key={i + mitad} style={styles.fila}>
                <Text style={styles.labelEjercicio}>{label}:</Text>
                {renderRespuesta(i + mitad)}
              </View>
            ))}
          </View>
        </View>
      </View>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F0F8FF',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  tablaContainer: {
    flex: 1.2,
    paddingLeft: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  tablaDobleColumna: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tablaColumna: {
    flex: 1,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
   labelEjercicio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    width: 80,
  },
  correcto: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  incorrecto: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  noRespondido: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  sp: {
  fontSize: 16,
  color: '#c0392b',
  fontWeight: 'bold',
},

  formulario: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    justifyContent: 'flex-start',
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#2980b9',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  deshabilitado: {
    backgroundColor: '#bdc3c7',
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});
