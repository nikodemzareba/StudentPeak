import {TouchableOpacity, View, Text, Image} from 'react-native';
import React, {Component} from "react";
import firebase from "firebase";

export default function Find_Post_Object(props) {

    const checkIfThereAreAnyPosts =() =>{
        firebase.firestore()
            .collection('postTags')
            .doc(props.postTag)
            .get()
            .then((postTag) =>{

                if(postTag.get("numberOfPosts") > 0)
                {
                    props.navigation.navigate("SearchScreenResults", {postTag: props.postTag, navigation: props.navigation})

                }
                else {
                    alert(`Sorry, the tag ${props.postTag} has no results`);
                }
            })

    }

    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
        }}

                          onPress={checkIfThereAreAnyPosts}
        >
            <Image
                source={require('../Objects/SearchIcon.png')}
                style={{width: 50, height: 50, marginLeft: 5, marginRight: 15}}
            />

            <Text style={{marginLeft: 10, color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
                {props.postTag}
            </Text>

        </TouchableOpacity>
    )
}

