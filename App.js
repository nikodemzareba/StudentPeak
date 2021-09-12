import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';

import { View, Text } from 'react-native'
import firebase from 'firebase';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './components/authentication/Welcome';
import Register from './components/authentication/Register';

// Firebase connection -- database
// *** Later build orchestration layer for database protection. 
const firebaseConfig = {
  apiKey: "AIzaSyAEvTx7v-Z10OWeDI4uSlUQVW8ZdBoLnFk",
  authDomain: "studentpeak-8b306.firebaseapp.com",
  projectId: "studentpeak-8b306",
  storageBucket: "studentpeak-8b306.appspot.com",
  messagingSenderId: "166397144012",
  appId: "1:166397144012:web:1956c193cd6c0ca3ec4b69",
  measurementId: "G-4GN727QJLZ"
};

// Prevents running an instance of firebase = Avoids crash
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
// Creates Route. Landing Page -> Login -> Register page
const Stack = createStackNavigator(); 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


