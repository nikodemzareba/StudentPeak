import {FlatList, Text, View} from "react-native";
import {feedStyles} from "../../Shared_Objects/Styles";
import {B} from "../../Shared_Objects/Bold";
import React from "react";
import StoriesObject from "../../Shared_Objects/Stories/StoriesObject";
import Trending_Topics_TXT from "./Trending_Topics_TXT";


export default function Trending_Topics_FlatList(props) {


    return (
        <View>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}>
                <B>Trending Topics</B>
            </Text>

            <FlatList
                showsHorizontalScrollIndicator={false}
                data={props.data}
                horizontal

                contentContainerStyle={{

                    justifyContent: 'space-between'

                }}
                ItemSeparatorComponent={
                    () => <View style={{width: 16}}/>
                }
                renderItem={({item}) => {
                    return (
                        <Trending_Topics_TXT navigation={props.navigation} number={item.key} text={item.topic}/>
                    )
                }}
            />
        </View>


    )
}