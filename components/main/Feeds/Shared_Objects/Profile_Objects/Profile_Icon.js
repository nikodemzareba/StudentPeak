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
            if(props.userExists)
            {
                props.navigation.navigate("PublicProfile", {uid: props.userID})
                return;
            }

            console.log(`\n\nProfile_Icon() ${props.userID} doesn't exist to navigate to this profilePage`)


        }} >
            {props.profileImage !== "" ?

                <Image
                    style={{height: props.height, width: props.width, borderRadius: props.borderRadius}}
                    source={{uri: props.profileImage}}
                />

            :
                <Image
                    style={{height: props.height, width: props.width, borderRadius: props.borderRadius}}
                    source={require('./Profile_Image_Icon.png')}
                />
            }

        </TouchableOpacity>
    )
}