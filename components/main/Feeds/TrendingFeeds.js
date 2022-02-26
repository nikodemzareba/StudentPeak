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


const {height, width} = Dimensions.get('window');


const separator = "###########################################################################################";

import {LogBox} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import Profile_Icon from "./Shared_Objects/Profile_Objects/Profile_Icon";

import View_All_Comments from "./Shared_Objects/Likes_And_Comments/View_All_Comments";
import Username_Link_Txt from "./Shared_Objects/Profile_Objects/Username_Link_Txt";

LogBox.ignoreLogs(['Setting a timer']);


const videosOrPicturesSelectedToView = [
    {label: 'Pictures', value: 0},
    {label: 'Videos', value: 1},
];

import {storyData} from "./FakeJSONData/TempStoryData";
import Likes_And_Comments_Count_Txt from "./Shared_Objects/Likes_And_Comments/Likes_And_Comments_Count_Txt";
import {B} from "./Shared_Objects/Bold";
import Chat_BTN from "./Shared_Objects/Chat_BTN";


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
                        const navigation =  this.props.navigation.navigate;
                        this.props.navigation.navigate("Search",{navigation: navigation})

                    }}>
                        <Image
                            source={require('./System_Images/SearchIcon.png')}
                            style={{width: 30, height: 70}}
                        />
                    </TouchableOpacity>


                    <Chat_BTN   navigation={this.props.navigation}/>

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