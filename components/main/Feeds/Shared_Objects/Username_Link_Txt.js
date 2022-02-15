import {Text} from "react-native";
import React from "react";

export default function Username_Link_Txt(props) {
    return (
        <Text style={{marginLeft: 10, color: '#000000', fontSize: props.fontSize, fontWeight: props.fontWeight}}
              onPress={() => {
                  console.log(`\n\nUsername_Link_Txt UserID ${props.userID}`)
                  props.navigation.navigate("PublicProfile", {uid: props.userID})
              }
              }>{props.name}</Text>
    )
}