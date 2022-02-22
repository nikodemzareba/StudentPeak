import {View} from "react-native";
import Profile_Icon from "./Shared_Objects/Profile_Icon";
import Username_Link_Txt from "./Shared_Objects/Username_Link_Txt";
import {isUserNameTooLong} from "./Shared_Objects/FunctionsAndMethods/isUserNameTooLong";
import React from "react";

export default function ProfileIcon_And_Username(props) {

    return(
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,


        }}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingRight:40}}>
                <Profile_Icon userID={props.userID} width={50} height={50} borderRadius={50}
                              profileImage={props.profileImage} navigation={props.navigation}/>
            </View>
            <View style={{alignItems: 'flex-start'}}>
                <Username_Link_Txt
                    name={isUserNameTooLong(props.name, 28)}
                    userID={props.key}
                    fontSize={15}
                    fontWeight={'bold'} navigation={props.navigation}
                />
            </View>

        </View>
    )

}