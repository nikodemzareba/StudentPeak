import {feedStyles} from "../Shared_Objects/Styles";
import {Text, View} from "react-native";
import {B} from "../Shared_Objects/Bold";
import React from "react";


export default function Trending_Topics_TXT(props) {

    return(
        <View style={feedStyles.trendingTopics}>

            <View style={feedStyles.trendingNumber}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    <B> #{props.number}</B>
                </Text>
            </View>


            <Text style={{marginLeft: 10, color: 'black', fontSize: 18, fontWeight: 'bold', paddingRight: 10}}>
                <B>{props.text}</B>
            </Text>

        </View>
    )
}