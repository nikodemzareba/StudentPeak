import React, {Component, useState} from 'react'
import { View, Dimensions, FlatList, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import VideoPlayer from "./feedControl/components/VideoPlayer";
import firebase from "firebase";


const { height, width } = Dimensions.get('window');
const DATA = require("./feedControl/data.json").videos;
const videosData = DATA.map((item, i) => {
    return {...item, key: i}
});

const data2 = [
    {
       ty:"Hello"
    },
    {
        ty:"Hello"
    }
];

const seperator = "####################################################################################";
console.log(`\n\n${seperator} \n\nData2${data2} \n\n${seperator}`);
console.log(`\n\n${seperator} \n\nData2 ${data2[0].ty} \n\n${seperator}`);

class FeedScreen extends Component{


    constructor(props) {
        super(props);
        this.state = {
            outOfBoundItems:[],
            dataFetched: firebase.firestore()
                .collection('following')
                .doc(firebase.auth().currentUser.uid)
                .collection('userFollowing')
                .get()
                .then(snapshot => {
                    const data = [];
                    snapshot.forEach((user) => {
                        console.log(`\n\nUsersID: ${user.id}`);
                        firebase.firestore()
                            .collection('posts')
                            .doc(user.id)
                            .collection('userPosts')
                            .where("mediaType", "==", "video")
                            .get()
                            .then(usersFollowingPosts => {
                                usersFollowingPosts.forEach((userPost) => {
                                    data.push({
                                        userID: user.id,
                                        postID: userPost.id,
                                        caption: userPost.get("caption") ,
                                        createdAt: userPost.get("createdAt"),
                                        downloadURL: userPost.get("downloadURL")
                                    });
                                    console.log("\nPostID : " + userPost.id + " | MediaType: "+ userPost.get("mediaType") + " | Download URL: " + userPost.get("downloadURL"));
                                })
                            })
                            .catch((error) => {
                                console.log(`${error} \nUnable to get Users following posts!`);
                            });
                    })
                    console.log(`\n\n${seperator} \n${seperator} \n\nData Retrieved  ${data} \n\n${seperator} \n${seperator}`)
                    return data;
                })
                .catch((error) => {
                    console.log(`${error} \nUnable to Get users Following!`);
                })
        };

        // const jsonData = this.state.dataFetched;
        // console.log(`\n\n${seperator} \nData Retrieved Caption 1 ${jsonData[0]} \n\n${seperator}`)
    }

    handleViewableItemsChanged = ({ changed }) => {

        const outOfBoundItems = changed;

        if(outOfBoundItems.length !== 0) {
            this.setState({outOfBoundItems});
        }

    };


    renderPosts = ({ item, index }) => {
        return <VideoPlayer
            height={height/1.6}
            width={width}
            videoUri={item.video}
            item={item}
            outOfBoundItems={this.state.outOfBoundItems}
        />
    }


    render() {
        return (
            <View style={{flex:1}}>
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
        )
    }

}


export default FeedScreen;