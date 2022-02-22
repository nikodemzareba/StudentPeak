import React, {useState} from 'react'
import {View, Text, TextInput, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import Topbar from './top/Topbar';
import {connect} from 'redux';


//import from firebase
import firebase from 'firebase';
import {B} from "./Feeds/Shared_Objects/Bold";
import {feedStyles} from "./Feeds/Shared_Objects/Styles";
import ProfileIcon_And_Username from "./Feeds/ProfileIcon_And_Username";

require('firebase/firestore');


export default function Search(props) {
    const [users, setUsers] = useState([])
    console.log("\n\nheheree ")

    const fetchUsers = (search) => {
        let tempData = [];
        firebase.firestore()
            .collection('users')
            .where('username', '>=', search)
            .get()
            .then((snapshot) => {

                snapshot.forEach((userDetails) => {

                    const userID = userDetails.id;
                    const username = userDetails.get("username");
                    const profileImage = userDetails.get("profileimage");

                    tempData.push({
                        key: userID,
                        username: username,
                        profileImage: profileImage,
                    });

                })

                setUsers(tempData);
            })
    }
    return (
        <ScrollView style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>
            <View style={feedStyles.screenBackground}>
                <View style={{ paddingTop: 10, height: 30}}>
                </View>

                <View style={{backgroundColor: "white",  justifyContent:"center", height: 50}}>
                    <TextInput
                        placeholder="Search" onChangeText={(search) => fetchUsers(search)}
                    />
                </View>

                {/*
                     Add another flatlist for searching


               */}
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={users}
                    contentContainerStyle={{paddingTop: 25}}
                    renderItem={({item}) => {

                        return (
                            <ProfileIcon_And_Username
                                name={item.username}
                                userID={item.key}
                                profileImage={item.profileImage}
                                navigation={props.navigation}
                            />
                        )
                    }}
                />
            </View>

        </ScrollView>

    )
}

