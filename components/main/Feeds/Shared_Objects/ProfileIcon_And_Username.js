import {TouchableOpacity, View} from "react-native";
import Profile_Icon from "./Profile_Icon";
import Username_Link_Txt from "./Username_Link_Txt";
import {isUserNameTooLong} from "./FunctionsAndMethods/isUserNameTooLong";
import React from "react";
import firebase from "firebase";

export default function ProfileIcon_And_Username(props) {

    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
        }}

                          onPress={() => {
                              console.log(`\n\nProfileIcon_And_Username ${props.userID}`)

                              if (props.userID === firebase.auth().currentUser.uid) {
                                  props.navigation.navigate("PrivateProfile");
                                  return;
                              }
                              props.navigation.navigate("PublicProfile", {uid: props.userID})
                          }
                          }
        >
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingRight: 40}}>
                <Profile_Icon userID={props.userID} width={50} height={50} borderRadius={50}
                              profileImage={props.profileImage} navigation={props.navigation}/>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'flex-start'}}>
                <Username_Link_Txt
                    name={isUserNameTooLong(props.name, 28)}
                    userID={props.userID}
                    fontSize={15}
                    fontWeight={'bold'} navigation={props.navigation}
                />
            </TouchableOpacity>

        </TouchableOpacity>
    )

}