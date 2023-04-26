import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import matchScreen from "../match"
import ChatScreen from "../top/Chat"
import meetScreen  from '../top/Meet'
import { NavigationContainer } from '@react-navigation/native';

const TopTab = createMaterialTopTabNavigator();

export default function TopBar() {
    return (
        <TopTab.Navigator
            screenOptions={{

                tabBarActiveTintColor: 'grey',
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 40,
                    backgroundColor: 'black',
                    borderRadius: 15,
                    left: 5,
                    right: 5,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                }
            }}>

            <TopTab.Screen name="match" component={matchScreen}
                           options={{
                               tabBarIcon: ({color, size}) => (
                                   //decide what is inside the Icon
                                   <MaterialCommunityIcons name="heart-plus" color={color} size={20}/>
                               ),
                           }}/>

            <TopTab.Screen name="chat" component={ChatScreen}
                           options={{
                               tabBarIcon: ({color, size}) => (
                                   //decide what is inside the Icon
                                   <MaterialCommunityIcons name="wechat" color={color} size={20}/>
                               ),
                           }}/>

            <TopTab.Screen name="meet" component={meetScreen}
                           options={{
                               tabBarIcon: ({color, size}) => (
                                   //decide what is inside the Icon
                                   <MaterialCommunityIcons name="account-supervisor-outline" color={color} size={20}/>
                               ),
                           }}/>

        </TopTab.Navigator>

    )
}