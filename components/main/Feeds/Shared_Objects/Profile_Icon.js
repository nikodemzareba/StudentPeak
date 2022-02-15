import {Image,  TouchableOpacity} from "react-native";

import React from "react";

export default function Profile_Icon(props) {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("PublicProfile", {uid: props.userID})}>
            <Image style={{height: props.height, width: props.width, borderRadius: props.borderRadius}} source={{uri: props.profilePicture}}/>
        </TouchableOpacity>
    )
}