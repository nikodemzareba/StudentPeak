import {B} from "./Bold";
import {Text, View} from "react-native";
import React from "react";
import Username_Link_Txt from "./Username_Link_Txt";


export default function Caption(props) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Username_Link_Txt name={props.name} userID={props.userID} navigation={props.navigation} />

            <Text style={{
                marginLeft: 10,
                color: '#000000',
                fontSize: 15,
                fontWeight: 'normal'
            }}
                  onPress={() => {
                      console.log(`\n\nGo to Comments Screen`)

                  }}
            >
                "{props.caption}"
            </Text>


        </View>


    )
}