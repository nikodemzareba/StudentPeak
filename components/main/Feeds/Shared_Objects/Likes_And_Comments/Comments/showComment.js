import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {feedStyles} from "../../Styles";
import firebase from "firebase";
import {Ionicons} from "@expo/vector-icons";
import Profile_Icon from "../../Profile_Objects/Profile_Icon";
import {useState} from "react";
import ProfileIcon_And_Username from "../../Profile_Objects/ProfileIcon_And_Username";


export default function showComment(props) {
    console.log(`\n\nshowComment() we are in the ShowComments for postID ${props.route.params.postID}`);

    const userMakingPost = firebase.auth().currentUser.uid;

    const navigation = props.route.params.navigation;

    //let postID = ${props.params.route.postID};
    // console.log('\ntest  \n' + props.route.params.postID);

    const [comment, setComment] = useState("");
    const [refresh, setRefresh] = useState(false);


    const commentInfoData = props.route.params.commentInfo;

    const database = (postId) =>
        firebase.firestore()
            .collection('postData')
            .doc(postId)
            .collection('comments')


    const increaseCommentsRef = (postId) =>
        firebase.firestore()
            .collection('postData')
            .doc(postId)


    const getRandomString = (length) => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    const dbCheck = (key) => {
        firebase.firestore()
            .collection('postData').doc('id').get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    db.collection('users').doc('id')
                        .onSnapshot((doc) => {
                            // do stuff with the data
                        });
                }
            });
    }


    const handleComment = async (postId, userId, comment) => {

        //going to need the postId to make comment
        //the current user id
        //the comment
        //the time of the creation
        //console.log('details to send are \n' + postId + '\n' + userId +'\n' + comment);
        try {


            const result = await firebase.firestore().runTransaction(async (t) => {

                const id = getRandomString(26);
                // add users id to likes db
                t.set(database(postId).doc(id), {
                    userId: userId,
                    comment: comment,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });


                // increase comments on post
                t.update(increaseCommentsRef((postId)), "commentsCount", firebase.firestore.FieldValue.increment(1))
                return id;

            })
            // console.log(result);
            if (result !== undefined) {
                // console.log('\nresult to be shown here \n' + result)
                firebase.firestore()
                    .collection('postData')
                    .doc(props.route.params.postID)
                    .collection("comments")
                    .doc(result)
                    .get()
                    .then((r) => {

                        firebase.firestore()
                            .collection('users')
                            .doc(userId)
                            .get()
                            .then(userDetails => {
                                const username = userDetails.get("username");
                                const profileImage = userDetails.get("profileimage");
                                const userID = firebase.auth().currentUser.uid
                                //saving all information into array
                                commentInfoData.push({
                                    key: r.id,
                                    username: username,
                                    userID: userID,
                                    profileImage: profileImage,
                                    comment: r.get("comment"),
                                    createdAt: r.get("createdAt"),
                                    postID: postId

                                })
                                setRefresh(!refresh)
                            })
                            .catch((exception) => {
                                alert(`\n\nshowComment() Unable to pull user information \n\n${exception}`);
                                console.log(`\n\nshowComment() Unable to pull user information\n\n${exception}`);
                            })
                    })
            }

        } catch (e) {
            // This will be a "population is too big" error.
            console.log(`\n\nshowComment() Error \n${e}`);
        }
    }

    return (
        //flat-list that renders the comments' page after data is received
        <View style={feedStyles.screenBackground}>
            <FlatList
                style={{flex: 1}}
                data={commentInfoData}
                extraData={refresh}
                renderItem={({item}) => {
                    return (
                        <View style={feedStyles.showCommentContainer}>
                            <Profile_Icon
                                userID={item.userID}
                                width={50}
                                height={50}
                                borderRadius={50}
                                profileImage={item.profileImage}
                                navigation={navigation}
                                userExists={item.userExists}
                            />
                            <View style={feedStyles.containerText}>
                                <Text style={feedStyles.displayName}>{item.username}</Text>
                                <Text style={{
                                    color: 'white'
                                }}>{item.comment}</Text>
                            </View>
                        </View>

                    )
                }
                }
            />
            <View style={feedStyles.containerInput}>
                <TextInput
                    style={feedStyles.input}
                    onChangeText={(comment) => {

                        if (comment !== "" || comment !== undefined) {
                            setComment(comment)
                        }
                    }}
                    placeholder="Enter comment here"
                />
                <TouchableOpacity onPress={() => handleComment(props.route.params.postID, userMakingPost, comment)}>
                    <Ionicons name="arrow-up-circle" size={34} color={'crimson'}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}


