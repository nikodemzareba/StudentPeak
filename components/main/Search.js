import React, {useState} from 'react'
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native'
import Topbar from './top/Topbar';
import {connect} from 'redux';


//import from firebase
import firebase from 'firebase';
import {B} from "./Feeds/Shared_Objects/Bold";

require('firebase/firestore');


export default function Search(props) {
    const [users, setUsers] = useState([])
    console.log("\n\nheheree ")

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('username', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data}
                });
                setUsers(users);
            })
    }
    return (

        <View style={{paddingTop:50}}>
            <TextInput
                placeholder="Search" onChangeText={(search) => fetchUsers(search)}/>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => props.route.params.navigation.navigate("PublicProfile", {uid: item.id})}>
                        < Text>{item.username}</Text>
                    </TouchableOpacity>

                )}
            />
        </View>

    )
}

