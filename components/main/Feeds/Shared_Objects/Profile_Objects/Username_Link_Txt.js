import {Text} from "react-native";
import React from "react";
import firebase from "firebase";
import {isTextTooLong} from "../Functions_And_Methods/isTextTooLong";

export default function Username_Link_Txt(props) {

    return (
        <Text style={{marginLeft: 10, color: '#FFFFFF', fontSize: props.fontSize, fontWeight: props.fontWeight}}
              onPress={() => {
                  console.log(`\n\nUsername_Link_Txt UserID ${props.userID}`)

                  if (props.userID === firebase.auth().currentUser.uid) {
                      props.navigation.navigate("PrivateProfile");
                      return;
                  }
                  else if (props.userExists) {
                      props.navigation.navigate("PublicProfile", {uid: props.userID})
                      return;
                  }

                  console.log(`\n\nUsername_Link_Txt() ${props.userID} doesn't exist to navigate to this profilePage`)

              }
              }>{props.name}</Text>
    )
}