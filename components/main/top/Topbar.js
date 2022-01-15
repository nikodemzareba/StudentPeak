import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import matchScreen from "../match"
import ChatScreen from "../top/Chat"
import meetScreen  from '../top/Meet'
import { NavigationContainer } from '@react-navigation/native';

const Toptab = createMaterialTopTabNavigator();

export default function Topbar() {
    return (
        <Toptab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'grey',
                tabBarInactiveTintColor: 'white',
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

            <Toptab.Screen name="match" component={matchScreen}
                           options={{
                               tabBarIcon: ({color, size}) => (
                                   //decide what is inside the Icon
                                   <MaterialCommunityIcons name="heart-plus" color={color} size={20}/>
                               ),
                           }}/>

            <Toptab.Screen name="chat" component={ChatScreen}
                           options={{
                               tabBarIcon: ({color, size}) => (
                                   //decide what is inside the Icon
                                   <MaterialCommunityIcons name="wechat" color={color} size={20}/>
                               ),
                           }}/>

            <Toptab.Screen name="meet" component={meetScreen}
                           options={{
                               tabBarIcon: ({color, size}) => (
                                   //decide what is inside the Icon
                                   <MaterialCommunityIcons name="account-supervisor-outline" color={color} size={20}/>
                               ),
                           }}/>

        </Toptab.Navigator>

    )
}