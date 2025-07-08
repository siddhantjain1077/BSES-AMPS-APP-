// React & core imports
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';

// Navigation & gesture handler imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens'; // Optimizes memory usage & performance

// Screens & navigators
import SplashScreen from 'react-native-splash-screen'; // Native splash screen handler
import LoginScreen from './screens/LoginScreen';
import ForgetScreen from './screens/ForgetScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import DrawerNavigator from './Navigation/DrawerNavigator';
import { ThemeProvider } from './screens/ThemeContext'; // Custom theme context for dark/light modes

// Enable screen optimization for better navigation performance
enableScreens();

// Create a native stack navigator
const Stack = createNativeStackNavigator();

// Show logs (disable `ignoreAllLogs(true)` if you want to debug)
LogBox.ignoreAllLogs(false); // ✅ Show all logs again (set to `true` to silence warnings)

export default function App() {
  useEffect(() => {
    // Hide splash screen when app loads
    SplashScreen.hide();
  }, []);

  return (
    // Root view to support gesture handling across all screens
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Global theme context provider */}
      <ThemeProvider>
        {/* Root navigation container */}
        <NavigationContainer>
          {/* Define stack-based navigation flow */}
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }} // Hide default header
            />
            <Stack.Screen
              name="Forget"
              component={ForgetScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={DetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
