import { StyleSheet, Text, View } from 'react-native';

import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';







export default function App() {
  // Create an animated value for the scale of the circle
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation
    Animated.timing(scaleAnim, {
      toValue: 1, // Scale to 1 (fully expanded)
      duration: 1000, // Animation duration (1 second)
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 10], // The larger the second value, the bigger the circle
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white', // Initial background color
  },
  circle: {
    position: 'absolute',
    width: 100, // Circle size (will be scaled up)
    height: 100,
    borderRadius: 50, // Make the circle round
    backgroundColor: 'rgba(254, 216, 223, 1)', // Target background color
    top: '50%',
    left: '50%',
    marginLeft: -50, // Center the circle horizontally
    marginTop: -50, // Center the circle vertically
  },
});