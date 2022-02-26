import React, {useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {feedStyles} from "../Shared_Objects/Styles";
import Stories_FlatList from "../Shared_Objects/Stories/Stories_FlatList";
import Pictures_And_Videos_Post_Object from "../Shared_Objects/Pictures_And_Videos_Post_Object";
import {B} from "../Shared_Objects/Bold";
import Trending_Topics_TXT from "./Trending_Feed_Objects/Trending_Topics_TXT";
import {tempPopularTopics} from "../FakeJSONData/Temp_Topics";
import Trending_Topics_FlatList from "./Trending_Feed_Objects/Trending_Topics_FlatList";
import Trending_Posts_FlatList from "./Trending_Feed_Objects/Trending_Posts_FlatList";


export default function Trending_Pictures_And_Videos_Feed(props) {

    const [refresh, setRefresh] = useState(false);
    return (
        <View style={feedStyles.screenBackground}>

            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}>
                <B>Popular Posts</B>
            </Text>


            <Stories_FlatList storyData={props.storyData}/>

            <Trending_Topics_FlatList    navigation={props.navigation} data={tempPopularTopics} />

            <Trending_Posts_FlatList    navigation={props.navigation} data={props.data} text={"Friends Like"} />

            <Trending_Posts_FlatList    navigation={props.navigation} data={props.data} text={"Going Viral"} />


        </View>
    )
}

