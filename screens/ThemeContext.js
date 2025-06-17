// ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('system');

  useEffect(() => {
    AsyncStorage.getItem('themeMode').then(mode => {
      if (mode) setThemeMode(mode);
    });
  }, []);

  const setMode = async (mode) => {
    setThemeMode(mode);
    await AsyncStorage.setItem('themeMode', mode);
  };

  const colorScheme = Appearance.getColorScheme();
  const isDark = themeMode === 'system' ? colorScheme === 'dark' : themeMode === 'dark';

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

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);