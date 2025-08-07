import React, { useRef, useEffect } from 'react';
import { Animated, PanResponder, Image } from 'react-native';

export default function DraggableImage({ source, initialX = 0, initialY = 0, resetTrigger }) {
  const pan = useRef(new Animated.ValueXY({ x: initialX, y: initialY })).current;

  useEffect(() => {
    pan.setValue({ x: initialX, y: initialY });
  }, [resetTrigger]); 

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[pan.getLayout(), { position: 'absolute' }]}
    >
      <Image source={source} style={{ width: 100, height: 100 }} />
    </Animated.View>
  );
}
