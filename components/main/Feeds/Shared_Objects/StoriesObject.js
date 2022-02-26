import {View} from "react-native";
import Profile_Icon from "./Profile_Objects/Profile_Icon";
import Username_Link_Txt from "./Profile_Objects/Username_Link_Txt";
import {isUserNameTooLong} from "./Functions_And_Methods/isUserNameTooLong";
import React from "react";
import {feedStyles} from "./Styles";

export default function StoriesObject(props) {
    
    
    return(
        <View style={feedStyles.stories}>
            <Profile_Icon
                userID={props.userID}
                profileImage={props.profileImage}
                width={props.width}
                height={props.height}
                borderRadius={props.borderRadius}
                navigation={props.navigation}

            />

            <Username_Link_Txt
                name={isUserNameTooLong(props.username, props.maxUsernameLength)}
                userID={props.userID}
                fontSize={props.fontSize}
                fontWeight={'normal'}
                navigation={props.navigation}
            />

        </View>
    )

}