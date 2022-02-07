import {B} from "./Bold";
import {Text} from "react-native";
import React from "react";


export default function Caption(props) {
return(
    <Text style={{
        marginLeft: 10,
        color: '#000000',
        fontSize: 15,
        fontWeight: 'plain'
    }}><B>{props.name}: </B> "{props.caption}" </Text>
)
}