import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
import Animated from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ThemeScreen = () => {
  const { mode, setMode, isDark } = useTheme();
  const [pressed, setPressed] = React.useState('');

  const buttons = [
    { title: 'Set Light Mode', mode: 'light' },
    { title: 'Set Dark Mode', mode: 'dark' },
    { title: 'Set System Default', mode: 'system' },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDark ? '#121212' : '#fff' }}>
      <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 18, marginBottom: 32 }}>
        Current Theme: {mode}
      </Text>

      {buttons.map(({ title, mode: btnMode }) => (
        <AnimatedPressable
          key={btnMode}
          onPress={() => setMode(btnMode)}
          onPressIn={() => setPressed(btnMode)}
          onPressOut={() => setPressed('')}
          style={{
            width: 200,
            padding: 14,
            marginBottom: 16,
            borderRadius: 8,
            backgroundColor: isDark ? '#333' : '#eee',
            alignItems: 'center',
            transform: [{ scale: pressed === btnMode ? 0.96 : 1 }],
            opacity: pressed === btnMode ? 0.7 : 1,
          }}
        >
          <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 16 }}>{title}</Text>
        </AnimatedPressable>
      ))}
    </View>
  );
};

export default ThemeScreen;
