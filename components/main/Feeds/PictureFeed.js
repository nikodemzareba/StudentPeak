import {Dimensions, FlatList, Image, StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";
import ProfileTitle from "./Shared_Objects/ProfileTitle";
import Caption from "./Shared_Objects/Caption";
import Comment from "./Shared_Objects/Comment";
import Likes_Count_Txt from "./Shared_Objects/Likes_Count_Txt";
import View_All_Comments from "./Shared_Objects/View_All_Comments";

const {height, width} = Dimensions.get('window');

export default function PictureFeed(props) {

    return (
        <View style={{flex: 1, marginBottom: 20}}>
            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{paddingTop: 25}}
                data={props.data}
                horizontal={false}
                scrollEventThrottle={20}
                showsVerticalScrollIndicator={false}
                // onViewableItemsChanged={this.handlePicturesViewableItemsChanged}
                viewabilityConfig={{itemVisiblePercentThreshold: 30, waitForInteraction: true}}
                overScrollMode="never"
                renderItem={({item}) => {
                    return (

                        <View style={{flex: 1, marginBottom: 20}}>
                            <ProfileTitle name={item.name}
                                          profilePicture={item.profile}
                                          userID={item.userID}
                                          navigation={props.navigation}
                            />

                            <Image source={{uri: item.downloadURL}}
                                   style={{ width: '100%',
                                       height: undefined,
                                       aspectRatio: 1,}}/>

                            <Likes_Count_Txt likesCount={item.likesCount} navigation={props.navigation}/>

                            <Caption name={item.name} userID={item.userID} navigation={props.navigation}
                                     caption={item.caption}/>
                            <View_All_Comments commentsCount={item.commentsCount} navigation={props.navigation}/>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

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
    }
})