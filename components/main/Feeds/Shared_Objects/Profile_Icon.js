import {Button, Image, TouchableOpacity, View} from "react-native";

import React from "react";
import firebase from "firebase";

export default function Profile_Icon(props) {
    return (
        <TouchableOpacity onPress={() =>{

            if(props.userID === firebase.auth().currentUser.uid )
            {
                props.navigation.navigate("PrivateProfile");
                return;
            }

            props.navigation.navigate("PublicProfile", {uid: props.userID})


        }} >
            <Image style={{height: props.height, width: props.width, borderRadius: props.borderRadius}} source={{uri: props.profileImage}}/>
        </TouchableOpacity>
    )
}