import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ForgetScreen from './screens/ForgetScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import { enableScreens } from 'react-native-screens';
enableScreens(); 
console.log('App started rendering');



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forget"
          component={ForgetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} />

         <Stack.Screen
        name="Details" 
        component={DetailScreen} 
        options={{ headerShown: false }} />

      </Stack.Navigator>


    
    </NavigationContainer>
  );
}