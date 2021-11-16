import firebase from 'firebase'; // do not move this -- will cause errors.
import * as React from 'react'; // imports React Native Library

// Allows font imports
import { useFonts } from 'expo-font';

// Firebase API
const firebaseConfig = {
  apiKey: "AIzaSyAEvTx7v-Z10OWeDI4uSlUQVW8ZdBoLnFk",
  authDomain: "studentpeak-8b306.firebaseapp.com",
  projectId: "studentpeak-8b306",
  storageBucket: "studentpeak-8b306.appspot.com",
  messagingSenderId: "166397144012",
  appId: "1:166397144012:web:1956c193cd6c0ca3ec4b69",
  measurementId: "G-4GN727QJLZ"
};

// Checks if app is already initialised.
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

// Allows to go back to previous state of screen
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// All of the screens imported.
import Welcome from './components/authentication/Welcome';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Main from './components/Main';
import PrivateProfile from './components/main/PrivateProfile';
import PublicProfile from './components/main/PublicProfile';
import Verify from './components/authentication/Verify';
import AboutYou from './components/authentication/AboutYou';
import ChooseUsername from './components/authentication/ChooseUsername';
import StudyDetails from './components/authentication/StudyDetails';
import Connect from './components/authentication/Connect';
import Bio from './components/authentication/Bio';


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
        <Stack.Screen name = "PrivateProfile" component={PrivateProfile} options={{ headerShown: false}}/>
        <Stack.Screen name = "PublicProfile" component={PublicProfile} options={{ headerShown: false}}/>
        <Stack.Screen name = "AboutYou" component={AboutYou} options={{ headerShown: false}}/>
        <Stack.Screen name = "ChooseUsername" component={ChooseUsername} options={{ headerShown: false}}/>
        <Stack.Screen name = "StudyDetails" component={StudyDetails} options={{ headerShown: false}}/>
        <Stack.Screen name = "Connect" component={Connect} options={{ headerShown: false}}/>
        <Stack.Screen name = "Bio" component={Bio} options={{ headerShown: false}}/>
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
