import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import firebase from "firebase";

import {Octicons} from '@expo/vector-icons';
import {feedStyles} from "../Styles";
import Likes_And_Comments_Count_Txt from "./Likes_And_Comments_Count_Txt";

export default function LikeBTN(props) {

    const [likeState, setLikeState] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(0);
    const [likeDataLoaded, setLikeDataLoaded] = useState(false);

    const userLoggedIn = firebase.auth().currentUser.uid;

    console.log(`\n\nLikeBTN() \nPostID: ${props.postID} \nCurrentUserID: ${userLoggedIn} \nUserIDRelatedToPost: ${props.userID} \nUserLikedPost: ${likeState} \nLikesCount: ${currentLikes}`);


    const addUserInLikesRef =
        firebase.firestore()
            .collection('postData')
            .doc(props.postID)
            .collection("likes")

    const increaseLikesRef =
        firebase.firestore()
            .collection('postData')
            .doc(props.postID)

    const storePostInUsersLiked =
        firebase.firestore()
            .collection('posts')
            .doc(userLoggedIn)
            .collection("postsUserHasLiked")


    // set initial state of button each time it has been re-rendered from a flatList
    const likeBTN_Initiation = () => {
        let currentLikeState, likeCount;

        // Get Post Like Count
        increaseLikesRef.get().then((dbCurrentLikes) => {

            likeCount = dbCurrentLikes.get("likesCount");

            // Get Post Like State
            firebase.firestore()
                .collection('postData')
                .doc(props.postID)
                .collection("likes")
                .doc(userLoggedIn)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        currentLikeState = true;
                        return;
                    }
                    currentLikeState = false;
                })
                .then(() => {
                    setCurrentLikes(likeCount)
                    setLikeState(currentLikeState)
                    setLikeDataLoaded(true)
                })
        })
    }

    likeBTN_Initiation();

    const BTN_Event = () => {

        if (likeDataLoaded) {
            try {
                const newState = !likeState;
                const addOrMinusLike = newState ? 1 : -1; // -1 like if the user unliked and add +1 if the user liked

                console.log(`\n\nAttempting to ${addOrMinusLike} post ${props.postID}`);

                if (newState) // add likes
                {
                    // add users id to likes db
                    addUserInLikesRef
                        .doc(userLoggedIn)
                        .set({})
                        .then(() => {

                            console.log(`\n\nAdded usersName to likes Collection ${props.postID}`);
                            storePostInUsersLiked
                                .doc(props.postID)
                                .set({})
                                .then(() => {
                                    console.log(`\n\nAdded PostID to  users likes Collection ${props.postID}`);
                                    changeLikesState(addOrMinusLike, newState);
                                })
                                .catch((exception) => {
                                    alert(`\nError Adding PostID to  users likes Collection \n\n${exception}`);
                                    console.log(`\n\nError Adding PostID to  users likes Collection ${props.postID} \n\n${props.postID}`);
                                })

                        })
                        .catch((exception) => {
                            alert(`\nError liking post \n\n${exception}`);
                            console.log(`\n\nError Adding usersName to likes Collection ${props.postID} \n\n${props.postID}`);
                        })
                } else // remove likes
                {
                    // remove users id from likes db
                    addUserInLikesRef.doc(userLoggedIn).delete()
                        .then(() => {
                            console.log(`\n\nRemoved usersName to likes Collection ${props.postID}`);

                            // remove users id from likes db
                            storePostInUsersLiked.doc(props.postID).delete()
                                .then(() => {
                                    console.log(`\n\nRemoved PostID to  users likes Collection ${props.postID}`);
                                    changeLikesState(addOrMinusLike, newState);
                                })
                                .catch((exception) => {
                                    alert(`\nError Removing PostID to  users likes Collection\n\n${exception}`);
                                    console.log(`\n\nError Removing PostID to  users likes Collection ${props.postID} \n\n${props.postID}`);
                                })
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
    }

    const changeLikesState = (addOrMinusLike, newState) => {

        // Increase / decreaseLikes
        increaseLikesRef
            .update({
                likesCount: firebase.firestore.FieldValue.increment(addOrMinusLike)
            })
            .then(() => {
                console.log(`\n\nChanged post Likes by ${addOrMinusLike} to post ${props.postID}`);
                // Get current DB Value for likes on this post
                increaseLikesRef.get().then((dbCurrentLikes) => {

                    // Change Likes State
                    setCurrentLikes(dbCurrentLikes.get("likesCount"))
                    setLikeState(newState);

                    console.log(`\n\nSetting Local states for like BTN`);
                    console.log(`\n\nPostID: ${props.postID} \nCurrentUserID: ${userLoggedIn} \nUserLikedPost: ${likeState} \nLikesCount: ${currentLikes}`);
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
            <Likes_And_Comments_Count_Txt  userID={userLoggedIn} postID={props.postID} use={"like"} count={currentLikes} navigation={props.navigation}/>
        </View>
    )
}


