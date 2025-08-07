import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20, // margen superior global
    paddingHorizontal: 10, // opcional: margen lateral
  },
  imagenContainer: {
    flex: 0.7,
    width: '100%',
    justifyContent: 'center',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  filaInferior: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  tituloRS: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#06283D',
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  boton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  botonGrande: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
  },
  botonTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  botonTextoGrande: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  verde: {
    backgroundColor: '#28a745',
  },
  azul: {
    backgroundColor: '#007bff',
  },
  amarillo: {
    backgroundColor: '#ffc107',
  },
  rojo: {
    backgroundColor: '#dc3545',
  },
  deshabilitado: {
    opacity: 0.4,
  },
   dadoGrande: {
    position: 'absolute',
    top: 40,
    left: 120,
    width: 150,
    height: 150,
  },
  manoGrandeCentro: {
    position: 'absolute',
    width: 400,
    height: 320,
    bottom: 200,
    right:  50, // centrado horizontalmente
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  resetButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    zIndex: 1,
  },
  filaRS: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10, // espacio entre los botones (solo en React Native 0.71+)
},
abanicoCentroGrande: {
  position: 'absolute',       // Puedes ajustar este valor según cómo se vea visualmente
  left: '44%',
  transform: [{ translateX: -100 }], // Para centrar horizontalmente según su ancho
  width: 260,         // Ajusta según el tamaño deseado
  height: 260,
  resizeMode: 'contain',
  zIndex: 0,
},



});
