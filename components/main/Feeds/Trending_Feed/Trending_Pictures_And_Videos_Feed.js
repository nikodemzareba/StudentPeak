import React, {useEffect, useState} from "react";
import { Text, View} from "react-native";
import {feedStyles} from "../Shared_Objects/Styles";
import Stories_FlatList from "../Shared_Objects/Stories/Stories_FlatList";

import {B} from "../Shared_Objects/Bold";

import Trending_Topics_FlatList from "./Trending_Feed_Objects/Trending_Topics_FlatList";
import Trending_Posts_FlatList from "./Trending_Feed_Objects/Trending_Posts_FlatList";



export default function Trending_Pictures_And_Videos_Feed(props) {

    return (

        <View style={feedStyles.screenBackground}>

            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}>
                <B>Popular Posts</B>
            </Text>

            <Stories_FlatList storyData={props.storyData}/>

            <Trending_Topics_FlatList navigation={props.navigation} data={props.trendingTopics}/>

            <Trending_Posts_FlatList navigation={props.navigation} data={props.friendsLikedPostsData}
                                     text={"Friends Like"}/>

            <Trending_Posts_FlatList navigation={props.navigation} data={props.popularPosts} text={"Going Viral"}/>

        </View>
    )
}

