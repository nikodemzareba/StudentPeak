import React, { Component } from "react";
import { View, Text  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from "./main/Feed"
import Add3 from "./main/Add3"
import TopicScreen from "./main/Topic"
import SearchScreen from "./main/Search"
import EventScreen from "./main/Events"

import {connect} from 'react-redux'
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts } from "../redux/actions/index";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

 
export class Main extends Component{
    componentDidMount(){
        //first page called whenever a user is logged in
      this.props.fetchUser();
      this.props.fetchUserPosts();
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
            options={{
                tabBarIcon: ({color, size}) => (
                    //decide what is inside the Icon
                    <MaterialCommunityIcons name="school" color={color} size={26}/>
                ),
            }}/> 
            <Tab.Screen name="Search" component={SearchScreen}
            options={{
                tabBarIcon: ({color, size}) => (
                    //decide what is inside the Icon
                    <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                ),
            }}/>
             <Tab.Screen name="Add3" component={Add3}
            options={{
                tabBarIcon: ({color, size}) => (
                    //decide what is inside the Icon
                    <MaterialCommunityIcons name="camera" color={color} size={26}/>
                ),
            }}/>
             <Tab.Screen name="Topic" component={TopicScreen}
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
            </Tab.Navigator>
        )
    }
    
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts}, dispatch)

export default connect(null, mapDispatchProps)(Main);