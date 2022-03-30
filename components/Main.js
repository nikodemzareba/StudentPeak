import React, {Component} from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FeedScreen from "./main/Feeds/Feed"
import Add from "./main/Add"
import Search from "./main/Search/Search"
import EventScreen from "./main/Events_Screen/Events"
import PublicProfileScreen from "./main/PublicProfile"
import PrivateProfileScreen from "./main/PrivateProfile"
import Match from "./main/match";
import TrendingFeeds from "./main/Feeds/TrendingFeeds";
import ChatList from "./main/Chat/ChatList"


import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {fetchUser, fetchUserPosts, fetchUserFollowing} from "../redux/actions/index";
import {users} from "../redux/reducers/users";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

import {LogBox} from 'react-native';
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";

LogBox.ignoreLogs(['Setting a timer']);

export class Main extends Component {


    componentDidMount() {
        //first page called whenever a user is logged in
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }

    render() {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'grey',
                    tabBarInactiveTintColor: 'white',
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: 78,
                        backgroundColor: 'black',
                    }
                }}

            >

                <Tab.Screen name="Feed" component={FeedScreen} initialParams={{navigation: this.props.navigation}}

                            options={{
                                header: () => null,
                                tabBarVisible: false,


                                tabBarIcon: ({color, size}) => (
                                    //decide what is inside the Icon
                                    <MaterialCommunityIcons name="school" color={color} size={26}/>
                                ),
                            }}
                />
                <Tab.Screen name="TrendingFeeds" component={TrendingFeeds} initialParams={{navigation: this.props.navigation}}
                            options={{
                                header: () => null,
                                tabBarVisible: false,

                                tabBarIcon: ({color, size}) => (
                                    //decide what is inside the Icon
                                    <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                                ),
                            }}
                />

                <Tab.Screen name="Add" component={Add}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    //decide what is inside the Icon
                                    <MaterialCommunityIcons name="camera" color={color} size={26}/>
                                ),
                            }}
                />
                <Tab.Screen name="Match" component={Match}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    //decide what is inside the Icon
                                    <MaterialCommunityIcons name="fire" color={color} size={26}/>
                                ),
                            }}
                />
                <Tab.Screen name="Events" component={EventScreen}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    //decide what is inside the Icon
                                    <MaterialCommunityIcons name="calendar-search" color={color} size={26}/>
                                ),
                            }}
                />
                <Tab.Screen name="PrivateProfile" component={PrivateProfileScreen} initialParams={{navigation: this.props.navigation}}
                            listeners={({navigation}) => ({
                                tabPress: event => {
                                    event.preventDefault();
                                    navigation.navigate("PrivateProfile", {uid: firebase.auth().currentUser.uid})
                                }
                            })}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                                ),
                            }}
                />
                <Tab.Screen name="PublicProfile" component={PublicProfileScreen} initialParams={{navigation: this.props.navigation}}
                            options={() => ({
                                tabBarButton: () => null,
                                tabBarVisible: false
                            })}
                />
                <Tab.Screen name="Chat" component={ChatList}
                            options={() => ({
                                tabBarButton: () => null,
                                tabBarVisible: false
                            })}
                />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);