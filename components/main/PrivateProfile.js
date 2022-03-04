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
import Feed_PictureFeed from "./Feeds/Feed_PictureFeed";
import Feed_VideoFeed from "./Feeds/Feed_VideoFeed";


const {height, width} = Dimensions.get('window');


const separator = "###########################################################################################";

import {storyData} from "./Feeds/FakeJSONData/TempStoryData";
import {B} from "./Feeds/Shared_Objects/Bold";
import PrivateProfileDisplay from './PrivateProfileDisplay';


class PrivateProfile extends Component {

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
        this.unsubscribe = this.usersFollowingRef.onSnapshot(this.getData);
        this.unsubscribe = this.usersFollowingRef.onSnapshot(this.getProfileInfo);
        //HELLO DELETE Later
        this.setState({
            storiesDataLoaded: true,
            storiesData: storyData
        });
    }


    // This method is passed all the userID's of the users this user is following
    getData = async () => {

        const videosDataFetched = [];
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
                            privatePosts.forEach((userPost) => {

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

                                        if (mediaType === "video") {

                                            this.setState({
                                                videosReceived: this.state.videosReceived + 1
                                            });

                                            videosDataFetched.push({
                                                key: userPost.id,
                                                caption: caption,
                                                createdAt: createdAt,
                                                downloadURL: downloadURL,
                                                mediaType: mediaType,
                                                commentsCount: commentsCount,    // Needs be retrieved inside the comment method
                                                profile: profileImage,
                                                name: name,
                                                userID: userID,
                                            });
                                        } else if (mediaType === "picture") {

                                            this.setState({
                                                picturesReceived: this.state.picturesReceived + 1
                                            });

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
                                           
                                        }
                                         

                                //        console.log(`\nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${userPost.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} `);
                                 //       console.log(`\n\nProcessed Users Count = ${processedFollowingUsers} | Expected Users Count = ${expectedFollowingUsersCount}`);

                                       
                                     //       console.log("\nSetting Data To Variable")
                                            this.setState({
                                                videosDataFetched: videosDataFetched,
                                                picturesDataFetched: picturesDataFetched,
                                            }, () => {
                                                this.setStatesForLoadingFeed()
                                            });
                                        

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
       
        const profileDataFeteched = [];
        

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
               
               this.setState({
                profileDataFeteched: profileDataFeteched,
                
            }, () => {
                this.setStatesForLoadingFeed()
            });
            
            profileDataFeteched.push({
                key: this.state.userId,
                bio: bio,
                followers: followers,
                following: following,
                name: name,
                username: username,
                profileimage: profileimage,
                profile: profileimage,
            })
        })
 
    }

    

    setStatesForLoadingFeed() {
    
            this.setState({
                loadVideos: true
            });
        
        
            this.setState({
                loadPictures: true
            });
        

        this.setState({
            videosIsLoading: false,
            picturesIsLoading: false
        });
    }

    render() {

        return (
            <ScrollView style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>

                <View>
                    <PrivateProfileDisplay
                    userID={this.state.userId}
                    data={this.state.profileDataFeteched}
                    navigation={this.props.route.params.navigation}
                    />
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
                                {this.state.loadPictures
                                    ?
                                    <Feed_PictureFeed
                                        userID={this.state.userId}
                                        data={this.state.picturesDataFetched}
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

export default PrivateProfile;