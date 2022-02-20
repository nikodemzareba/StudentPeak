import React, {Component, useRef, useState} from 'react'
import {
    View,
    Dimensions,
    FlatList,
    Text,
    ActivityIndicator,
    ScrollView,
    Button,
    StyleSheet,
    SafeAreaView, Image, TouchableOpacity
} from 'react-native';

import firebase from "firebase";
import PictureFeed from "./PictureFeed";
import VideoFeed from "./VideoFeed";


const {height, width} = Dimensions.get('window');


const separator = "##########################################################################################";

import {LogBox} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import Profile_Icon from "./Shared_Objects/Profile_Icon";

import View_All_Comments from "./Shared_Objects/Likes_And_Comments/View_All_Comments";
import Username_Link_Txt from "./Shared_Objects/Username_Link_Txt";

LogBox.ignoreLogs(['Setting a timer']);


const videosOrPicturesSelectedToView = [
    {label: 'Pictures', value: 0},
    {label: 'Videos', value: 1},
];

import {storyData} from "./PicturesFeedObjects/TempStoryData";
import Likes_And_Comments_Count_Txt from "./Shared_Objects/Likes_And_Comments/Likes_And_Comments_Count_Txt";


class FeedScreen extends Component {

    constructor(props) {
        super(props);


        this.state = {

            storiesData: [],
            storiesDataLoaded: false,

            initialViewVideosOrPictureFeed: 0,

            profileImageLoaded: false,
            profileImage: "",
            userId: "upb6UG9eM0VWzRo8tGke3xK9p953",
            //firebase.auth().currentUser.uid,

            videosDataFetched: [],
            videosIsLoading: true,
            videosReceived: 0,
            loadVideos: false,

            picturesDataFetched: [],
            picturesIsLoading: true,
            picturesReceived: 0,
            loadPictures: false,
        }
        this.usersFollowingRef = firebase.firestore()
            .collection('following')
            .doc(this.state.userId)
            .collection('userFollowing')
    }

    componentDidMount() {
        this.getProfileImage();
        this.unsubscribe = this.usersFollowingRef.onSnapshot(this.getData);

        //HELLO DELETE Later
        this.setState({
            storiesDataLoaded: true,
            storiesData: storyData
        });
    }

    getProfileImage() {
        firebase.firestore()
            .collection('users')
            .doc(this.state.userId)
            .get()
            .then(userDetails => {
                console.log(`\n\nCurrent UserID: ${this.state.userId} \nProfile Image URL: ${userDetails.get("profileimage")}`)
                if (userDetails.get("profileimage") !== "") {
                    console.log(`\n\n Has Profile Image`);

                    this.setState({
                        profileImage: userDetails.get("profileimage"),
                        profileImageLoaded: true,
                    });
                }
            })
    }

    getData = async (querySnapshot) => {
        const videosDataFetched = [];
        const picturesDataFetched = [];

        let expectedFollowingUsersCount = querySnapshot.size;
        console.log(`\nNumber of Users Following: ${expectedFollowingUsersCount}`)

        let processedFollowingUsers = 0;

        // Got users Following info
        console.log("\nGot Users Following Data")
        await querySnapshot.forEach((userFollowing) => {

            // Get the user we are following userName & userProfilePhoto

            firebase.firestore()
                .collection('users')
                .doc(userFollowing.id)
                .get()
                .then(userDetails => {

                    console.log("\nGot Users Following Details etc: username, profileimage")
                    processedFollowingUsers++;
                    firebase.firestore()
                        .collection('posts')
                        .doc(userFollowing.id)
                        .collection('userPosts')
                        //.where("mediaType", "==", "video")
                        .get()
                        .then(usersFollowingPosts => {
                            console.log("\nGot Posts Of Users i am Following!")

                            usersFollowingPosts.forEach((userPost) => {

                                firebase.firestore()
                                    .collection('postData')
                                    .doc(userPost.id)
                                    .get()
                                    .then((postCommentsAndLikes => {

                                        let userLikedPost = false;
                                        firebase.firestore()
                                            .collection('postData')
                                            .doc(userPost.id)
                                            .collection("likes")
                                            .doc(this.state.userId)
                                            .get()
                                            .then(documentSnapshot => {
                                                if (documentSnapshot.exists) {
                                                    userLikedPost = true;
                                                }
                                            })
                                            .then(() => {

                                                const profileImage = userDetails.get("profileimage");
                                                const username = userDetails.get("username");
                                                const userID = userFollowing.id;

                                                const caption = userPost.get("caption");
                                                const createdAt = userPost.get("createdAt");
                                                const downloadURL = userPost.get("downloadURL");
                                                const mediaType = userPost.get("mediaType");

                                                const commentsCount = postCommentsAndLikes.get("commentsCount");
                                                const likesCount = postCommentsAndLikes.get("likesCount");


                                                if (mediaType === "video") {

                                                    this.setState({
                                                        videosReceived: this.state.videosReceived + 1
                                                    });

                                                    videosDataFetched.push({
                                                        key: userPost.id,
                                                        userID: userID,
                                                        name: username,
                                                        profile: profileImage,
                                                        caption: caption,
                                                        createdAt: createdAt,
                                                        downloadURL: downloadURL,
                                                        commentsCount: commentsCount,
                                                        likesCount: likesCount,
                                                        userLikedPost: userLikedPost
                                                    });
                                                } else if (mediaType === "picture") {

                                                    this.setState({
                                                        picturesReceived: this.state.picturesReceived + 1
                                                    });

                                                    picturesDataFetched.push({
                                                        key: userPost.id,
                                                        userID: userID,
                                                        name: username,
                                                        profile: profileImage,
                                                        caption: caption,
                                                        createdAt: createdAt,
                                                        downloadURL: downloadURL,
                                                        commentsCount: commentsCount,
                                                        likesCount: likesCount,
                                                        userLikedPost: userLikedPost
                                                    });
                                                }

                                                console.log(`\nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${userPost.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} \nLikesCount: ${likesCount} \nUserLikedPost: ${userLikedPost}`);
                                                console.log(`\nProcessed Users Count = ${processedFollowingUsers} | Expected Users Count = ${expectedFollowingUsersCount}`);

                                                if (processedFollowingUsers === expectedFollowingUsersCount) {
                                                    console.log("\nSetting Data To Variable")
                                                    this.setState({
                                                        videosDataFetched: videosDataFetched,
                                                        picturesDataFetched: picturesDataFetched,
                                                    }, () => {
                                                        this.setStatesForLoadingFeed()
                                                    });
                                                }
                                            })
                                            .catch((exception) => {
                                                console.log(`\nUnable to get Post Likes \n\n${exception}`);

                                            })
                                    }))
                                //  const {caption, createdAt, downloadURL, mediaType, commentsCount} = userPost.data();
                            })
                        })
                })
                .then(() => {


                })
                .catch((error) => {
                    console.log(`${error} \nUnable to get Users following posts!`);
                });
        })

        if (expectedFollowingUsersCount === 0) {
            this.setStatesForLoadingFeed();
        }
    }

    setStatesForLoadingFeed() {
        console.log("\nLoad Pictures & Videos")
        if (this.state.videosReceived > 0) {
            this.setState({
                loadVideos: true
            });
        }

        if (this.state.picturesReceived > 0) {
            this.setState({
                loadPictures: true
            });
        }

        this.setState({
            videosIsLoading: false,
            picturesIsLoading: false
        });

    }

    render() {

        return (
            <ScrollView style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>

                {/* Top Bar  */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: "black"
                }}>
                    {/* Profile Icon */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PrivateProfile")}>
                        {this.state.profileImageLoaded
                            ?
                            <Image
                                source={{uri: `${this.state.profileImage}`}}
                                style={{width: 50, height: 50, borderRadius: 30, marginLeft: 15}}
                            />
                            :
                            <Image
                                source={require('./System_Images/Profile_Image_Icon.png')}
                                style={{width: 50, height: 50, borderRadius: 30, marginLeft: 15}}
                            />
                        }
                    </TouchableOpacity>

                    {/* Slider (Picture / Videos) */}
                    <View style={{flexDirection: 'row', alignItems: 'center', width: 250, height: 100}}>
                        <SwitchSelector options={videosOrPicturesSelectedToView}
                                        initial={this.state.initialViewVideosOrPictureFeed}
                                        buttonColor={"#000000"}
                                        buttonColor={"#000000"}
                                        textColor={"#000000"}

                                        onPress={value => this.setState({initialViewVideosOrPictureFeed: value})}
                        />
                    </View>

                    {/* Chat BTN */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat")}>
                        <Image
                            source={require('./System_Images/Chat_Nav_Icon.png')}
                            style={{width: 50, height: 50, borderRadius: 30, marginLeft: 15}}
                        />
                    </TouchableOpacity>
                </View>


                {/* Logic for which view is visible*/}
                {this.state.initialViewVideosOrPictureFeed === 0
                    ?
                    <>
                        {/* Pictures Feed */}
                        {this.state.picturesIsLoading
                            ?
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="red"/>
                            </View>
                            :

                            <>
                                {this.state.loadPictures && this.state.storiesDataLoaded
                                    ?
                                    <PictureFeed
                                        userID={this.state.userId}
                                        data={this.state.picturesDataFetched}
                                        storyData={this.state.storiesData}
                                        navigation={this.props.route.params.navigation}/>
                                    :
                                    <View style={{flex: 1}}>

                                    </View>
                                }
                            </>

                        }
                    </>
                    :
                    <>
                        {/* Video Feed */}
                        {this.state.videosIsLoading
                            ?
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="red"/>
                            </View>
                            :
                            <>
                                {this.state.loadVideos
                                    ?
                                    <VideoFeed
                                        userID={this.state.userId}
                                        data={this.state.videosDataFetched}
                                        navigation={this.props.route.params.navigation}/>
                                    :
                                    <View style={{flex: 1}}>

                                    </View>
                                }
                            </>
                        }
                    </>
                }


            </ScrollView>
        );

    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    video: (width, height) => ({
        alignSelf: 'center',
        width: width,
        height: height
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
    }
})

export default FeedScreen;