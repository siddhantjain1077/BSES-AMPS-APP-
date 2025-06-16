import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); // 'light' | 'dark'
  const [themeMode, setThemeMode] = useState('system'); // 'light' | 'dark' | 'system'

  const isDark = themeMode === 'system' ? systemScheme === 'dark' : themeMode === 'dark';

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
