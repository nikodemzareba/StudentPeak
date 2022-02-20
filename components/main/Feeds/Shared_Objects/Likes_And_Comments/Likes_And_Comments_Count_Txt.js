import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {B} from "../Bold";
import firebase from "firebase";


export default function Likes_And_Comments_Count_Txt(props) {


    const splitNumberByCommas = (value) => {

        const stringVal = `${value}`;
        const txt_Split = Array.from(stringVal);
        const txtLength = txt_Split.length;

        let result = "";
        let count = 0;

        for (let i = txtLength - 1; i >= 0; i--) {


            if (count !== 0 && count % 3 === 0) {
                result = "," + result;
            }
            result = `${txt_Split[i]}` + result;
            count++;
        }
        return result;
    }

    const getPostLikeData = async () => {

        // Get Users who liked the post
        const postLikeData = [];

        firebase.firestore()
            .collection('postData')
            .doc(props.postID)
            .collection("likes")
            .get()
            .then(async (usersLiked) => {

                // Get Users Profile Pics and names
                const expectedUsers = usersLiked.size;
                let processedUsers = 0;

                await usersLiked.forEach((user) => {
                    processedUsers++;
                    firebase.firestore()
                        .collection('users')
                        .doc(user.id)
                        .get()
                        .then(userDetails => {
                            firebase.firestore()
                                .collection('following')
                                .doc(props.userID)
                                .collection('userFollowing')
                                .doc(userDetails.id)
                                .get()
                                .then(followingUser => {

                                    let following = false;
                                    if (followingUser.exists) {
                                        following = true;
                                    }
                                    const userID = userDetails.id;
                                    const username = userDetails.get("username");
                                    const profileImage = userDetails.get("profileimage");

                                    postLikeData.push({
                                        key: userID,
                                        username: username,
                                        following: following,
                                        profileImage: profileImage,

                                    });

                                    console.log(`\n\ngetPostLikeData():  Data Fetch \npostID: ${props.postID} \nOurUSerID: ${props.userID} \nUserWhoLikedPostID: ${userID} \nUsername: ${username}\nProfileImage: ${profileImage}`);

                                    console.log(`\n\nCurrentCount ${expectedUsers} \nExpectedCount: ${processedUsers}`);

                                    if (expectedUsers === processedUsers) {

                                        // const postLikeData = r;
                                        const userID = props.userID;
                                        const postID = props.postID;

                                        console.log(`\n\n#######################################################################`);
                                        console.log(`\n\ngetPostLikeData():  Going to UsersLikedPost() \nUserID: ${userID} \nUsername: ${username}\nPostLikeData: ${postLikeData}`);
                                        props.navigation.navigate("UsersLikedPost", {userID, postID, postLikeData});

                                        // return postLikeData;
                                    }
                                })
                                .catch((exception) => {
                                    alert(`\nError seeing if you follow user \n\n${exception}`);
                                    console.log(`\nError seeing if you follow user \n\n${exception}`);
                                })

                        })
                        .catch((exception) => {
                            alert(`\nError getting users details \n\n${exception}`);
                            console.log(`\n\nError getting users details ${props.postID}`);
                        })
                })

            })
            .catch((exception) => {
                alert(`\nError getting users who liked this post\n\n${exception}`);
                console.log(`\n\nError getting users who liked this post ${props.postID}`);
            })
    }
    return (

        <TouchableOpacity
            onPress={() => {

                // props.navigation.navigate("PublicProfile", {uid: props.userID})
                if (props.use === "like") {
                    console.log(`\n\nLikes BTN Function Requested`)

                    getPostLikeData();

                } else if (props.use === "comment") {
                    console.log(`\n\nGo to Likes Comments Page`)
                    // props.navigation.navigate("PublicProfile", {uid: props.userID})
                }

            }}
        >
            <Text style={{marginLeft: 10, color: 'white', fontSize: 15, fontWeight: 'bold', paddingRight: 10}}>
                <B>{splitNumberByCommas(props.count)}</B>
            </Text>
        </TouchableOpacity>
    )
}