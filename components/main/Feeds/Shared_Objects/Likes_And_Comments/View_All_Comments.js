import {Image, Text} from "react-native";
import React from "react";
import View from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedView";

export default function View_All_Comments(props) {
    return (
        <>
            {props.commentsCount > 0
                ?
                <Text style={{marginLeft: 10, color: '#000000', fontSize: 15,}}
                      onPress={() => {
                          console.log(`\n\nGo to Comments Page ${props.commentsCount}`)
                          // props.navigation.navigate("PublicProfile", {uid: props.userID})

                      }
                      }>View All {props.commentsCount} comments
                </Text>
                :
                <Text>

                </Text>
            }
        </>
    )
}