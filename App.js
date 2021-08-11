import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ExploreScreen from "./src/screens/ExploreScreen";

import * as firebase from 'firebase';

// Initialise firebase
const firebaseConfig = {
  apiKey: "AIzaSyAEvTx7v-Z10OWeDI4uSlUQVW8ZdBoLnFk",
  authDomain: "studentpeak-8b306.firebaseapp.com",
  projectId: "studentpeak-8b306",
  storageBucket: "studentpeak-8b306.appspot.com",
}

firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Explore: ExploreScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);


