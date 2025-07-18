import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ForgetScreen from '../screens/ForgetScreen';
import { CustomDrawerContent } from '../components/CustomDrawerContent'; 
import ThemeScreen from '../screens/ThemeScreen';
import { useTheme } from '../screens/ThemeContext'; // Import your theme hook
import { useLayoutEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { isDark, colors } = useTheme(); // Get theme values

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: colors.drawerBg || (isDark ? '#121212' : '#fff'),
        },
        drawerActiveTintColor: colors.text || (isDark ? '#fff' : '#000'),
        drawerInactiveTintColor: colors.text || (isDark ? '#ccc' : '#000'),

        drawerLabelStyle: { fontWeight: 'bold' },
        headerStyle: {
          backgroundColor: colors.headerBg || (isDark ? '#1c1c1c' : '#f8f9fa'),
        },
        headerTintColor: colors.text || (isDark ? '#fff' : '#000'),
      }}
    >
      <Drawer.Screen
      
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: '🏠 Home',
        }}
      />
      <Drawer.Screen
        name="Change Password"
        component={ForgetScreen}
        options={{
          drawerLabel: '🔑 Change Password',
        }}
      />
      {/* <Drawer.Screen
        name="Theme Settings"
        component={ThemeScreen}
        options={{
          drawerLabel: '🎨 Theme Settings',
        }} */}
      {/* /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;