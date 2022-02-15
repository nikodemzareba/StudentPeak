import {Image,  TouchableOpacity} from "react-native";

import React from "react";

export default function Profile_Icon(props) {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("PublicProfile", {uid: props.userID})}>
            <Image style={{height: 30, width: 30, borderRadius: 30}} source={{uri: props.profilePicture}}/>
        </TouchableOpacity>
    )
}