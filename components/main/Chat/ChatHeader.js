import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {useRoute} from "@react-navigation/native";
import Context from "./context/Context";
import Avatar from "./Avatar";
import firebase from "firebase";

export default function ChatHeader(){
    const route = useRoute();
    const {theme: {colors}} = useContext(Context);
    return(
        <View style={{flexDirection: "row"}}>
            <View>
                <Avatar size={40} user={route.params.user}/>
            </View>
            <View style ={{
                marginLeft: 15,
                alignItems: "center",
                justifyContent: "center"}}>
                <Text style={{color: colors.white }}>{route.params.user.username || route.params.user.displayName}</Text>
            </View>
            <Text>header</Text>
        </View>
    );
}
