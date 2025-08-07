import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import ImmersiveMode from 'react-native-immersive';

const HomeScreen = () => {
  useEffect(() => {
    ImmersiveMode.fullLayout(true);
    ImmersiveMode.setImmersive(true);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 40 }}>
      <Button title="Siguiente" onPress={() => {}} />
    </View>
  );
};

export default HomeScreen;
