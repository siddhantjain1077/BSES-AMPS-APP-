import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ForgetScreen from '../screens/ForgetScreen';
import { CustomDrawerContent } from '../components/CustomDrawerContent'; 
import ThemeScreen from '../screens/ThemeScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#007bff',
        drawerInactiveTintColor: '#000', // Set inactive drawer color to black
        drawerLabelStyle: { fontWeight: 'bold' },
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
      <Drawer.Screen
        name="Theme Settings"
        component={ThemeScreen}
        options={{
          drawerLabel: '🎨 Theme Settings',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
