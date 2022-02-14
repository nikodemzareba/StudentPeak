import {Image, Text, View, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";
import TouchableHighlight from "@gorhom/bottom-sheet";


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
                <TouchableOpacity onPress={() => props.navigation.navigate("PublicProfile", {uid: props.userID})}>
                    <Image style={{height: 30, width: 30, borderRadius: 30}} source={{uri: props.profilePicture}}/>
                </TouchableOpacity>
                <Text style={{marginLeft: 10, color: '#000000', fontSize: 15, fontWeight: 'bold'}}
                      onPress={() => {
                          console.log(`\n\n${props.userID}`)
                          props.navigation.navigate("PublicProfile", {uid: props.userID})
                      }
                      }>
                    {props.name}
                </Text>
            </View>
            <View>
                <Feather name="more-vertical" color="#000000" size={18}/>
            </View>

        </View>
    )
}