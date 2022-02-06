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
    SafeAreaView
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import VideoPlayer from "./feedControl/components/VideoPlayer";
import firebase from "firebase";

import {StatusBar} from "expo-status-bar";


const {height, width} = Dimensions.get('window');



const separator = "###################################################################################";

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

    getData = async (querySnapshot) => {
        const dataFetched = [];

        let expectedFollowingUsersCount = querySnapshot.size;
        console.log(`\nNumber of Users Following: ${expectedFollowingUsersCount}`)

        let processedFollowingUsers = 0;

        // Got users Following info
        console.log("\nGot Users Following Data")
        await querySnapshot.forEach((user) => {


            // Get the user we are following userName & userProfilePhoto

            firebase.firestore()
                .collection('users')
                .doc(user.id)
                .get()
                .then(userDetails => {

                    console.log("\nGot Users Following Details etc: username, profilePicture")

                    firebase.firestore()
                        .collection('posts')
                        .doc(user.id)
                        .collection('userPosts')
                        .where("mediaType", "==", "video")
                        .get()
                        .then(usersFollowingPosts => {
                            console.log("\nGot Posts Of Users i am Following")

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
                                processedFollowingUsers ++;
                                console.log(`\nUserID: ${user.id} \nUserName: ${userDetails.get("username")} \nProfile Picture: ${userDetails.get("profilePicture")}   \nPostID : ${userPost.id}  \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType}`);
                                console.log(`\nProcessed Users Count = ${processedFollowingUsers} | Expected Users Count = ${expectedFollowingUsersCount}`);

                                if(processedFollowingUsers === expectedFollowingUsersCount)
                                {
                                    console.log("\nSetting Data To Variable")
                                    this.setState({
                                        outOfBoundItems: [],
                                        dataFetched,
                                        isLoading: false
                                    });
                                }
                            })
                        })
                })


                .catch((error) => {
                    console.log(`${error} \nUnable to get Users following posts!`);
                });
        })
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

        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView
                        style={{ flex: 1 }}
                        horizontal={true}
                        scrollEventThrottle={16}
                        pagingEnabled={true}
                    >
                        <View style={{ width, height }}>

                            {this.state.isLoading
                                ?
                                <View style={styles.loading}>
                                    <ActivityIndicator size="large" color="red"/>
                                </View>
                                :
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
                            }

                        </View>

                        <View style={{ width, height }}>
                            <Text>Screen 2</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
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