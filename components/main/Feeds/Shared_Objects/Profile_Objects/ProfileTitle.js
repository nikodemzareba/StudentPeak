import {Image, Text, View, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";
import TouchableHighlight from "@gorhom/bottom-sheet";
import Profile_Icon from "./Profile_Icon";
import Username_Link_Txt from "./Username_Link_Txt";


export default function ProfileTitle(props) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 10
        }}>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Profile_Icon  userExists={true} userID={props.userID} width={30} height ={30} borderRadius={30} profileImage={props.profileImage} navigation={props.navigation}/>
                <Username_Link_Txt userExists={true} name={props.name} userID={props.userID} fontSize={15}   fontWeight={'bold'}  navigation={props.navigation} />
            </View>
            <View>
                <Feather name="more-vertical" color="#000000" size={18}/>
            </View>

        </View>
    )
}