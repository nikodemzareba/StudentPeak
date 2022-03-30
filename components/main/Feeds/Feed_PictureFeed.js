import { FlatList,   View} from "react-native";

import React, {useState} from "react";

import {feedStyles} from "./Shared_Objects/Styles";

import Pictures_And_Videos_Post_Object from "./Shared_Objects/Pictures_And_Videos_Post_Object";
import Stories_FlatList from "./Shared_Objects/Stories/Stories_FlatList";

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

export default function Feed_PictureFeed(props) {

    const [refresh, setRefresh] = useState(false);
    return (
        <View style={feedStyles.screenBackground}>

            <Stories_FlatList   storyData={props.storyData} />

            {/*Picture Feed Posts */}
            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{paddingTop: 25}}
                data={props.data}
                horizontal={false}
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
