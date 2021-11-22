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

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Firebase API
const firebaseConfig = {
  apiKey: 'AIzaSyAEvTx7v-Z10OWeDI4uSlUQVW8ZdBoLnFk',
  authDomain: 'studentpeak-8b306.firebaseapp.com',
  projectId: 'studentpeak-8b306',
  storageBucket: 'studentpeak-8b306.appspot.com',
  messagingSenderId: '166397144012',
  appId: '1:166397144012:web:1956c193cd6c0ca3ec4b69',
  measurementId: 'G-4GN727QJLZ',
}

// Checks if app is already initialised.
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
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

  

  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    

    const { loggedIn, loaded } = this.state
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

  

    if (!loggedIn) {
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
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Verify">
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
      </Provider>
    )
  }
}

export default App
