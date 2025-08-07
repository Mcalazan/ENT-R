import React from 'react';
import { View, StyleSheet } from 'react-native';
import DraggableImage from './components/DraggableImage';

export default function App() {
  return (
    <View style={styles.container}>
      <DraggableImage source={require('./assets/cono.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
