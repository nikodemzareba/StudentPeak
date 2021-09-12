import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './components/authentication/Welcome';

// Creates Route. Landing Page -> Login -> Register page
const Stack = createStackNavigator(); 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Welcome">
        <Stack.Screen name ="Welcome" component={Welcome} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


