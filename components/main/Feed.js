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
        console.log("\n\nHERE")
    }

    getData = (querySnapshot) => {
        const dataFetched = [];
        querySnapshot.forEach((user) => {
            console.log(`\n\nUsersID: ${user.id}`);
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
                            userID: user.id,
                            caption,
                            createdAt,
                            downloadURL,
                        });
                        console.log(`\nPostID : " + userPost.id \nUserID: ${user.id} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType}`);
                        console.log("\nPostID : " + userPost.id + " | MediaType: " + userPost.get("mediaType") + " | Download URL: " + userPost.get("downloadURL"));
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

    renderPosts = ({item}) => {
        return <VideoPlayer
            height={height / 1.6}
            width={width}
            videoUri={item.video}
            item={item}
            outOfBoundItems={this.state.outOfBoundItems}
        />
    }// REMOVE

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
            console.log(`\n\n${separator} \n\nData Fetched ${this.state.dataFetched} \n\n${separator}`);
            return (
                <View style={styles.loading} >
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )
        }

        return (
            <View style={{flex:1}}>
                <FlatList
                    style={{ flex:1 }}
                    contentContainerStyle={{paddingTop:25}}
                    data={this.state.dataFetched}
                    renderItem={this.renderUserFollowingPosts}
                    horizontal={false}
                    scrollEventThrottle={20}
                    showsVerticalScrollIndicator={false}
                    onViewableItemsChanged={this.handleViewableItemsChanged}
                    viewabilityConfig={{itemVisiblePercentThreshold: 30,  waitForInteraction: true}}
                    overScrollMode="never"
                />
                {/* REMOVE*/ }
                {/*<FlatList*/}
                {/*    style={{ flex:1 }}*/}
                {/*    contentContainerStyle={{paddingTop:25}}*/}
                {/*    data={videosData}*/}
                {/*    renderItem={this.renderPosts}*/}
                {/*    horizontal={false}*/}
                {/*    scrollEventThrottle={20}*/}
                {/*    showsVerticalScrollIndicator={false}*/}
                {/*    onViewableItemsChanged={this.handleViewableItemsChanged}*/}
                {/*    viewabilityConfig={{itemVisiblePercentThreshold: 30,  waitForInteraction: true}}*/}
                {/*    overScrollMode="never"*/}
                {/*/>*/}
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