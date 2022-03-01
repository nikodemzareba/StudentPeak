import {feedStyles} from "../../Shared_Objects/Styles";
import {Text, TouchableOpacity, View} from "react-native";
import {B} from "../../Shared_Objects/Bold";
import React from "react";
import firebase from "firebase";


export default function Trending_Topics_TXT(props) {

    const checkIfThereAreAnyPosts =() =>{
        firebase.firestore()
            .collection('postTags')
            .doc(props.text)
            .get()
            .then((postTag) =>{

                if(postTag.get("numberOfPosts") > 0)
                {
                    props.navigation.navigate("SearchScreenResults", {postTag: props.text})
                    return
                }
                alert(`Sorry, the tag ${props.text} has no results`);
            })

    }
    return(
        <TouchableOpacity style={feedStyles.trendingTopics} onPress={checkIfThereAreAnyPosts}>

            <TouchableOpacity style={feedStyles.trendingNumber}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    <B> #{props.number}</B>
                </Text>
            </TouchableOpacity>


            <Text style={{marginLeft: 10, color: 'black', fontSize: 18, fontWeight: 'bold', paddingRight: 10}}>
                <B>{props.text}</B>
            </Text>

        </TouchableOpacity>
    )
}