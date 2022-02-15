import {Dimensions, FlatList, Image, StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";
import ProfileTitle from "./Shared_Objects/ProfileTitle";
import Caption from "./Shared_Objects/Caption";
import Comment from "./Shared_Objects/Comment";
import Likes_Count_Txt from "./Shared_Objects/Likes_Count_Txt";
import View_All_Comments from "./Shared_Objects/View_All_Comments";
import Profile_Icon from "./Shared_Objects/Profile_Icon";

const {height, width} = Dimensions.get('window');


const storyData = [
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p953",
        profilePicture: "https://media.istockphoto.com/photos/smiling-indian-business-man-working-on-laptop-at-home-office-young-picture-id1307615661?b=1&k=20&m=1307615661&s=170667a&w=0&h=Zp9_27RVS_UdlIm2k8sa8PuutX9K3HTs8xdK0UfKmYk=",
        username: "User1"
    }
    ,
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p9531",
        profilePicture: "https://media.istockphoto.com/photos/excited-woman-wearing-rainbow-cardigan-picture-id1327495437?b=1&k=20&m=1327495437&s=170667a&w=0&h=Vbl-XLyAnBoTkyGXXi-X1CFzuSHlNcn-dqB-sCosxFo=",
        username: "User2"
    },
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p9532",
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        username: "User3"
    }
    ,
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p9533",
        profilePicture: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        username: "User4"
    }
    ,
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p9534",
        profilePicture: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        username: "User5"
    }
    ,
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p9535",
        profilePicture: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        username: "User6"
    }
    ,
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p9536",
        profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        username: "User7"
    }
    ,
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p9537",
        profilePicture: "https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        username: "User8"
    }
    ,
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p95389",
        profilePicture: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
        username: "User9"
    }
    ,
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p953899",
        profilePicture: "https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        username: "User10"
    }
    ,
    {
        key: "upb6UG9eM0VWzRo8tGke3xK9p953834",
        profilePicture: "https://images.unsplash.com/photo-1500259783852-0ca9ce8a64dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
        username: "User11"
    }


]

export default function PictureFeed(props) {

    return (
        <View style={{flex: 1, marginBottom: 20}}>

            {/*Profile Stories */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={storyData}
                horizontal
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                renderItem={({item}) => {
                    return (
                        <View style={{marginBottom: 20, width:50, height:40}}>
                            <Profile_Icon userID={item.key} profilePicture={item.profilePicture}
                                          width={35} height={35} borderRadius={35}
                                          navigation={props.navigation}
                            />

                            {/*<Username_Link_Txt name={item.username} userID={item.key} fontSize={1} fontWeight={'normal'} navigation={this.props.route.params.navigation} />*/}

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