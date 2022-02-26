import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import firebase from "firebase";

import {Octicons} from '@expo/vector-icons';
import {feedStyles} from "../../Styles";
import Likes_And_Comments_Count_Txt from "../Likes_And_Comments_Count_Txt";
import {success} from "concurrently/dist/src/defaults";


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

    const BTN_Event = async () => {

        const newState = !likeState;
        const addOrMinusLike = newState ? 1 : -1; // -1 like if the user unliked and add +1 if the user liked
        let success = false;

        if (likeDataLoaded) {

            console.log(`\n\nAttempting to ${addOrMinusLike} post ${props.postID}`);

            if (newState) // add likes
            {
                try {
                    const result = await firebase.firestore().runTransaction(async (t) => {

                        // add users id to likes db
                        t.set(addUserInLikesRef.doc(userLoggedIn), {});

                        // add  postID to  users likes collection
                        t.set(storePostInUsersLiked.doc(props.postID), {});

                        // increase likes on post
                        t.update(increaseLikesRef, "likesCount", firebase.firestore.FieldValue.increment(addOrMinusLike))

                    }).then(() => {
                        console.log(`Transaction success liking post ${props.postID}!`);
                        success = true;
                    })
                } catch (e) {
                    console.log(`Transaction failure liking post ${props.postID}!\n\n${e}`);
                }

            } else // remove likes
            {
                try {
                    const result = await firebase.firestore().runTransaction(async (t) => {

                        // remove users id to likes db
                        t.delete(addUserInLikesRef.doc(userLoggedIn));

                        // add  postID to  users likes collection
                        t.delete(storePostInUsersLiked.doc(props.postID));

                        // increase likes on post
                        t.update(increaseLikesRef, "likesCount", firebase.firestore.FieldValue.increment(addOrMinusLike))

                    }).then(() => {
                        console.log(`Transaction success un-liking post ${props.postID}!`);
                        success = true;

                    })
                } catch (e) {
                    console.log(`Transaction failure un-liking post ${props.postID}!\n\n${e}`);
                }
            }

            if (success) {
                increaseLikesRef.get()
                    .then((dbCurrentLikes) => {

                        // Change Likes State
                        setCurrentLikes(dbCurrentLikes.get("likesCount"))
                        setLikeState(newState);

                        console.log(`\n\nSetting Local states for like BTN`);
                        console.log(`\n\nPostID: ${props.postID} \nCurrentUserID: ${userLoggedIn} \nUserLikedPost: ${likeState} \nLikesCount: ${currentLikes}`);
                    })
                    .catch((exception) => {
                        alert(`\nError getting post current likeCount ${props.postID} \n\n${exception}`);
                        console.log(`\n\nError getting post current likeCount ${props.postID} \n\n${exception}`);
                    })
            }
        }
        else {
            likeBTN_Initiation();
        }
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
            <Likes_And_Comments_Count_Txt userID={userLoggedIn} postID={props.postID} use={"like"} count={currentLikes}
                                          navigation={props.navigation}/>
        </View>
    )
}


