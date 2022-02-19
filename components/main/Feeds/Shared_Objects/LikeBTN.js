import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {Image, TouchableOpacity, View, StyleSheet} from "react-native";
import firebase from "firebase";

import {Octicons} from '@expo/vector-icons';
import {feedStyles} from "./Styles";
import Likes_And_Comments_Count_Txt from "./Likes_Count_Txt";

const styles = StyleSheet.create({
    tvScreenMain: {
        flexDirection: 'row',
        // backgroundColor: "red",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',

        zIndex: 999,
        bottom: 0,
        paddingLeft: 20,
        paddingBottom: 30,
        paddingRight: 10,

        //justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'absolute',
        width: 150,
        height: 40,


        textAlign: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
});


export default function LikeBTN(props) {

    const [likeState, setLikeState] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(props.likesCount);

    const BTN_Event = () => {
        const newState = !likeState;

        if (newState) {

        } else {

        }

        setLikeState(!likeState)
        setCurrentLikes(currentLikes + 1)
    }

    return (

        <View style={feedStyles.likeAndCommentsBTN_View}>
            <TouchableOpacity
                onPress={() => {
                    BTN_Event();
                }}
            >
                {likeState === true
                    ?

                    <Ionicons name="ios-heart-sharp" size={24} color="red"/>

                    :
                    <Octicons name="heart" size={24} color="white"/>
                }
            </TouchableOpacity>
            <Likes_And_Comments_Count_Txt count={currentLikes}/>
        </View>
    )
}


