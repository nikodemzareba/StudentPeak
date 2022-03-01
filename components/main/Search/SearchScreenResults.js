import {ScrollView, View, Text} from "react-native";
import React, {useEffect, Component, useState} from 'react'
import {feedStyles} from "../Feeds/Shared_Objects/Styles";
import firebase from "firebase";

export default function SearchScreenResults(props) {

    const getPosts = () => {

        // Get the posts related to the tag (results = postID's)
        firebase.firestore()
            .collection('postTags')
            .doc(props.postTag)
            .collection('posts')
            .get()
            .then((posts) =>{

                const resultSize = posts.size;
                let count =0;
                let postsData =[]

                // For each postID
                posts.forEach((post) =>{

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

                                    console.log(`\nFind_Post_Object() \nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${postData.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} `);

                                    if(count===resultSize)
                                    {
                                        const data = postsData;

                                    }
                                })
                        })
                })


            })
    }


    console.log(`\n\nSearchScreenResults() \n${props.route.params.postTag}`)
    if(props.data !== undefined) {
        props.data.foreach((item) => {
            console.log(`\n\n${item.key}`)
        })
    }

    return (
        <ScrollView style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>
            <View style={feedStyles.screenBackground}>
                <View style={{ paddingTop: 10, height: 30}}>
                </View>
           
                <Text style={{color:"white"}}> Results Screen </Text>
            </View>
        </ScrollView>
    )
}