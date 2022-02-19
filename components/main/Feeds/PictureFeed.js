import {Button, Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";
import ProfileTitle from "./Shared_Objects/ProfileTitle";
import Caption from "./Shared_Objects/Caption";
import Comment from "./Shared_Objects/Comment";
import Likes_And_Comments_Count_Txt  from "./Shared_Objects/Likes_Count_Txt";
import View_All_Comments from "./Shared_Objects/View_All_Comments";
import Profile_Icon from "./Shared_Objects/Profile_Icon";
import Username_Link_Txt from "./Shared_Objects/Username_Link_Txt";
import LikeBTN from "./Shared_Objects/LikeBTN";
import {feedStyles} from "./Shared_Objects/Styles";
import LikesAndCommentsDisplay from "./Shared_Objects/LikesAndCommentsDisplay";


const {height, width} = Dimensions.get('window');


const maxUsernameLengthForDisplay = 8;
const isUserNameTooLong = (username) => {
    if (username.length > maxUsernameLengthForDisplay) {
        return username.slice(0, maxUsernameLengthForDisplay) + "..."
    }
    return username;
}


export default function PictureFeed(props) {

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

                        <View style={styles.stories}>
                            <Profile_Icon userID={item.key} profileImage={item.profileImage}
                                          width={45} height={45} borderRadius={45}
                                          navigation={props.navigation}

                            />

                            <Username_Link_Txt name={isUserNameTooLong(item.username)} userID={item.key} fontSize={9}
                                               fontWeight={'normal'} navigation={props.navigation}/>

                        </View>
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
                renderItem={({item}) => {
                    return (

                        <View style={feedStyles.post}>
                            <ProfileTitle name={item.name}
                                          profileImage={item.profile}
                                          userID={item.userID}
                                          navigation={props.navigation}
                            />

                            <ImageBackground source={{uri: item.downloadURL}}
                                             style={{
                                                 width: '100%',
                                                 height: undefined,

                                                 aspectRatio: 1,
                                             }}/>


                           <LikesAndCommentsDisplay likesCount={item.likesCount}    commentsCount={item.commentsCount} navigation={props.navigation}/>

                            {/*<Likes_Count_Txt likesCount={item.likesCount} navigation={props.navigation}/>*/}

                            {/*<Caption name={item.name} userID={item.userID} navigation={props.navigation}*/}
                            {/*         caption={item.caption}/>*/}


                            {/*<View_All_Comments commentsCount={item.commentsCount} navigation={props.navigation}/>*/}
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
    },
    stories: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 0,
        marginBottom: 10,
        width: 60, height: 60
    }
})