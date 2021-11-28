import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React, { useState } from 'react' // imports React Native Library

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

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
import Add from './components/main/Add'
import Save from  './components/main/Save'


import Picture from './components/authentication/Picture'

const Stack = createStackNavigator()

function App(){

const [isLoggedIn, setIsLoggedIn] = useState(false)


const firebaseConfig = {
    apiKey: "AIzaSyAEvTx7v-Z10OWeDI4uSlUQVW8ZdBoLnFk",
    authDomain: "studentpeak-8b306.firebaseapp.com",
    projectId: "studentpeak-8b306",
    storageBucket: "studentpeak-8b306.appspot.com",
    messagingSenderId: "166397144012",
    appId: "1:166397144012:web:1956c193cd6c0ca3ec4b69",
    measurementId: "G-4GN727QJLZ"
  };

if (firebase.apps.length === 0) {
   firebase.initializeApp(firebaseConfig)
}else{
    firebase.app()
}


firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });


  return (
    <NavigationContainer>
      {isLoggedIn ? <Stack.Navigator>
        <Stack.Screen name="PrivateProfile" component={PrivateProfile} options={{ headerShown: false }} />
      </Stack.Navigator> :
        <Stack.Navigator initialRouteName= "Welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default App;


