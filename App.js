import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ExploreScreen from "./src/screens/ExploreScreen";

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

// Comment
