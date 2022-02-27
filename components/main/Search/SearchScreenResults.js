import {ScrollView, View, Text} from "react-native";
import React, {useEffect, Component, useState} from 'react'
import {feedStyles} from "../Feeds/Shared_Objects/Styles";

export default function SearchScreenResults(props) {

    if(props.data !== undefined) {
        props.data.foreach((item) => {
            console.log(`\n\n${item.id}`)
        })
    }

    return (
        <ScrollView style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>
            <View style={feedStyles.screenBackground}>
                <View style={{ paddingTop: 10, height: 30}}>
                </View>
           
                <Text style={{color:"white"}}> Results Screen </Text>
            </View>
        </ScrollView>
    )
}