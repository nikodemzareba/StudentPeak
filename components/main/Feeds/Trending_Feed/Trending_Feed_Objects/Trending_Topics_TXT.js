import {feedStyles} from "../../Shared_Objects/Styles";
import {Text, TouchableOpacity, View} from "react-native";
import {B} from "../../Shared_Objects/Bold";
import React from "react";
import firebase from "firebase";
import {getPosts} from "../../../Search/Functions/getPosts";
import Topic_Object from "./Topic_Object";


export default function Trending_Topics_TXT(props) {

    const checkIfThereAreAnyPosts = () => {
        firebase.firestore()
            .collection('postTags')
            .doc(props.text)
            .get()
            .then((postTag) => {

                if (postTag.get("numberOfPosts") > 0) {
                    // props.navigation.navigate("SearchScreenResults", {postTag: props.text, navigation: props.navigation})
                    getPosts(props.text, props.navigation)
                    return
                }
                alert(`Sorry, the tag ${props.text} has no results`);
            })

    }
    return (
        <TouchableOpacity
                          onPress={() => {
                              console.log(`\n\nTrending_Topics_TXT() pressed`)
                              checkIfThereAreAnyPosts()
                          }}
        >

            <Topic_Object
                number={` #${props.number}`}
                text={props.text}

                txtColor={"black"}
                backgroundColor={"white"}
                circleBackground={"black"}
                circleTxtColor={"white"}

            />

        </TouchableOpacity>
    )
}