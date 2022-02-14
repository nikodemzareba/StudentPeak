import React, {Component} from "react";
import {View, Text, Button, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FeedScreen from "./main/Feeds/Feed"
import Add from "./main/Add"
import SearchScreen from "./main/Search"
import EventScreen from "./main/Events_Screen/Events"
import PublicProfileScreen from "./main/PublicProfile"
import PrivateProfileScreen from "./main/PrivateProfile"
import Match from "./main/match";
import Chat from "./main/Chat";

import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {fetchUser, fetchUserPosts, fetchUserFollowing} from "../redux/actions/index";
import Modal from "./main/Feeds/Shared_Objects/modal";
import VideoFeed from "./main/Feeds/VideoFeed";
import {users} from "../redux/reducers/users";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();


export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePictureLoaded: false,
            profilePicture: "",
            userId: firebase.auth().currentUser.uid
        };
    }


    componentDidMount() {
        //first page called whenever a user is logged in
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
        this.getProfileImage()
    }

    getProfileImage()
    {
        firebase.firestore()
            .collection('users')
            .doc(this.state.userId)
            .get()
            .then(userDetails => {
                console.log(`\n\nUserID: ${firebase.auth().currentUser.uid} \nProfile Image URL: ${userDetails.get("profileimage")}`)
                if(userDetails.get("profileimage") !== "" )
                {
                    console.log(`\n\n Has Profile Image`);

                    this.setState({
                    profilePicture: userDetails.get("profileimage"),
                    profilePictureLoaded: true,
                });}
            })
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
                        borderRadius: 15,
                        left: 5,
                        right: 5,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    }
                }}

            >

                <Tab.Screen name="Feed" component={FeedScreen} initialParams={{ navigation: this.props.navigation}}
                            tabBar={() => <Modal/>}

                            options={{
                                headerLeft: () => (
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PrivateProfile")}>
                                        {this.state.profilePictureLoaded
                                            ?
                                            <Image
                                                source={{uri: `${this.state.profilePicture}`}}
                                                style={{width: 40, height: 40, borderRadius: 40 / 2, marginLeft: 15}}
                                            />
                                            :
                                            <Image
                                                source={require('./System_Images/Profile_Image_Icon.png')}
                                                style={{width: 40, height: 40, borderRadius: 40 / 2, marginLeft: 15}}
                                            />
                                        }
                                    </TouchableOpacity>
                                ),
                                headerRight: () => (
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat")}>
                                        <Image
                                            source={require('./System_Images/Chat_Nav_Icon.png')}
                                            style={{width: 40, height: 40, borderRadius: 40 / 2, marginLeft: 15}}
                                        />
                                    </TouchableOpacity>
                                ),
                                tabBarIcon: ({color, size}) => (
                                    //decide what is inside the Icon
                                    <MaterialCommunityIcons name="school" color={color} size={26}/>
                                ),
                            }}
                />
                <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
                            options={{
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
                <Tab.Screen name="PrivateProfile" component={PrivateProfileScreen}
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
                <Tab.Screen name="PublicProfile" component={PublicProfileScreen}
                            options={() => ({
                                tabBarButton: () => null,
                                tabBarVisible: false
                            })}
                />
                <Tab.Screen name="Chat" component={Chat}
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