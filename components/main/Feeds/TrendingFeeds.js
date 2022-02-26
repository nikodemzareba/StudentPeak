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
const separator = "###########################################################################################";

LogBox.ignoreLogs(['Setting a timer']);


const videosOrPicturesSelectedToView = [
    {label: 'Pictures', value: 0},
    {label: 'Videos', value: 1},
];

class TrendingFeeds extends Component {

    constructor(props) {
        super(props);

        this.state = {

            storiesData: [],
            storiesDataLoaded: false,

            initialViewVideosOrPictureFeed: 0,

            profileImageLoaded: false,
            profileImage: "",
            userId:
            // "upb6UG9eM0VWzRo8tGke3xK9p953",
            firebase.auth().currentUser.uid,
            
            // Friends Following Data
            videosDataFetched: [],
            videosIsLoading: true,
            videosReceived: 0,
            loadVideos: false,

            picturesDataFetched: [],
            picturesIsLoading: true,
            picturesReceived: 0,
            loadPictures: false,


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
        this.usersFollowingRef = firebase.firestore()
            .collection('following')
            .doc(this.state.userId)
            .collection('userFollowing')

        this.popularPicturePostsRef = firebase.firestore()
            .collection("postData")
            .orderBy("likesCount")
            .where("mediaType", "==", "picture")
            .limitToLast(50)

        this.popularVideoPostsRef = firebase.firestore()
            .collection("postData")
            .orderBy("likesCount")
            .where("mediaType", "==", "video")
            .limitToLast(50)
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
        this.unsubscribe = this.usersFollowingRef.onSnapshot(this.getFriendsLikePosts);
        this.unsubscribe = this.popularPicturePostsRef.onSnapshot(this.getPopularPicturePosts);
      // this.unsubscribe = this.popularVideoPostsRef.onSnapshot(this.get);

        //HELLO DELETE Later
        this.setState({
            storiesDataLoaded: true,
            storiesData: storyData
        });
    }

    getFriendsLikePosts = async (querySnapshot)  => {

        const videosDataFetched = [];
        const picturesDataFetched = [];

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

                                            this.setState({
                                                videosReceived: this.state.videosReceived + 1
                                            });

                                            videosDataFetched.push({
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
                                        } else if (mediaType === "picture") {

                                            this.setState({
                                                picturesReceived: this.state.picturesReceived + 1
                                            });

                                            picturesDataFetched.push({
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

                                        console.log(`\nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${likedPost.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} `);
                                        console.log(`\n\nProcessed Users Count = ${processedFollowingUsers} | Expected Users Count = ${expectedFollowingUsersCount}`);

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
            this.setStatesForLoadingFeed();
        }
    }

    getPopularPicturePosts = async (querySnapshot) =>{

        const picturesDataFetched = [];
        let  querySize = querySnapshot.size;
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

                        this.setState({
                            picturesReceived: this.state.picturesReceived + 1
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
                    
                    if (receivedPosts === querySize) {
                        console.log("\nSetting Data To Variable")
                        this.setState({                           
                            picturesDataFetched: picturesDataFetched,
                        }, () => {
                            this.setStatesForLoadingFeed()
                        });
                    }
                })
                .catch((error) => {
                    console.log(`${error} \nUnable to get User we are followings data!`);
                });
        })  
    }

    getVideoPosts = async (querySnapshot) =>{

        const videosDataFetched = [];
        const picturesDataFetched = [];

        let  querySize = querySnapshot.size;


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
                                        initial={this.state.initialViewVideosOrPictureFeed}
                                        buttonColor={"#000000"}
                                        buttonColor={"#000000"}
                                        textColor={"#000000"}

                                        onPress={value => this.setState({initialViewVideosOrPictureFeed: value})}
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
                                    <Trending_Pictures_And_Videos_Feed
                                        userID={this.state.userId}
                                        data={this.state.picturesDataFetched}
                                        storyData={this.state.storiesData}
                                        navigation={this.props.route.params.navigation}
                                    />
                                    :
                                    <View style={{flex: 1, padding: 10}}>
                                        <Text style={{color: "white", textAlign: "center", fontSize: 20}}> <B> Follow a
                                            user to view posts on your feed </B> </Text>
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
                                    <Feed_VideoFeed
                                        userID={this.state.userId}
                                        data={this.state.videosDataFetched}
                                        navigation={this.props.route.params.navigation}/>
                                    :
                                    <View style={{flex: 1, padding: 10}}>
                                        <Text style={{color: "white", textAlign: "center", fontSize: 20}}> <B> Follow a
                                            user to view posts on your feed </B> </Text>
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

export default TrendingFeeds;