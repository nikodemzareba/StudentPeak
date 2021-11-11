import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { Component } from 'react';
import { AppLoading} from "expo";

import { StyleSheet, View, Text } from 'react-native'
import firebase from 'firebase';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SwitchSelector from 'react-native-switch-selector'

import Welcome from './components/authentication/Welcome';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Main from './components/Main';
import Profile from './components/main/Profile';
import Verify from './components/authentication/Verify';
import AboutYou from './components/authentication/AboutYou';

/*
 StackNavigator: Builds the screens on top of eachother. Saving the last screen state and allowing the user to return to it.
*/
const Stack = createStackNavigator();

export default function App() {
   const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat.ttf'),
   });

  if (!loaded) {
    return null;
  }


  return ( // Welcome screen set to first stack screen. 
    <NavigationContainer> 
      <Stack.Navigator initialRouteName ="Welcome"> 
        <Stack.Screen name = "Welcome" component={Welcome} options={{ headerShown: false}} />
        <Stack.Screen name = "Login" component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name = "Register" component={Register} options={{ headerShown: false}}/>
        <Stack.Screen name = "Verify" component={Verify} options={{ headerShown: false}}/>
        <Stack.Screen name = "Profile" component={Profile} options={{ headerShown: false}}/>
        <Stack.Screen name = "AboutYou" component={AboutYou} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
