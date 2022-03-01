import {
    ScrollView,
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React, {useEffect, Component, useState} from 'react'
import {feedStyles} from "../Feeds/Shared_Objects/Styles";
import firebase from "firebase";
import {Video} from "expo-av";
import {SimpleLineIcons} from "@expo/vector-icons";
import SearchScreenObject from "./Objects/SearchScreenObject";

export default function SearchScreenResults(props) {

    console.log(`\n\nSearchScreenResults() \n${props.route.params.postTag}`)
    const [posts, setPosts] = useState([])

    const getPosts = (tag) => {

        // Get the posts related to the tag (results = postID's)
        firebase.firestore()
            .collection('postTags')
            .doc(tag)
            .collection('posts')
            .get()
            .then((posts) => {

                const resultSize = posts.size;
                let count = 0;
                let postsData = []

                // For each postID
                posts.forEach((post) => {

                    // For each postID get its data
                    firebase.firestore()
                        .collection('postData')
                        .doc(post.id)
                        .get()
                        .then((postData) => {

                            count++;

                            // Get the user who posted the post's DATA
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

                                    postsData.push({
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

                                    console.log(`\nSearchScreenResults getPosts()  \nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${postData.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} `);

                                    if (count === resultSize) {
                                        console.log(`\n\nSetting Results `);
                                        setPosts(postsData);
                                    }
                                })
                        })
                })


            })
    }
    useEffect(() => {
        getPosts(props.route.params.postTag);

    }, []);


    return (
        <View style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>
            <View style={feedStyles.screenBackground}>
                <View style={{paddingTop: 10, height: 30}}>
                </View>
                {/*<View style={{backgroundColor: "white", justifyContent: "center", height: 50}}>*/}
                {/*    <TextInput*/}
                {/*        placeholder={props.route.params.postTag} onChangeText={(tag) => {*/}

                {/*        if (tag !== undefined || tag !== "") {*/}
                {/*            getPosts(tag)*/}
                {/*            console.log(`\n\nGetting Posts for tag ${tag}`)*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    />*/}
                {/*</View>*/}

                <TouchableOpacity
                    onPress={() => {
                        const navigation = props.route.params.navigation;
                        props.route.params.navigation.navigate("Search", {navigation:navigation})
                    }}
                >
                    <SimpleLineIcons
                        style={styles.icon}
                        name="arrow-left"
                        size={20}
                        color="white"

                    />
                </TouchableOpacity>

                <View style={{paddingTop: 10, height: 30}}>
                </View>


                    <FlatList
                        data={posts}
                        //Setting the number of column
                        numColumns={3}
                        renderItem={({item}) => (
                            <SearchScreenObject item={item} navigation={props.route.params.navigation}/>
                        )}

                    />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});