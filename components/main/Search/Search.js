import React, {useState} from 'react'
import {View, Text, TextInput, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import Topbar from '../top/Topbar';
import {connect} from 'redux';


//import from firebase
import firebase from 'firebase';
import {B} from "../Feeds/Shared_Objects/Bold";
import {feedStyles} from "../Feeds/Shared_Objects/Styles";
import ProfileIcon_And_Username from "../Feeds/Shared_Objects/Profile_Objects/ProfileIcon_And_Username";
import Find_Post_Object from './Objects/Find_Post_Object';

require('firebase/firestore');


export default function Search(props) {
    const [users, setUsers] = useState([])
    const [tags, setTags] = useState([])


    const fetchData = (search) => {
        let usersData = [];
        let tagsData = [];

        firebase.firestore()
            .collection('users')
            .where('username', '>=', search)
            .get()
            .then((snapshot) => {

                snapshot.forEach((userDetails) => {

                    const userID = userDetails.id;
                    const username = userDetails.get("username");
                    const profileImage = userDetails.get("profileimage");

                    usersData.push({
                        key: userID,
                        username: username,
                        profileImage: profileImage,
                    });

                })

            })
            .catch((exception) => {
                console.log(`\n\n############################################\nSearch() Cannot retrieve users from DB \n${exception}`)
            })
            .then(() => {
                firebase.firestore()
                    .collection('postTags')
                    .where(firebase.firestore.FieldPath.documentId(), '>=', search)
                    .get()
                    .then((postTags) => {

                        const expectedResults = postTags !== undefined? postTags.size: 0;
                        let count = 0;

                        console.log(`\n\nSearch Icon Results size ${postTags.size}`)
                        postTags.forEach((postTag) => {

                            count++;

                            console.log(`${count} Tag ID ${postTag.id}`)
                            tagsData.push({
                                 key: postTag.id
                            });

                            if (expectedResults === count) {
                                setTags(tagsData);
                                setUsers(usersData);
                            }
                        })

                        if (expectedResults === 0) {
                            setTags(tagsData);
                            setUsers(usersData);
                        }

                    })
                    .catch((exception) => {
                        console.log(`\n\nSearch() Cannot retrieve tags from DB \n${exception}`)
                    })

            })
    }


    return (
        <ScrollView style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>
            <View style={feedStyles.screenBackground}>
                <View style={{paddingTop: 10, height: 30}}>
                </View>

                <View style={{backgroundColor: "white", justifyContent: "center", height: 50}}>
                    <TextInput
                        placeholder="Search" onChangeText={(search) => {
                        if(search!==undefined ||search !== "")
                        {
                            fetchData(search)
                        }
                    }}
                    />
                </View>


                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={tags}
                    contentContainerStyle={{paddingTop: 25}}
                    renderItem={({item}) => {

                        return (
                            <Find_Post_Object
                                postTag={item.key}
                                navigation={props.navigation}
                            />


                        )
                    }}
                />


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
                                userExists={true}
                            />


                        )
                    }}
                />

            </View>

        </ScrollView>

    )


}