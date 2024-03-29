import firebase from 'firebase' // do not move this from first line -- will cause errors.
require('firebase/firestore');
import "firebase/auth";
import {getAuth} from "firebase/auth"
import React, {useEffect, Component, useState} from 'react' // imports React Native Library

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import {connect} from 'react-redux'

const store = createStore(rootReducer, applyMiddleware(thunk))

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// All of the screens imported.
import Welcome from './components/authentication/Welcome'
import Register from './components/authentication/Register'
import Login from './components/authentication/Login'
import Main from './components/Main' // Student explore
import Verify from './components/authentication/Verify'
import AboutYou from './components/authentication/AboutYou'
import ChooseUsername from './components/authentication/ChooseUsername'
import StudyDetails from './components/authentication/StudyDetails'
import Connect from './components/authentication/Connect'
import Bio from './components/authentication/Bio'
import Add from './components/main/Camera/Add'
import Save from "./components/main/Camera/Save";
import Topbar from './components/main/top/Topbar'
import ShowEventsResults from './components/main/Events_Screen/ShowEventsResults'
import UsersLikedPost from "./components/main/Feeds/Shared_Objects/Likes_And_Comments/Likes/UsersLikedPost";
import Search from "./components/main/Search/Search";
import SearchScreenResults from "./components/main/Search/SearchScreenResults";
import ViewPost from "./components/main/Search/ViewPost";
import Trending_Pictures_And_Videos_Feed from "./components/main/Feeds/Trending_Feed/Trending_Pictures_And_Videos_Feed";


import Picture from './components/authentication/Picture'
import Interests from './components/authentication/Interests'
import Recommended from './components/authentication/Recommended'
import Chat from './components/main/Chat/ChatList'
import showComment from "./components/main/Feeds/Shared_Objects/Likes_And_Comments/Comments/showComment";
import Contacts from "./components/main/Chat/Contacts";
import ChatHeader from "./components/main/Chat/ChatHeader";
import match from './components/main/match';
import matchFound from './components/main/matchFound';


const Stack = createStackNavigator();

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegisterComplete, setIsRegisterComplete] = useState(false);
    const [user, setUser] = useState (null);

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
    } else {
        firebase.app()
    }


    firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
            setIsLoggedIn(true);

            // not working
            if(user.registerDone == false){
                setIsRegisterComplete(false);
            }else{
                setIsRegisterComplete(true);
            }

        } else {
            setIsLoggedIn(false);
        }
    });




    // firebase.firestore()
    //      .collection("users")
    //      .doc(firebase.auth().user)
    //      .get()
    //      .then((snapshot) => {
    //     if (snapshot.exists) {
    //      setUser(snapshot.data());
    //     }
    //     else {
    //     console.log('user does not exist')
    //     }
    // })





    return (


        <Provider store={store}>
            <NavigationContainer>

                {isLoggedIn ?

                    <Stack.Navigator>

                        {isRegisterComplete ?

                            // if user has completed registration and has an account.
                            <Stack.Group initialRouteName="Main">

                                <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
                                <Stack.Screen name="AboutYou" component={AboutYou} options={{headerShown: false}}/>
                                <Stack.Screen name="Save" component={Save} options={{headerShown: true}}/>
                                <Stack.Screen name="Match" component={match} options={{headerShown: true}}/>
                                <Stack.Screen name="MatchFound" component={matchFound} options={{headerShown: true}}/>
                                <Stack.Screen name="ShowEventsResults" component={ShowEventsResults} options={{headerShown: false}}/>
                                <Stack.Screen name="showComment" component={showComment} options={{headerShown: false}}/>
                                <Stack.Screen name="UsersLikedPost" component={UsersLikedPost} options={{headerShown: false}}/>
                                <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
                                <Stack.Screen name="SearchScreenResults" component={SearchScreenResults} options={{headerShown: false}}/>
                                <Stack.Screen name="ViewPost" component={ViewPost} options={{headerShown: false}}/>
                                <Stack.Screen name="Trending_Pictures_Videos_Feed" component={Trending_Pictures_And_Videos_Feed} options={{headerShown: false}}/>
                                <Stack.Screen name = "contacts" component = {Contacts}/>
                                <Stack.Screen name="ChatWindow" component = {Chat} options={{headerTitle: (props) => <ChatHeader {...props} /> }}/>
                            </Stack.Group>

                            :

                            // If user registration is not complete but account has been made.
                            <Stack.Group initialRouteName="Verify">

                                <Stack.Screen name="Verify" component={Verify} options={{headerShown: false}}/>

                            </Stack.Group>
                        }



                    </Stack.Navigator>

                    :

                    // If user is not logged in.
                    <Stack.Navigator initialRouteName="Welcome">
                        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                    </Stack.Navigator>}
            </NavigationContainer>
        </Provider>
    );
}

export default App;


