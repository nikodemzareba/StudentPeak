import {Image, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";


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
                {/*<Image style={{height: 30, width: 30, borderRadius: 30}} source={{uri: {profilePicture}}}/>*/}
                <Text style={{marginLeft: 10, color: '#000000', fontSize: 15, fontWeight: 'bold'}}>
                    {props.name}
                </Text>
            </View>
            <View>
                {/*<Feather name="more-vertical" color="#000000" size={18}/>*/}
            </View>
        </View>
    )
}