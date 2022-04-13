import {FlatList, Text, View} from "react-native";
import {feedStyles} from "../../Shared_Objects/Styles";
import {B} from "../../Shared_Objects/Bold";
import React from "react";
import StoriesObject from "../../Shared_Objects/Stories/StoriesObject";
import Trending_Topics_TXT from "./Trending_Topics_TXT";


export default function Trending_Topics_FlatList(props) {


    return (
        <View style={{padding: 15}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                <B>Trending Topics:</B>
            </Text>

            {Object.keys(props.data).length === 0 ?
                <View style={[feedStyles.trendingTopics(("black")), {width:50, borderColor: "red", borderWidth: 2}]}>
                </View>
                :
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
                            <Trending_Topics_TXT
                                navigation={props.navigation}
                                number={item.key}
                                text={item.topic}
                            />
                        )
                    }}
                />
            }
        </View>


    )
}