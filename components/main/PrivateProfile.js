import React, {Component, useRef, useState} from 'react'
import {
    View,
    Dimensions,
    Text,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Image, TouchableOpacity, FlatList
} from 'react-native';

import firebase from "firebase";
import Feed_PictureFeed from "./Feeds/Feed_PictureFeed";
import Feed_VideoFeed from "./Feeds/Feed_VideoFeed";


const {height, width} = Dimensions.get('window');


const separator = "###########################################################################################";

import {storyData} from "./Feeds/FakeJSONData/TempStoryData";
import {B} from "./Feeds/Shared_Objects/Bold";
import PrivateProfileDisplay from './PrivateProfileDisplay';
import Pictures_And_Videos_Post_Object from "./Feeds/Shared_Objects/Pictures_And_Videos_Post_Object";
import {feedStyles} from "./Feeds/Shared_Objects/Styles";
import {SimpleLineIcons} from "@expo/vector-icons";
import SearchScreenObject from "./Search/Objects/SearchScreenObject";


class PrivateProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {

            storiesData: [],
            storiesDataLoaded: false,

            profileImageLoaded: false,
            profileImage: "",
            userId:
            // "upb6UG9eM0VWzRo8tGke3xK9p953",
            firebase.auth().currentUser.uid,

            picturesDataFetched: [],
            picturesIsLoading: true,
            loadPictures: false,
        }
        this.usersFollowingRef = firebase.firestore()
            .collection('following')
            .doc(this.state.userId)
            .collection('userFollowing')
    }

    componentDidMount() {
        this.getData();
        this.getProfileInfo();

        //HELLO DELETE Later
        this.setState({
            storiesDataLoaded: true,
            storiesData: storyData
        });
    }


    // This method is passed all the userID's of the users this user is following
    getData = async () => {

        const picturesDataFetched = [];


        // Got users Following info
        // console.log("\nGot Users Following Data")
        firebase.firestore()
            .collection('users')
            .doc(this.state.userId)
            .get()
            .then(userDetails => {


                // Get all of the posts from the user we are following
                firebase.firestore()
                    .collection('posts')
                    .doc(this.state.userId)
                    .collection('userPosts')
                    .get()
                    .then(privatePosts => {
                        //     console.log("\nGot Posts Of Users i am Following!")

                        // For each post from the user we are following


                        let expectedResultsSize = privatePosts.size;
                        let count =0;

                        privatePosts.forEach((userPost) => {

                            count++;
                            // Get the posts details
                            firebase.firestore()
                                .collection('postData')
                                .doc(userPost.id)
                                .get()
                                .then((postData => {

                                    const profileImage = userDetails.get("profileimage");
                                    const name = userDetails.get("username");
                                    const caption = postData.get("caption");
                                    const createdAt = postData.get("createdAt");
                                    const downloadURL = postData.get("downloadURL");
                                    const mediaType = postData.get("mediaType");
                                    const commentsCount = postData.get("commentsCount");
                                    const likesCount = postData.get("likesCount");
                                    const userID = this.state.userId;


                                    picturesDataFetched.push({
                                        key: userPost.id,
                                        caption: caption,
                                        createdAt: createdAt,
                                        downloadURL: downloadURL,
                                        mediaType: mediaType,
                                        commentsCount: commentsCount, // Needs be retrieved inside the comment method
                                        profile: profileImage,
                                        name: name,
                                        userID: userID,
                                    });

                                    if(count===expectedResultsSize)
                                    {
                                        //       console.log("\nSetting Data To Variable")
                                        this.setState({
                                            picturesDataFetched: picturesDataFetched,
                                            loadPictures: false
                                        })
                                    }
                                }))
                                .catch((error) => {
                                    //        console.log(`${error} \nUnable to get Users following post data!`);
                                });
                        })
                    })
                    .catch((error) => {
                        //       console.log(`${error} \nUnable to get Users following posts!`);
                    })
            });


    }

    getProfileInfo = async () => {

        const profileDataFetched = [];


        firebase.firestore()
            .collection('users')
            .doc(this.state.userId)
            .get()
            .then((userInfo) => {

                const bio = userInfo.get("bio");
                const followers = userInfo.get("followers");
                const following = userInfo.get("following");
                const name = userInfo.get("name");
                const username = userInfo.get("username");
                const profileimage = userInfo.get("profileimage");

                
                profileDataFetched.push({
                    key: this.state.userId,
                    bio: bio,
                    followers: followers,
                    following: following,
                    name: name,
                    username: username,
                    profileimage: profileimage,
                    profile: profileimage,
                })

                this.setState({
                    profileDataFetched: profileDataFetched,
                })
            })

    }

    render() {

        return (
            <ScrollView style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>

                <View>
                    <PrivateProfileDisplay
                        userID={this.state.userId}
                        data={this.state.profileDataFetched}
                        navigation={this.props.route.params.navigation}
                    />
                </View>


                {/* Pictures Feed */}
                {this.state.loadPictures
                    ?
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="red"/>
                    </View>
                    :

                    <View style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>
                        <View style={feedStyles.screenBackground}>
                            <View style={{paddingTop: 10, height: 30}}>
                            </View>

                            <FlatList
                                data={this.state.picturesDataFetched}
                                //Setting the number of column
                                numColumns={3}
                                renderItem={({item}) => (
                                    <SearchScreenObject item={item} navigation={this.props.route.params.navigation}/>
                                )}

                            />

                        </View>
                    </View>
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

export default PrivateProfile;