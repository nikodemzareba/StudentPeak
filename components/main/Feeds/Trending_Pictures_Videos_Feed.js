import React, {useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {feedStyles} from "./Shared_Objects/Styles";
import Stories_FlatList from "./Shared_Objects/Stories/Stories_FlatList";
import Pictures_And_Videos_Post_Object from "./Shared_Objects/Pictures_And_Videos_Post_Object";
import {B} from "./Shared_Objects/Bold";
import Trending_Topics_TXT from "./Trending_Feed/Trending_Topics_TXT";
import {tempPopularTopics} from "./FakeJSONData/Temp_Topics";
import Trending_Topics_FlatList from "./Trending_Feed/Trending_Topics_FlatList";


export default function Trending_Pictures_Videos_Feed(props) {

    const [refresh, setRefresh] = useState(false);
    return (
        <View style={feedStyles.screenBackground}>

            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}>
                <B>Popular Posts</B>
            </Text>


            <Stories_FlatList storyData={props.storyData}/>


            <Trending_Topics_FlatList data={tempPopularTopics} />






            {/*Picture Feed Posts */}
            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{paddingTop: 25}}
                data={props.data}
                horizontal={true}
                scrollEventThrottle={20}
                showsVerticalScrollIndicator={false}
                viewabilityConfig={{itemVisiblePercentThreshold: 30, waitForInteraction: true}}
                overScrollMode="never"
                extraData={refresh}
                renderItem={({item}) => {
                    return (

                        <Pictures_And_Videos_Post_Object
                            name={item.name}
                            profileImage={item.profile}
                            userID={item.userID}
                            navigation={props.navigation}
                            downloadURL={item.downloadURL}
                            mediaType={item.mediaType}

                            postID={item.key}
                            commentsCount={item.commentsCount}
                        />

                    )
                }}
            />
        </View>
    )
}

