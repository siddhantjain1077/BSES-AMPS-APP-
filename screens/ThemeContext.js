// ThemeContext.js

// Import necessary modules
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native'; // Used to detect system theme (dark/light)
import AsyncStorage from '@react-native-async-storage/async-storage'; // Persistent storage

// Create a context to hold theme-related values
const ThemeContext = createContext();

// ThemeProvider component to wrap around the app and manage theme state
export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('system'); // Default theme mode

  // On mount, retrieve the stored theme mode from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('themeMode').then(mode => {
      if (mode) setThemeMode(mode);
    });
  }, []);

  // Function to update theme mode and persist it in AsyncStorage
  const setMode = async (mode) => {
    setThemeMode(mode);
    await AsyncStorage.setItem('themeMode', mode);
  };

  // Get system color scheme (light/dark)
  const colorScheme = Appearance.getColorScheme();

  // Determine if the theme should be dark
  const isDark = themeMode === 'system' ? colorScheme === 'dark' : themeMode === 'dark';

  // Define theme colors based on whether it's dark mode
  const theme = {
    isDark,
    mode: themeMode,
    setMode,
    colors: {
      background: isDark ? '#121212' : '#fff',
      text: isDark ? '#f2f2f2' : '#000',
      card: isDark ? '#1e1e1e' : '#e6f0ff',
      badgeBg: isDark ? '#2b2b2b' : '#d0e6ff',
      badgeText: isDark ? '#4da6ff' : '#007bff',
      searchBg: isDark ? '#1a1a1a' : '#f1f1f1',
    }
  };

  // Provide the theme object to the rest of the app
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context in any component
export const useTheme = () => useContext(ThemeContext);