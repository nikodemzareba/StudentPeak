import React, {Component, useRef, useState} from 'react'
import {
    View,
    Dimensions,
    Text,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Image, TouchableOpacity
} from 'react-native';

import firebase from "firebase";
import Feed_PictureFeed from "./Feed_PictureFeed";
import Feed_VideoFeed from "./Feed_VideoFeed";


const {height, width} = Dimensions.get('window');


const separator = "###########################################################################################";

import {LogBox} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import {storyData} from "./FakeJSONData/TempStoryData";
import {B} from "./Shared_Objects/Bold";
import Chat_BTN from "./Shared_Objects/Chat_BTN";
import {getProfileImage} from "./Shared_Objects/Functions_And_Methods/getProfileImage";

LogBox.ignoreLogs(['Setting a timer']);


const videosOrPicturesSelectedToView = [
    {label: 'Pictures', value: 0},
    {label: 'Videos', value: 1},
];


class FeedScreen extends Component {

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
        this.requestProfileImage();
        this.unsubscribe = this.usersFollowingRef.onSnapshot(this.getData);

        //HELLO DELETE Later
        this.setState({
            storiesDataLoaded: true,
            storiesData: storyData
        });
    }

    requestProfileImage() {
        getProfileImage(this.state.userId).then((r) => {
            if(r !== undefined)
            {
                this.setState({
                    profileImage: r,
                    profileImageLoaded: true,
                });
            }
        })
    }

    // This method is passed all the userID's of the users this user is following
    getData = async (querySnapshot) => {

        const videosDataFetched = [];
        const picturesDataFetched = [];

        let expectedFollowingUsersCount = querySnapshot.size;
        console.log(`\nNumber of Users Following: ${expectedFollowingUsersCount}`)

        let processedFollowingUsers = 0;

        // Got users Following info
        console.log("\nGot Users Following Data")

        // For each user we are following
        await querySnapshot.forEach((userFollowing) => {

            // Get each user we are following; userName & userProfilePhoto
            firebase.firestore()
                .collection('users')
                .doc(userFollowing.id)
                .get()
                .then(userDetails => {

                    console.log("\nGot Users Following Details etc: username, profileimage")
                    processedFollowingUsers++;

                    // Get all of the posts from the user we are following
                    firebase.firestore()
                        .collection('posts')
                        .doc(userFollowing.id)
                        .collection('userPosts')
                        .get()
                        .then(usersFollowingPosts => {
                            console.log("\nGot Posts Of Users i am Following!")

                            // For each post from the user we are following
                            usersFollowingPosts.forEach((userPost) => {

                                // Get the posts details
                                firebase.firestore()
                                    .collection('postData')
                                    .doc(userPost.id)
                                    .get()
                                    .then((postData => {

                                        const profileImage = userDetails.get("profileimage");
                                        const username = userDetails.get("username");
                                        const userID = userFollowing.id;

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
                                                key: userPost.id,
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
                                                key: userPost.id,
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

                                        console.log(`\nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${userPost.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} `);
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
                .catch((error) => {
                    console.log(`${error} \nUnable to get User we are followings data!`);
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
                                    <Feed_PictureFeed
                                        userID={this.state.userId}
                                        data={this.state.picturesDataFetched}
                                        storyData={this.state.storiesData}
                                        navigation={this.props.route.params.navigation}/>
                                    :
                                    <View style={{flex: 1, padding:10}}>
                                        <Text style={{color: "white", textAlign:"center", fontSize:20}}> <B> No Posts / Follow a user to view posts on your feed  </B> </Text>
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
                                    <View style={{flex: 1, padding:10}}>
                                        <Text style={{color: "white", textAlign:"center", fontSize:20}}> <B>  No Posts / Follow a user to view posts on your feed  </B> </Text>
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