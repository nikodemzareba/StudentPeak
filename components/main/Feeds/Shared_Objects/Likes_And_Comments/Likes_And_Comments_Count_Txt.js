import {Text} from "react-native";
import React from "react";
import {B} from "../Bold";

export default function Likes_And_Comments_Count_Txt(props) {
    return (
        <Text style={{marginLeft: 10, color: 'white', fontSize: 15, fontWeight: 'bold'}}
              onPress={() => {
                  console.log(`\n\nGo to Likes Count Page`)
                  // props.navigation.navigate("PublicProfile", {uid: props.userID})

              }
              }>
           <B>{props.count}</B></Text>
    )
}