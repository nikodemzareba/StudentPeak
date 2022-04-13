import {Image, TouchableOpacity} from "react-native";
import React from "react";

export default function Chat_BTN(props) {

    return (
        // Chat BTN
        <TouchableOpacity onPress={() =>
            console.log("\n\nChatBTN Clicked")
            // props.navigation.navigate("Chat")
        }>
            <Image
                source={require('../System_Images/Chat_Nav_Icon2.png')}
                style={{width: 40, height: 40, marginLeft: 15}}
            />
        </TouchableOpacity>
    )
}