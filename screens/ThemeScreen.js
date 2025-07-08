import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext'; // Import custom theme context hook
import Animated from 'react-native-reanimated';

// Convert Pressable into an animated component using Reanimated
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ThemeScreen = () => {
  // Destructure current theme mode and setter from context
  const { mode, setMode, isDark } = useTheme();

  // Local state to detect which button is currently being pressed
  const [pressed, setPressed] = React.useState('');

  // Array of theme buttons with label and corresponding mode value
  const buttons = [
    { title: 'Set Light Mode', mode: 'light' },
    { title: 'Set Dark Mode', mode: 'dark' },
    { title: 'Set System Default', mode: 'system' },
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? '#121212' : '#fff', // Theme-based background color
      }}
    >
      {/* Display current theme mode */}
      <Text
        style={{
          color: isDark ? '#fff' : '#000',
          fontSize: 18,
          marginBottom: 32,
        }}
      >
        Current Theme: {mode}
      </Text>

      {/* Map through buttons array to render each theme toggle option */}
      {buttons.map(({ title, mode: btnMode }) => (
        <AnimatedPressable
          key={btnMode}
          onPress={() => setMode(btnMode)} // Change theme mode on press
          onPressIn={() => setPressed(btnMode)} // Indicate active press
          onPressOut={() => setPressed('')} // Reset press state
          style={{
            width: 200,
            padding: 14,
            marginBottom: 16,
            borderRadius: 8,
            backgroundColor: isDark ? '#333' : '#eee', // Button color based on theme
            alignItems: 'center',
            transform: [{ scale: pressed === btnMode ? 0.96 : 1 }], // Slight scale animation
            opacity: pressed === btnMode ? 0.7 : 1, // Visual feedback on press
          }}
        >
          <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 16 }}>{title}</Text>
        </AnimatedPressable>
      ))}
    </View>
  );
};

export default ThemeScreen;
