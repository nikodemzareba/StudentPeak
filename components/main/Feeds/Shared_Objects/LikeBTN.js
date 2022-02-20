import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {Image, TouchableOpacity, View, StyleSheet} from "react-native";
import firebase from "firebase";

import {Octicons} from '@expo/vector-icons';
import {feedStyles} from "./Styles";
import Likes_And_Comments_Count_Txt from "./Likes_Count_Txt";

export default function LikeBTN(props) {

    const [likeState, setLikeState] = useState(props.userLikedPost);
    const [currentLikes, setCurrentLikes] = useState(props.likesCount);

    console.log(`\n\nPostID: ${props.postID} \ncurrentUserID: ${props.userID} \nUserLikedPost: ${likeState} \nLikesCount: ${currentLikes}`);


    const addUserInLikesRef =
        firebase.firestore()
            .collection('postData')
            .doc(props.postID)
            .collection("likes")

    const increaseLikesRef =
        firebase.firestore()
            .collection('postData')
            .doc(props.postID)


    const BTN_Event = () => {
        try {
            const newState = !likeState;
            const addOrMinusLike = newState ? 1 : -1; // -1 like if the user unliked and add +1 if the user liked

            console.log(`\n\nAttempting to ${addOrMinusLike} post ${props.postID}`);

            if (newState) // add likes
            {
                // add users id to likes db
                addUserInLikesRef
                    .doc(props.userID)
                    .set({

                    })
                    .then(() => {
                        changeLikesState(addOrMinusLike, newState);
                        console.log(`\n\nAdded usersName to likes Collection ${props.postID}`);
                    })
                    .catch((exception) => {
                        alert(`\nError liking post \n\n${exception}`);
                        console.log(`\n\nError Adding usersName to likes Collection ${props.postID} \n\n${props.postID}`);
                    })
            } else // remove likes
            {
                // remove users id from likes db
                addUserInLikesRef.doc(props.userID).delete()
                    .then(() => {
                        changeLikesState(addOrMinusLike, newState);
                        console.log(`\n\nRemoved usersName to likes Collection ${props.postID}`);
                    })
                    .catch((exception) => {
                        alert(`\nError unliking post \n\n${exception}`);
                        console.log(`\n\nError Removing usersName to likes Collection ${props.postID} \n\n${props.postID}`);
                    })
            }
        } catch (e) {
            alert(`\nError liking /unliking post`);
            console.log(`\nError liking /unliking post \n\n${e}`);
        }

    }

    const changeLikesState = (addOrMinusLike, newState) => {

        // Increase / decreaseLikes
        increaseLikesRef
            .update({
                likesCount: firebase.firestore.FieldValue.increment(addOrMinusLike)
            })
            .then(r => {
                console.log(`\n\nChanged post Likes by ${addOrMinusLike} to post ${props.postID}`);
                // Get current DB Value for likes on this post
                increaseLikesRef.get().then((dbCurrentLikes) => {

                    // Change Likes State
                    setCurrentLikes(dbCurrentLikes.get("likesCount"))
                    setLikeState(newState);

                    console.log(`\n\nSetting Local states for like BTN`);
                    console.log(`\n\nPostID: ${props.postID} \ncurrentUserID: ${props.userID} \nUserLikedPost: ${likeState} \nLikesCount: ${currentLikes}`);
                })
            })
            .catch((exception) => {
                alert(`\nError Changing post  ${props.postID} likeCount by ${addOrMinusLike}  \n\n${exception}`);
                console.log(`\n\nError Adding usersName to likes Collection ${props.postID} \n\n${props.postID}`);
            })

    }

    return (

        <View style={feedStyles.likeAndCommentsBTN_View}>
            <TouchableOpacity
                onPress={() => {
                    BTN_Event();
                }}
            >
                {likeState === true
                    ?

                    <Ionicons name="ios-heart-sharp" size={24} color="red"/>

                    :
                    <Octicons name="heart" size={24} color="white"/>
                }
            </TouchableOpacity>
            <Likes_And_Comments_Count_Txt count={currentLikes}/>
        </View>
    )
}


