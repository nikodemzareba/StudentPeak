import firebase from 'firebase' // do not move this from first line -- will cause errors.
import React, { Component } from 'react' // imports React Native Library

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

import { View, Text } from 'react-native'

// Allows font imports
import { useFonts } from 'expo-font'
import Constants from 'expo-constants'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'



// Checks if app is already initialised.
if (firebase.apps.length === 0) {
  firebase.initializeApp(Constants.manifest.web.config.firebase)
}

// All of the screens imported.
import Welcome from './components/authentication/Welcome'
import Register from './components/authentication/Register'
import Login from './components/authentication/Login'
import Main from './components/Main' // Student explore
import PrivateProfile from './components/main/PrivateProfile'
import PublicProfile from './components/main/PublicProfile'
import Verify from './components/authentication/Verify'
import AboutYou from './components/authentication/AboutYou'
import ChooseUsername from './components/authentication/ChooseUsername'
import StudyDetails from './components/authentication/StudyDetails'
import Connect from './components/authentication/Connect'
import Bio from './components/authentication/Bio'



const Stack = createStackNavigator()



export class App extends Component{

  render(){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Verify"
              component={Verify}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PrivateProfile"
              component={PrivateProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PublicProfile"
              component={PublicProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutYou"
              component={AboutYou}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChooseUsername"
              component={ChooseUsername}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StudyDetails"
              component={StudyDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Connect"
              component={Connect}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bio"
              component={Bio}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
     
    )
  }
}

export default App
