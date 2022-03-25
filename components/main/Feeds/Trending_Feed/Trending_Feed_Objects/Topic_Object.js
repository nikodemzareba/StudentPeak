import {feedStyles} from "../../Shared_Objects/Styles";
import {Text, View} from "react-native";
import {B} from "../../Shared_Objects/Bold";
import React from "react";


export default function Topic_Object(props)
{
    return(
        <View style={feedStyles.trendingTopics((props.backgroundColor))}>
                          

            <View style={feedStyles.trendingNumber((props.circleBackground))}>
                <Text style={{color: props.circleTxtColor, fontSize: 20, fontWeight: 'bold'}}>
                    <B>{props.number}</B>
                </Text>
            </View>


            <Text style={{marginLeft: 10, color: props.txtColor, fontSize: 18, fontWeight: 'bold', paddingRight: 10}}>
                <B> {props.text}</B>
            </Text>

        </View>
    )
}