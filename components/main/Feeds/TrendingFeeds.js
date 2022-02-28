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
import Feed_PictureFeed from "./Feed_PictureFeed";
import Feed_VideoFeed from "./Feed_VideoFeed";
import {LogBox} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import {storyData} from "./FakeJSONData/TempStoryData";
import {B} from "./Shared_Objects/Bold";
import Chat_BTN from "./Shared_Objects/Chat_BTN";
import {getProfileImage} from "./Shared_Objects/Functions_And_Methods/getProfileImage";
import Trending_Pictures_And_Videos_Feed from "./Trending_Feed/Trending_Pictures_And_Videos_Feed";

const {height, width} = Dimensions.get('window');
const separator = "############################################# ##############################################";

LogBox.ignoreLogs(['Setting a timer']);


const videosOrPicturesSelectedToView = [
    {label: 'Pictures', value: 0},
    {label: 'Videos', value: 1},
];

class TrendingFeeds extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profileImageLoaded: false,
            profileImage: "",
            userId:
            // "upb6UG9eM0VWzRo8tGke3xK9p953",
            firebase.auth().currentUser.uid,
            viewVideosOrPictureFeed: 0,

            //Trending Topics
            trendingTopicsDataFetched: [],
            trendingTopicsLoading: true,

            // Stories 
            pictureStoriesData: [],
            pictureStoriesDataLoaded: false,
            videoStoriesData: [],
            videoStoriesDataLoaded: false,

            // Friends Following Data
            friendsVideoDataFetched: [],
            friendsVideosIsLoading: true,
            friendsVideosReceived: 0,
            friendsLoadVideos: false,

            friendsPicturesDataFetched: [],
            friendsPicturesIsLoading: true,
            friendsPicturesReceived: 0,
            loadFriendsPictures: false,

            // Trending Data
            trendingFeed_VideosDataFetched: [],
            trendingFeed_VideosIsLoading: true,
            trendingFeed_VideosReceived: 0,
            trendingFeed_loadVideos: false,

            trendingFeed_PicturesDataFetched: [],
            trendingFeed_PicturesIsLoading: true,
            trendingFeed_PicturesReceived: 0,
            trendingFeed_loadPictures: false,
        }

        this.popularPostTopicsRef = firebase.firestore()
            .collection("postTags")
            .orderBy('numberOfPosts', 'desc')

        this.popularStoriesRef = (type) => firebase.firestore()
            .collection("stories")
            .orderBy("views")

        this.usersFollowingRef = firebase.firestore()
            .collection('following')
            .doc(this.state.userId)
            .collection('userFollowing')

        this.popularPicturePostsRef = (type) =>
            firebase.firestore()
                .collection("postData")
                .orderBy('likesCount', 'desc')
                .where("mediaType", "==", type)
                .limit(50)
    }

    requestProfileImage() {
        getProfileImage(this.state.userId).then((r) => {
            if (r !== undefined) {
                this.setState({
                    profileImage: r,
                    profileImageLoaded: true,
                });
            }
        })
    }

    componentDidMount() {
        this.requestProfileImage();

        // Get friends liked posts
        this.unsubscribe = this.usersFollowingRef.onSnapshot(this.getFriendsLikePosts);

        // Get popular pictures & videos
        this.unsubscribe = this.popularPicturePostsRef("picture").onSnapshot((r) => {
            this.getPopularPosts(r, "picture")
        });
        this.unsubscribe = this.popularPicturePostsRef("video").onSnapshot((r) => {
            this.getPopularPosts(r, "video")
        });

        // Get popular topics
        this.unsubscribe = this.popularPostTopicsRef.onSnapshot(this.getPopularTopics);

        //HELLO DELETE Later
        this.setState({
            storiesDataLoaded: true,
            storiesData: storyData
        });
    }

    isKeyInList(key, list) {
        return list.some(item => key === item.key);
    }

    getFriendsLikePosts = async (querySnapshot) => {

        const friendsVideoDataFetched = [];
        const friendsPicturesDataFetched = [];

        let expectedFollowingUsersCount = querySnapshot.size;
        console.log(`\nNumber of Users Following: ${expectedFollowingUsersCount}`)

        let processedFollowingUsers = 0;

        // Got users Following info
        console.log("\nGot Users Following Data")

        // For each user we are following
        await querySnapshot.forEach((userFollowing) => {

            processedFollowingUsers++;

            // Get all of the posts this user we are following has liked
            firebase.firestore()
                .collection('posts')
                .doc(userFollowing.id)
                .collection('postsUserHasLiked')
                .get()
                .then(usersFollowingsLikedPosts => {

                    // For each post the user we are followed has liked
                    usersFollowingsLikedPosts.forEach((likedPost) => {

                        // Get the posts details
                        firebase.firestore()
                            .collection('postData')
                            .doc(likedPost.id)
                            .get()
                            .then((postData => {

                                firebase.firestore()
                                    .collection('users')
                                    .doc(postData.get("userID"))
                                    .get()
                                    .then(userDetails => {
                                        const profileImage = userDetails.get("profileimage");
                                        const username = userDetails.get("username");
                                        const userID = postData.get("userID");

                                        const caption = postData.get("caption");
                                        const createdAt = postData.get("createdAt");
                                        const downloadURL = postData.get("downloadURL");
                                        const mediaType = postData.get("mediaType");

                                        const commentsCount = postData.get("commentsCount");


                                        if (mediaType === "video") {

                                            if( ! this.isKeyInList(likedPost.id, friendsVideoDataFetched))
                                            {
                                                this.setState({
                                                    friendsVideosReceived: this.state.friendsVideosReceived + 1
                                                });

                                                friendsVideoDataFetched.push({
                                                    key: likedPost.id,
                                                    userID: userID,
                                                    name: username,
                                                    profile: profileImage,
                                                    caption: caption,
                                                    createdAt: createdAt,
                                                    downloadURL: downloadURL,
                                                    mediaType: mediaType,

                                                    commentsCount: commentsCount,    // Needs be retrieved inside the comment method
                                                });
                                            }

                                        } else if (mediaType === "picture") {

                                            if( ! this.isKeyInList(likedPost.id, friendsPicturesDataFetched)) {

                                                this.setState({
                                                    friendsPicturesReceived: this.state.friendsPicturesReceived + 1
                                                });

                                                friendsPicturesDataFetched.push({
                                                    key: likedPost.id,
                                                    userID: userID,
                                                    name: username,
                                                    profile: profileImage,
                                                    caption: caption,
                                                    createdAt: createdAt,
                                                    downloadURL: downloadURL,
                                                    mediaType: mediaType,

                                                    commentsCount: commentsCount, // Needs be retrieved inside the comment method
                                                });
                                            }
                                        }

                                        console.log(`\nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${likedPost.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} `);
                                        console.log(`\n\nProcessed Users Count = ${processedFollowingUsers} | Expected Users Count = ${expectedFollowingUsersCount}`);

                                        if (processedFollowingUsers === expectedFollowingUsersCount) {
                                            console.log("\nSetting Data To Variable")
                                            this.setState({
                                                friendsVideoDataFetched: friendsVideoDataFetched,
                                                friendsPicturesDataFetched: friendsPicturesDataFetched,

                                                friendsPicturesIsLoading: false,
                                                friendsVideosIsLoading: false,
                                            })
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(`${error} \nUnable to get User we are followings data!`);
                                    });

                            }))
                            .catch((error) => {
                                console.log(`${error} \nUnable to get Users following post data!`);
                            });
                    })
                })
                .catch((error) => {
                    console.log(`${error} \nUnable to get Users following posts!`);
                });
        })

        if (expectedFollowingUsersCount === 0) {
            this.setState({
                friendsPicturesIsLoading: false,
                friendsVideosIsLoading: false,
            })
        }
    }

    getPopularPosts = async (querySnapshot, type) => {

        const picturesDataFetched = [];
        const videosDataFetched = [];

        let querySize = querySnapshot.size;
        let receivedPosts = 0;

        await querySnapshot.forEach((postData) => {
            receivedPosts++;
            firebase.firestore()
                .collection('users')
                .doc(postData.get("userID"))
                .get()
                .then(userDetails => {
                    const profileImage = userDetails.get("profileimage");
                    const username = userDetails.get("username");
                    const userID = postData.get("userID");

                    const caption = postData.get("caption");
                    const createdAt = postData.get("createdAt");
                    const downloadURL = postData.get("downloadURL");
                    const mediaType = postData.get("mediaType");

                    const commentsCount = postData.get("commentsCount");

                    if (type === "picture") {
                        this.setState({
                            trendingFeed_PicturesReceived: this.state.trendingFeed_PicturesReceived + 1
                        });

                        picturesDataFetched.push({
                            key: postData.id,
                            userID: userID,
                            name: username,
                            profile: profileImage,
                            caption: caption,
                            createdAt: createdAt,
                            downloadURL: downloadURL,
                            mediaType: mediaType,

                            commentsCount: commentsCount, // Needs be retrieved inside the comment method
                        });
                    } else if (type === "video") {
                        this.setState({
                            trendingFeed_VideosReceived: this.state.trendingFeed_VideosReceived + 1
                        });

                        videosDataFetched.push({
                            key: postData.id,
                            userID: userID,
                            name: username,
                            profile: profileImage,
                            caption: caption,
                            createdAt: createdAt,
                            downloadURL: downloadURL,
                            mediaType: mediaType,

                            commentsCount: commentsCount, // Needs be retrieved inside the comment method
                        });
                    }

                    console.log(`\ngetPopularPicturePosts() UserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${postData.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} `);


                    if (receivedPosts === querySize) {
                        console.log("\nSetting Data To Variable")

                        if (type === "picture") {
                            this.setState({
                                trendingFeed_PicturesIsLoading: false,
                                trendingFeed_PicturesDataFetched: picturesDataFetched,
                            })
                        } else if (type === "video") {
                            this.setState({
                                trendingFeed_VideosIsLoading: false,
                                trendingFeed_VideosDataFetched: videosDataFetched,
                            })
                        }
                    }
                })
                .catch((error) => {
                    console.log(`${error} \nUnable to get User we are followings data! `);
                });
        })

        if (querySize === 0) {

            if (type === "picture") {
                this.setState({
                    trendingFeed_PicturesIsLoading: false,
                })
            } else if (type === "video") {
                this.setState({
                    trendingFeed_VideosIsLoading: false,
                })
            }
        }
    }

    getPopularTopics = async (querySnapShot) => {
        let data = [];
        let resultsSize = querySnapShot.size;
        let receivedDataCount = 0;

        await querySnapShot.forEach((trendingTopic) => {

            receivedDataCount++

            data.push({
                key: `${receivedDataCount}`,
                topic: `${trendingTopic.id}`
            });

            if (resultsSize === receivedDataCount) {

                this.setState({
                    trendingTopicsDataFetched: data,
                    trendingTopicsLoading: false
                })
            }
        })

        if (resultsSize === 0) {
            this.setState({
                trendingTopicsLoading: false
            })
        }
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
                                style={{width: 50, height: 50, borderRadius: 30, marginLeft: 10}}
                            />
                            :
                            <Image
                                source={require('./System_Images/Profile_Image_Icon.png')}
                                style={{width: 50, height: 50, borderRadius: 30, marginLeft: 15}}
                            />
                        }
                    </TouchableOpacity>

                    {/* Slider (Picture / Videos) */}
                    <View style={{flexDirection: 'row', alignItems: 'center', width: 200, height: 100}}>
                        <SwitchSelector options={videosOrPicturesSelectedToView}
                                        initial={this.state.viewVideosOrPictureFeed}
                                        buttonColor={"#000000"}
                                        buttonColor={"#000000"}
                                        textColor={"#000000"}

                                        onPress={value => this.setState({viewVideosOrPictureFeed: value})}
                        />
                    </View>


                    {/* Search BTN */}
                    <TouchableOpacity onPress={() => {
                        const navigation = this.props.navigation.navigate;
                        this.props.navigation.navigate("Search", {navigation: navigation})

                    }}>
                        <Image
                            source={require('./System_Images/SearchIcon.png')}
                            style={{width: 30, height: 70}}
                        />
                    </TouchableOpacity>


                    <Chat_BTN navigation={this.props.navigation}/>

                </View>


                {/* Logic for which view is visible*/}
                {this.state.viewVideosOrPictureFeed === 0
                    ?
                    <>
                        {/* Pictures Feed */}
                        {this.state.friendsPicturesIsLoading || this.state.trendingFeed_PicturesIsLoading || this.state.trendingTopicsLoading
                            ?
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="red"/>
                            </View>
                            :
                            <>

                                <Trending_Pictures_And_Videos_Feed
                                    userID={this.state.userId}
                                    friendsLikedPostsData={this.state.friendsPicturesDataFetched}
                                    popularPosts={this.state.trendingFeed_PicturesDataFetched}
                                    trendingTopics={this.state.trendingTopicsDataFetched}
                                    storyData={this.state.storiesData}
                                    navigation={this.props.route.params.navigation}
                                    type={"picture"}
                                />

                            </>

                        }
                    </>
                    :
                    <>
                        {/* Video Feed */}
                        {this.state.friendsVideosIsLoading || this.state.trendingFeed_VideosIsLoading || this.state.trendingTopicsLoading
                            ?
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="red"/>
                            </View>
                            :
                            <>
                                {/*{this.state.friendsLoadVideos*/}
                                {/*    ?*/}

                                <Trending_Pictures_And_Videos_Feed
                                    userID={this.state.userId}
                                    friendsLikedPostsData={this.state.friendsVideoDataFetched}
                                    popularPosts={this.state.trendingFeed_VideosDataFetched}
                                    trendingTopics={this.state.trendingTopicsDataFetched}
                                    storyData={this.state.storiesData}
                                    navigation={this.props.route.params.navigation}
                                    type={"video"}
                                />

                                {/*    :*/}
                                {/*    <View style={{flex: 1, padding: 10}}>*/}
                                {/*        <Text style={{color: "white", textAlign: "center", fontSize: 20}}> <B> Follow a*/}
                                {/*            user to view posts on your feed </B> </Text>*/}
                                {/*    </View>*/}
                                {/*}*/}
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

export default TrendingFeeds;