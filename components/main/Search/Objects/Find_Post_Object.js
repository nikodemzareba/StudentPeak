import {TouchableOpacity, View, Text, Image} from 'react-native';
import React, {Component, useEffect} from "react";
import firebase from "firebase";
import {getPosts} from "../Functions/getPosts";

export default function Find_Post_Object(props) {



    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
        }}
                          onPress={() => getPosts(props.postTag, props.navigation)}

        >
            <Image
                source={require('../Objects/SearchIcon.png')}
                style={{width: 50, height: 50, marginLeft: 5, marginRight: 15}}
            />

            <Text style={{marginLeft: 10, color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
                {props.postTag}
            </Text>

        </TouchableOpacity>
    )
}


