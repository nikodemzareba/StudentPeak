import {Text} from "react-native";
import React from "react";

export default function Likes_Count_Txt(props) {
    return (
        <Text style={{marginLeft: 10, color: '#000000', fontSize: 15, fontWeight: 'bold'}}
              onPress={() => {
                  console.log(`\n\nGo to Likes Count Page`)
                  // props.navigation.navigate("PublicProfile", {uid: props.userID})

              }
              }>
            {props.likesCount} likes
        </Text>
    )
}