import {TouchableOpacity, View, Text, Image} from 'react-native';
import React, {Component} from "react";
import firebase from "firebase";

export default function Find_Post_Object(props) {

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

                                    if(count===resultSize)
                                    {
                                        const data = postsData;
                                        props.navigation.navigate("SearchScreenResults", {postTag: props.postTag, data:data})
                                    }
                                })
                        })
                })


            })
    }

    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
        }}

                          onPress={getPosts}
        >
            <Image
                source={require('../Objects/SearchIcon.png')}
                style={{width: 50, height: 50, marginLeft: 5, marginRight: 15}}
            />

            <Text style={{marginLeft: 10, color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
                {props.postTag}
            </Text>

        </TouchableOpacity>
    )
}

