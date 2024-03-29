import {Button, Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React, {useState} from "react";
import {feedStyles} from "./Shared_Objects/Styles";
import Pictures_And_Videos_Post_Object from "./Shared_Objects/Pictures_And_Videos_Post_Object";
import StoriesObject from "./Shared_Objects/Stories/StoriesObject";

const {height, width} = Dimensions.get('window');


export default function PictureFeed(props) {

    const [refresh, setRefresh] = useState(false);
    return (
        <View style={feedStyles.screenBackground}>

            {/*Profile Stories */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={props.storyData}
                horizontal
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                renderItem={({item}) => {
                    return (

                        <StoriesObject 
                            userID={item.key}
                            profileImage={item.profileImage}
                            width={45}
                            height={45}
                            borderRadius={45}
                            username={item.username}
                            maxUsernameLength={8}
                            fontSize={9}
                            navigation={props.navigation}
                        />
                    )
                }}
            />

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

                        />

                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    video: (width, height) => ({
        alignSelf: 'center',
        width: width,
        height: undefined,
        aspectRatio: 1,
    }),
    picture: (width, height) => ({
        alignSelf: 'center',
        width: width,
        height: height
    }),
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 10
    },
    
})