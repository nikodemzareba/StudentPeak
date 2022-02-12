import React, { Component } from "react";
import {View, Text, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from "./main/Feeds/Feed"
import Add from "./main/Add"
import SearchScreen from "./main/Search"
import EventScreen from "./main/Events"
import PublicProfileScreen from "./main/PublicProfile"
import PrivateProfileScreen from "./main/PrivateProfile"
import Match from "./main/match";

import {connect} from 'react-redux'
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts, fetchUserFollowing } from "../redux/actions/index";
import Modal from "./main/Feeds/Shared_Objects/modal";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

 
 export class Main extends Component{
    componentDidMount(){
        //first page called whenever a user is logged in
      this.props.fetchUser();
      this.props.fetchUserPosts();
      this.props.fetchUserFollowing();
    }
    render(){
        return(
            <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'grey',
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarStyle: {
                  height: 78,
                  backgroundColor: 'black',
                  borderRadius: 15,
                  left: 5,
                  right: 5,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }
              }}
              
            >
                
            <Tab.Screen name="Feed" component={FeedScreen}
                        tabBar={() => <Modal />}

            options={{
                headerRight: () => (
                    <Button
                        title="Setting"
                        onPress={() => alert('ProfileScreenEdit')}
                        backgroundColor="rgba(0,0,0,0)"
                        color="rgba(0,122,255,1)"
                    />
                ),
                tabBarIcon: ({color, size}) => (
                    //decide what is inside the Icon
                    <MaterialCommunityIcons name="school" color={color} size={26}/>
                ),
            }}/> 
            <Tab.Screen name="Search" component={SearchScreen} navigation = {this.props.naviagtion}
            options={{
                tabBarIcon: ({color, size}) => (
                    //decide what is inside the Icon
                    <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                ),
            }}/>
             <Tab.Screen name="Add" component={Add}
            options={{
                tabBarIcon: ({color, size}) => (
                    //decide what is inside the Icon
                    <MaterialCommunityIcons name="camera" color={color} size={26}/>
                ),
            }}/>
             <Tab.Screen name="Match" component={Match}
            options={{
                tabBarIcon: ({color, size}) => (
                    //decide what is inside the Icon
                    <MaterialCommunityIcons name="fire" color={color} size={26}/>
                ),
            }}/>
             <Tab.Screen name="Events" component={EventScreen}
            options={{
                tabBarIcon: ({color, size}) => (
                    //decide what is inside the Icon
                    <MaterialCommunityIcons name="calendar-search" color={color} size={26}/>
                ),
            }}/>
            <Tab.Screen name ="PrivateProfile" component= {PrivateProfileScreen} 
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("PrivateProfile", {uid: firebase.auth().currentUser.uid})
                    }})}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),
                    }} />
                     <Tab.Screen name ="PublicProfile" component= {PublicProfileScreen}

                     options={() => ({
                        tabBarButton: () => null,
                        tabBarVisible:false 
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