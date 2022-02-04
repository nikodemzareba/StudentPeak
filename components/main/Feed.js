import React, {Component, useState} from 'react'
import {View, Dimensions, FlatList, Text, ActivityIndicator, ScrollView, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import VideoPlayer from "./feedControl/components/VideoPlayer";
import firebase from "firebase";
import ListItem from "react-native-paper/src/components/List/ListItem";


const {height, width} = Dimensions.get('window');
const DATA = require("./feedControl/data.json").videos;
const videosData = DATA.map((item, i) => {
    return {...item, key: i}
});

const data2 = [
    {
        ty: "Hello"
    },
    {
        ty: "Hello"
    }
];

const separator = "####################################################################################";
console.log(`\n\n${separator} \n\nData2${data2} \n\n${separator}`);
console.log(`\n\n${separator} \n\nData2 ${data2[0].ty} \n\n${separator}`);

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
                        console.log(`\n\nUserID: ${user.id} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType}`);
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
    }


    render() {
        if (this.state.isLoading) {
            console.log(`\n\n${separator} \n\nData Fetched ${this.state.dataFetched} \n\n${separator}`);
            return (
                <View >
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )
        }


        return (
            <View style={{flex:1}}>
                <Button
                    title="Press me"
                    color="#f194ff"
                    onPress={() => {
                        console.log(`\n\n${separator}`);

                        console.log(`\n\nData Fetched OBJECT: ${this.state.dataFetched}`);

                        console.log(`\n\nFirst Object Data`);
                        console.log(`\nKey: ${this.state.dataFetched[0].key}`);
                        console.log(`\nuserID: ${this.state.dataFetched[0].userID}`);
                        console.log(`\nCaption: ${this.state.dataFetched[0].caption}`);
                        console.log(`\nCreatedAt: ${this.state.dataFetched[0].createdAt}`);
                        console.log(`\ndownloadURL: ${this.state.dataFetched[0].downloadURL}`);

                        console.log(`\n\n${separator}`);
                    }}
                />
                <FlatList
                    style={{ flex:1 }}
                    contentContainerStyle={{paddingTop:25}}
                    data={videosData}
                    renderItem={this.renderPosts}
                    horizontal={false}
                    scrollEventThrottle={20}
                    showsVerticalScrollIndicator={false}
                    onViewableItemsChanged={this.handleViewableItemsChanged}
                    viewabilityConfig={{itemVisiblePercentThreshold: 30,  waitForInteraction: true}}
                    overScrollMode="never"
                />
            </View>
        );
    }

}


export default FeedScreen;