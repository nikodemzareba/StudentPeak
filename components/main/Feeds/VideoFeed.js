import {Dimensions, FlatList, View} from "react-native";
import React, {useState} from "react";
import VideoPlayer from "./VideosFeed/feedControl/components/VideoPlayer";
const {height, width} = Dimensions.get('window');

export default function VideoFeed(props) {

    const [videosOutOfBoundItems, setVideosOutOfBoundItems] = useState(null);

    const renderUserFollowingVideoPosts = ({item}) => {
        return <VideoPlayer
            height={height / 1.6}
            width={width}
            videoUri={item.downloadURL}
            item={item}
            videosOutOfBoundItems={videosOutOfBoundItems}
        />
    }

    const onViewRef = React.useRef((viewableItems)=> {
        console.log(viewableItems)
        // Use viewable items in state or as intended
    })
    
    const handleVideosViewableItemsChanged = ({changed}) => {

        const videosOutOfBoundItems = changed;

        if (videosOutOfBoundItems.length !== 0) {
            setVideosOutOfBoundItems({videosOutOfBoundItems});
        }

    };

    return (
        <View style={{flex: 1}}>
            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{paddingTop: 25}}
                data={props.data}
                renderItem={renderUserFollowingVideoPosts}
                horizontal={false}
                scrollEventThrottle={20}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={{itemVisiblePercentThreshold: 30, waitForInteraction: true}}
                overScrollMode="never"
            />

        </View>
    )
}