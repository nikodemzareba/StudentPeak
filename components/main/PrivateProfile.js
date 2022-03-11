import React, {Component} from 'react'
import {
    View,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    FlatList
} from 'react-native';

import firebase from "firebase";


import {storyData} from "./Feeds/FakeJSONData/TempStoryData";
import PrivateProfileDisplay from './PrivateProfileDisplay';
import {feedStyles} from "./Feeds/Shared_Objects/Styles";
import SearchScreenObject from "./Search/Objects/SearchScreenObject";

import {useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';


class PrivateProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {

            profileImageLoaded: false,
            profileImage: "",
            userId:
            firebase.auth().currentUser.uid,

            mediaDataDataFetched: [],
            mediaDataIsLoading: true,
            loadMediaData: false,
        }
        this.usersFollowingRef = firebase.firestore()
            .collection('following')
            .doc(this.state.userId)
            .collection('userFollowing')
    }

    componentDidMount() {
        this.getData();
        this.getProfileInfo();
    }

    componentDidUpdate() {
        
        
          
           //  this.getData(this.props);
        this.getProfileInfo(this.props);
       // this.state.mediaDataDataFetched = [];
        
       }


    // This method is passed all the userID's of the users this user is following
    getData = async () => {

        const mediaDataDataFetched = [];

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

                        let expectedResultsSize = privatePosts.size;
                        let count = 0;

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
                                    const userID = this.state.userId;

                                    mediaDataDataFetched.push({
                                        key: userPost.id,
                                        caption: caption,
                                        createdAt: createdAt,
                                        downloadURL: downloadURL,
                                        mediaType: mediaType,
                                        profile: profileImage,
                                        name: name,
                                        userID: userID,
                                    });

                                    if (count === expectedResultsSize) {
                                        //       console.log("\nSetting Data To Variable")
                                        this.setState({
                                            mediaDataDataFetched: mediaDataDataFetched,
                                            loadMediaData: false
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


                {/* mediaData Feed */}
                {this.state.loadMediaData
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
                                data={this.state.mediaDataDataFetched}
                                numColumns={3}
                                renderItem={({item}) => (

                                    <SearchScreenObject
                                        item={item}
                                        navigation={this.props.route.params.navigation}
                                        comingFrom={"PrivateProfile"}
                                    />
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
})

export default PrivateProfile;