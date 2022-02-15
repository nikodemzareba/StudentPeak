import React, {Component, useState} from 'react'
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import VideoPlayer from "./VideosFeed_Objects/feedControl/components/VideoPlayer";
import firebase from "firebase";

import {StatusBar} from "expo-status-bar";
import {Feather} from "@expo/vector-icons";
import {Video} from "expo-av";
import VideoControls from "./VideosFeed_Objects/feedControl/components/VideoControls";
import {B} from "./Shared_Objects/Bold";
import ProfileTitle from "./Shared_Objects/ProfileTitle";
import Caption from "./Shared_Objects/Caption";
import PictureFeed from "./PictureFeed";
import VideoFeed from "./VideoFeed";


const {height, width} = Dimensions.get('window');


const separator = "##########################################################################################";

import {LogBox} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import Profile_Icon from "./Shared_Objects/Profile_Icon";

LogBox.ignoreLogs(['Setting a timer']);


const options = [
    {label: 'Pictures', value: 0},
    {label: 'Videos', value: 1},

];

class FeedScreen extends Component {

    constructor(props) {
        super(props);
        this.usersFollowingRef = firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
        this.state = {
            requestProcessed: false,
            chosenOption: 0,
            profilePictureLoaded: false,
            profilePicture: "",
            userId: firebase.auth().currentUser.uid,

            picturesReceived: 0,
            loadPictures: false,

            videosReceived: 0,
            loadVideos: false,

            videosOutOfBoundItems: [],
            videosDataFetched: [],
            videosIsLoading: true,

            picturesOutOfBoundItems: [],
            picturesDataFetched: [],
            picturesIsLoading: true
        }
    }

    handleVideosViewableItemsChanged = ({changed}) => {

        const videosOutOfBoundItems = changed;

        if (videosOutOfBoundItems.length !== 0) {
            this.setState({videosOutOfBoundItems});
        }

    };

    handlePicturesViewableItemsChanged = ({changed}) => {

        const picturesOutOfBoundItems = changed;

        if (picturesOutOfBoundItems.length !== 0) {
            this.setState({picturesOutOfBoundItems});
        }

    };

    componentDidMount() {
        this.getProfileImage();
        this.unsubscribe = this.usersFollowingRef.onSnapshot(this.getData);
    }

    getProfileImage()
    {
        firebase.firestore()
            .collection('users')
            .doc(this.state.userId)
            .get()
            .then(userDetails => {
                console.log(`\n\nUserID: ${firebase.auth().currentUser.uid} \nProfile Image URL: ${userDetails.get("profileimage")}`)
                if(userDetails.get("profileimage") !== "" )
                {
                    console.log(`\n\n Has Profile Image`);

                    this.setState({
                        profilePicture: userDetails.get("profileimage"),
                        profilePictureLoaded: true,
                    });}
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
                            console.log("\nGot Posts Of Users i am Following")

                            usersFollowingPosts.forEach((userPost) => {
                                //  const {caption, createdAt, downloadURL, mediaType, commentsCount} = userPost.data();

                                const profileImage = userDetails.get("profileimage");
                                const username = userDetails.get("username");
                                const userID = userFollowing.id;

                                const caption = userPost.get("caption");
                                const createdAt = userPost.get("createdAt");
                                const downloadURL = userPost.get("downloadURL");
                                const mediaType = userPost.get("mediaType");
                                const commentsCount = 0
                                    // userPost.get("commentsCount")
                                ;
                                const likesCount = userPost.get("likesCount");

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
                                        likesCount: likesCount
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
                                        likesCount: likesCount
                                    });
                                }

                                console.log(`\nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${userPost.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} \nLikesCount: ${likesCount}`);
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

    renderUserFollowingVideoPosts = ({item}) => {
        return <VideoPlayer
            height={height / 1.6}
            width={width}
            videoUri={item.downloadURL}
            item={item}
            videosOutOfBoundItems={this.state.videosOutOfBoundItems}
        />
    }

    render() {

        return (
            <View style={{}}>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PrivateProfile")}>
                        {this.state.profilePictureLoaded
                            ?
                            <Image
                                source={{uri: `${this.state.profilePicture}`}}
                                style={{width: 50, height: 50, borderRadius: 30, marginLeft: 15}}
                            />
                            :
                            <Image
                                source={require('./System_Images/Profile_Image_Icon.png')}
                                style={{width: 50, height: 50, borderRadius: 30, marginLeft: 15}}
                            />
                        }
                    </TouchableOpacity>



                    <View style={{flexDirection: 'row', alignItems: 'center', width: 250, height: 100}}>
                        <SwitchSelector options={options} initial={this.state.chosenOption}
                                        buttonColor={"#000000"}
                                        buttonColor={"#000000"}
                                        textColor={"#000000"}

                                        onPress={value => this.setState({chosenOption: value})}
                        />
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat")}>
                        <Image
                            source={require('./System_Images/Chat_Nav_Icon.png')}
                            style={{width: 50, height: 50, borderRadius: 30, marginLeft: 15}}
                        />
                    </TouchableOpacity>
                </View>


                {this.state.chosenOption === 0
                    ?
                    <View style={{width, height}}>
                        {/* Pictures Feed */}
                        {this.state.picturesIsLoading
                            ?
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="red"/>
                            </View>
                            :

                            <>
                                {this.state.loadPictures
                                    ?
                                    <PictureFeed data={this.state.picturesDataFetched}
                                                 navigation={this.props.route.params.navigation}/>
                                    :
                                    <View style={{flex: 1}}>

                                    </View>
                                }
                            </>

                        }
                  </View>
                    :
                    <>


                        <View style={{width, height}}>

                            {this.state.videosIsLoading
                                ?
                                <View style={styles.loading}>
                                    <ActivityIndicator size="large" color="red"/>
                                </View>
                                :
                                <>
                                    {this.state.loadVideos
                                        ?
                                        <VideoFeed data={this.state.videosDataFetched}
                                                   navigation={this.props.route.params.navigation}/>
                                        :
                                        <View style={{flex: 1}}>

                                        </View>
                                    }

                                </>
                            }

                        </View>
                    </>
                }

            </View>
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