import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {B} from "../Bold";
import firebase from "firebase";


export default function Likes_And_Comments_Count_Txt(props) {


    const splitNumberByCommas = (value) => {

        console.log(`\nLikePost Value: ${value}`)

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

        console.log(`\ngetPostLikeData()`)
        // Get Users who liked the post
        const tempData = [];

        firebase.firestore()
            .collection('postData')
            .doc(props.postID)
            .collection("likes")
            .get()
            .then((usersLiked) => {

                // Get Users Profile Pics and names
                const expectedUsers = usersLiked.size;
                let processedUsers = 0;

                usersLiked.forEach((user) => {

                    processedUsers++;
                    firebase.firestore()
                        .collection('users')
                        .doc(user.id)
                        .get()
                        .then(userDetails => {
                            let following = false;
                            firebase.firestore()
                                .collection('following')
                                .doc(props.userID)
                                .collection('userFollowing')
                                .doc(userDetails.id)
                                .get()
                                .then(followingUser => {
                                    if (followingUser.exists) {
                                        following = true;
                                    }
                                    const userID = userDetails.id;
                                    const username = userDetails.get("username");
                                    const profileImage = userDetails.get("profileimage");

                                    tempData.push({
                                        key: userID,
                                        username: username,
                                        following: following,
                                        profileImage: profileImage,

                                    });

                                    if (expectedUsers === processedUsers) {
                                        //  setPostLikeData(tempData);
                                        console.log(`\n\nGoing to Likes Count Page`)
                                        //props.navigation.navigate("PublicProfile", {uid: props.userID})

                                        const userID = props.userID;
                                        const postID = props.postID;
                                        const postLikeData = tempData;

                                        console.log(`\n\nShowing liked results ${postLikeData} tempData ${tempData}`)
                                        props.navigation.navigate("UsersLikedPost",{userID, postID, postLikeData})
                                    }

                                    console.log(`\n\nUserID: ${userID} \nUsername: ${username}\nProfileImage: ${profileImage}}`);
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
        <Text style={{marginLeft: 10, color: 'white', fontSize: 15, fontWeight: 'bold', paddingRight:10}}
              onPress={() => {

                  // props.navigation.navigate("PublicProfile", {uid: props.userID})
                  if (props.use === "like") {
                      console.log(`\n\nGo to Likes Count Page`)

                      //getPostLikeData();

                      const userID = props.userID;
                      const postID = props.postID;
                      const postLikeData = [];

                      props.navigation.navigate("UsersLikedPost",{userID, postID, postLikeData})

                  } else if (props.use === "comment") {
                      console.log(`\n\nGo to Likes Comments Page`)
                      // props.navigation.navigate("PublicProfile", {uid: props.userID})
                  }

              }
              }>
           <B>{splitNumberByCommas(props.count)}</B></Text>
    )
}