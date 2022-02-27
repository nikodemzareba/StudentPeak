import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import {feedStyles} from "../Shared_Objects/Styles";
import Stories_FlatList from "../Shared_Objects/Stories/Stories_FlatList";
import Pictures_And_Videos_Post_Object from "../Shared_Objects/Pictures_And_Videos_Post_Object";
import {B} from "../Shared_Objects/Bold";
import Trending_Topics_TXT from "./Trending_Feed_Objects/Trending_Topics_TXT";
import {tempPopularTopics} from "../FakeJSONData/Temp_Topics";
import Trending_Topics_FlatList from "./Trending_Feed_Objects/Trending_Topics_FlatList";
import Trending_Posts_FlatList from "./Trending_Feed_Objects/Trending_Posts_FlatList";
import firebase from "firebase";


export default function Trending_Pictures_And_Videos_Feed(props) {

    let
        loadDefault = false,
        dataType = props.type,
        userID = props.userID,
        navigation = props.navigation,

        // Stories Data
        storiesData = [],
        storiesDataReceived = 0,
        storiesDataIsLoading = true,
        loadStoriesData = false,

        // Friends Liked Data
        friendsLikedDataFetched = [],
        friendsLikedDataReceived = 0,
        friendsLikedDataIsLoading = true,
        loadFriendsLikedData = false,

        // Trending Data
        viralDataFetched = [],
        viralDataReceived = 0,
        viralDataIsLoading = true,
        loadViralData = false,

        // Trending Topics 
        trendingTopicsDataFetched = [],
        trendingTopicsDataReceived = 0,
        trendingTopicsDataIsLoading = true,
        loadTrendingTopicsData = false
    ;

    const [refresh, setRefresh] = useState(false);

    const usersFollowingRef = firebase.firestore()
        .collection('following')
        .doc(userID)
        .collection('userFollowing')

    const popularPostsRef = firebase.firestore()
        .collection("postData")
        .orderBy("likesCount")
        .where("mediaType", "==", dataType)
        .limitToLast(50)


    const popularPostTopicsRef = firebase.firestore()
        .collection("postTags")
        .orderBy("numberOfPosts")
        .limitToLast(50)

    const popularStoriesRef = firebase.firestore()
        .collection("stories")
        .orderBy("views")
        .limitToLast(50)

    const getPopularStories = async (querySnapshot) => {

        storiesDataIsLoading = false;
        loadStoriesData = false;
    }

    const getPopularPosts = async (querySnapshot) => {

        const dataFetched = [];
        let resultsSize = querySnapshot.size;
        let receivedPosts = 0;

        await querySnapshot.forEach((postData) => {
            console.log(`\n\nGot popular Posts `)

            receivedPosts++;
            viralDataReceived++;

            firebase.firestore()
                .collection('users')
                .doc(postData.get("userID"))
                .get()
                .then(userDetails => {

                    const profileImage = userDetails.get("profileimage");
                    const username = userDetails.get("username");
                    const userID = postData.get("userID");

                    const caption = postData.get("caption");
                    const createdAt = postData.get("createdAt");
                    const downloadURL = postData.get("downloadURL");
                    const mediaType = postData.get("mediaType");

                    const commentsCount = postData.get("commentsCount");

                    friendsLikedDataReceived++;

                    dataFetched.push({
                        key: postData.id,
                        userID: userID,
                        name: username,
                        profile: profileImage,
                        caption: caption,
                        createdAt: createdAt,
                        downloadURL: downloadURL,
                        mediaType: mediaType,

                        commentsCount: commentsCount, // Needs be retrieved inside the comment method
                    });

                    if (receivedPosts === resultsSize) {

                        viralDataFetched = dataFetched;
                        viralDataIsLoading = false;
                        loadViralData = true;
                    }
                })
                .catch((error) => {
                    console.log(`${error} \nUnable to get User we are followings data! `);
                });
        })

        if (resultsSize === 0) {
            viralDataIsLoading = false;
            loadViralData = false;
        }
    }

    const getFriendsLikePosts = async (querySnapshot) => {

        const dataFetched = [];
        let resultsSize = querySnapshot.size;
        let receivedDataCount = 0;

        // For each user we are following
        await querySnapshot.forEach((userFollowing) => {

            // console.log(`\n\nGot friends liked posts `)
            receivedDataCount++;

            // Get all of the posts this user we are following has liked
            firebase.firestore()
                .collection('posts')
                .doc(userFollowing.id)
                .collection('postsUserHasLiked')
                .get()
                .then(usersFollowingsLikedPosts => {

                    // For each post the user we are followed has liked
                    usersFollowingsLikedPosts.forEach((likedPost) => {

                        // Get the posts details
                        firebase.firestore()
                            .collection('postData')
                            .doc(likedPost.id)
                            .get()
                            .then((postData => {

                                firebase.firestore()
                                    .collection('users')
                                    .doc(postData.get("userID"))
                                    .get()
                                    .then(userDetails => {

                                        friendsLikedDataReceived++;

                                        const profileImage = userDetails.get("profileimage");
                                        const username = userDetails.get("username");
                                        const userID = postData.get("userID");

                                        const caption = postData.get("caption");
                                        const createdAt = postData.get("createdAt");
                                        const downloadURL = postData.get("downloadURL");
                                        const mediaType = postData.get("mediaType");

                                        const commentsCount = postData.get("commentsCount");

                                        dataFetched.push({
                                            key: likedPost.id,
                                            userID: userID,
                                            name: username,
                                            profile: profileImage,
                                            caption: caption,
                                            createdAt: createdAt,
                                            downloadURL: downloadURL,
                                            mediaType: mediaType,

                                            commentsCount: commentsCount,    // Needs be retrieved inside the comment method
                                        });


                                        console.log(`\nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${likedPost.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} `);
                                        console.log(`\n\nProcessed Users Count = ${receivedDataCount} | Expected Users Count = ${resultsSize}`);

                                        if (receivedDataCount === resultsSize) {

                                            friendsLikedDataFetched = dataFetched;
                                            friendsLikedDataIsLoading = false;
                                            loadFriendsLikedData = true;
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(`${error} \nUnable to get User we are followings data!`);
                                    });

                            }))
                            .catch((error) => {
                                console.log(`${error} \nUnable to get Users following post data!`);
                            });
                    })
                })
                .catch((error) => {
                    console.log(`${error} \nUnable to get Users following posts!`);
                });

        })

        if (resultsSize === 0) {

            friendsLikedDataIsLoading = false;
            loadFriendsLikedData = false;
        }
    }

    const getPopularTopics = async (querySnapshot) => {

        let data = [];
        let resultsSize = querySnapshot.size;
        let receivedDataCount = 0;

        await querySnapshot.forEach((trendingTopic) => {

            // console.log(`\n\nGot popular Topics `)

            receivedDataCount++
            trendingTopicsDataReceived++;

            data.push({
                key: receivedDataCount,
                topic: `${trendingTopic.id}`
            });

            if (resultsSize === receivedDataCount) {
                console.log("\n\nSetting  Trending Tags Data To Variable")

                trendingTopicsDataFetched = data;
                trendingTopicsDataIsLoading = false;
                loadTrendingTopicsData = true;
            }
        })

        if (resultsSize === 0) {

            trendingTopicsDataIsLoading = false;
            loadTrendingTopicsData = false;
        }
    }

    const getData =() => {
        usersFollowingRef.onSnapshot(getFriendsLikePosts);
        //popularPostsRef.onSnapshot(getPopularPosts);
        popularPostTopicsRef.onSnapshot(getPopularTopics);
        //popularStoriesRef.onSnapshot(getPopularStories);

        storiesDataIsLoading = false;
        loadStoriesData = false;
        viralDataIsLoading=false;
    }

    getData();



    return (
        <>
            {loadDefault === true
                ?
                <View style={feedStyles.screenBackground}>

                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}>
                        <B>Popular Posts</B>
                    </Text>

                    <Stories_FlatList storyData={props.storyData}/>

                    <Trending_Topics_FlatList navigation={props.navigation} data={tempPopularTopics}/>

                    <Trending_Posts_FlatList navigation={props.navigation} data={props.data} text={"Friends Like"}/>

                    <Trending_Posts_FlatList navigation={props.navigation} data={props.data} text={"Going Viral"}/>


                </View>
                :
                <>
                    { !storiesDataIsLoading && !friendsLikedDataIsLoading && !viralDataIsLoading && !trendingTopicsDataIsLoading
                        ?
                        <View style={feedStyles.screenBackground}>

                            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}>
                                <B>Popular Posts</B>
                            </Text>

                            <Stories_FlatList storyData={props.storyData}/>

                            <Trending_Topics_FlatList
                                navigation={props.navigation}
                                data={trendingTopicsDataFetched}
                            />

                            <Trending_Posts_FlatList
                                navigation={props.navigation}
                                data={friendsLikedDataReceived}
                                text={"Friends Like"}
                            />

                            <Trending_Posts_FlatList
                                navigation={props.navigation}
                                data={props.data}
                                text={"Going Viral"}
                            />

                        </View>
                        :
                        <View style={feedStyles.loading}>
                            <ActivityIndicator size="large" color="red"/>
                        </View>
                    }
                </>

            }
        </>
    )
}

