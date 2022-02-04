import React, {Component, useState} from 'react'
import {View, Dimensions, FlatList, Text, ActivityIndicator, ScrollView, Button, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import VideoPlayer from "./feedControl/components/VideoPlayer";
import firebase from "firebase";
import ListItem from "react-native-paper/src/components/List/ListItem";


const {height, width} = Dimensions.get('window');

const DATA = require("./feedControl/data.json").videos;//REMOVE
const videosData = DATA.map((item, i) => {
    return {...item, key: i}
});//REMOVE


const separator = "####################################################################################";


class FeedScreen extends Component {


    constructor(props) {
        super(props);
        this.docs = firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
        this.state = {
            outOfBoundItems: [],
            dataFetched: [],
            isLoading: true
        };
    }

    handleViewableItemsChanged = ({changed}) => {

        const outOfBoundItems = changed;

        if (outOfBoundItems.length !== 0) {
            this.setState({outOfBoundItems});
        }

    };

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getData);
    }

    getData = (querySnapshot) => {
        const dataFetched = [];

        // Got users Following info
        querySnapshot.forEach((user) => {

            // Get the user we are following userName & userProfilePhoto
            firebase.firestore()
                .collection('users')
                .doc(user.id)
                .get()
                .then(userDetails => {

                    firebase.firestore()
                        .collection('posts')
                        .doc(user.id)
                        .collection('userPosts')
                        .where("mediaType", "==", "video")
                        .get()
                        .then(usersFollowingPosts => {

                            usersFollowingPosts.forEach((userPost) => {
                                const {caption, createdAt, downloadURL, mediaType} = userPost.data();
                                dataFetched.push({
                                    key: userPost.id,
                                    name: userDetails.get("username"),
                                    profile: userDetails.get("profilePicture"),
                                    caption,
                                    createdAt,
                                    downloadURL,
                                });
                                console.log(`\nUserID: ${user.id} \nUserName: ${userDetails.get("username")} \nProfile Picture: ${userDetails.get("profilePicture")}   \nPostID : ${userPost.id}  \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType}`);
                            })

                        })
                })


                .catch((error) => {
                    console.log(`${error} \nUnable to get Users following posts!`);
                });
        })
        this.setState({
            outOfBoundItems: [],
            dataFetched,
            isLoading: false
        });
    }

    renderUserFollowingPosts = ({item}) => {
        return <VideoPlayer
            height={height / 1.6}
            width={width}
            videoUri={item.downloadURL}
            item={item}
            outOfBoundItems={this.state.outOfBoundItems}
        />
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )
        }

        return (
            <View style={{flex: 1}}>
                <FlatList
                    style={{flex: 1}}
                    contentContainerStyle={{paddingTop: 25}}
                    data={this.state.dataFetched}
                    renderItem={this.renderUserFollowingPosts}
                    horizontal={false}
                    scrollEventThrottle={20}
                    showsVerticalScrollIndicator={false}
                    onViewableItemsChanged={this.handleViewableItemsChanged}
                    viewabilityConfig={{itemVisiblePercentThreshold: 30, waitForInteraction: true}}
                    overScrollMode="never"
                />

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
    }
})

export default FeedScreen;