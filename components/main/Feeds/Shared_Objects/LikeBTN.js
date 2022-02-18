import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {Image, TouchableOpacity, View} from "react-native";
import firebase from "firebase";
import Likes_Count_Txt from "./Likes_Count_Txt";


export default function LikeBTN(props) {

    const [likeState, setLikeState] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(0);

    const BTN_Event = () => {
        const newState = !likeState;

        if (newState) {

        } else {

        }

        setLikeState(!likeState)
        setCurrentLikes(currentLikes+1)


    }

    return (
        <View style={{
            flexDirection: 'row',
            width:60,
            height: 50,

            zIndex: 999,
            bottom: 0,
            paddingLeft: 20,
            paddingBottom: 30,
            paddingRight: 10,

            justifyContent: 'space-between',
           // alignItems: 'flex-end'
            alignItems: 'flex-start',
            position: 'absolute',

        }}
        >
            <TouchableOpacity
                onPress={() => {
                    BTN_Event();
                }}
            >
                {likeState === true
                    ?

                    <Ionicons name="ios-heart-sharp" size={24} color="red"/>

                    :
                    <Ionicons name="ios-heart-outline" size={24} color="black"/>
                }
            </TouchableOpacity>
            <Likes_Count_Txt likesCount={currentLikes}/>
        </View>
    )
}
