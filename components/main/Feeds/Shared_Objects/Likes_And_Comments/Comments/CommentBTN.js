import {TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import { Dimensions, StyleSheet } from 'react-native'
import {feedStyles} from "../../Styles";
import Likes_And_Comments_Count_Txt from "../Likes_And_Comments_Count_Txt";
import firebase from "firebase";




export default function CommentBTN(props) {



    const [comment, setComment] = useState('yy')
    const [currentCommentsCount, setCurrentCommentsCount] = useState(props.commentsCount);
    const postID = props.postID;
    console.log("PostedID recevied " + postID);


    console.log(JSON.stringify(setComment));

    //get comments  via the postID
    function getCommentByUsers  (postID) {
        //Array to store comment Details
        let commentInfo = [];
        firebase.firestore()
            .collection('postData')
            .doc(postID)
            .collection("comments")
            .get()
            .then(doc =>{
                const resultsCount  = doc.size;
                let count = 0;
                    doc.forEach((commentGot) =>{
                        count ++;
                        //get the comment made by the user
                        const userComment = commentGot.get('comment');
                        const userId = commentGot.get('userId')
                        const createdAt = commentGot.get('createdAt')
                        console.log("got user id from data  " + userId + " comm is  " + userComment + "   createdAT" + createdAt )
                        //next step will be to go get the comment User Details
                        firebase.firestore()
                            .collection('users')
                            .doc(userId)
                            .get()
                            .then(userDetails => {
                                const username = userDetails.get("username");
                                const profileImage = userDetails.get("profileimage");
                                const userID = firebase.auth().currentUser.uid
                                //saving all information into array
                                commentInfo.push({
                                    key: commentGot.id,
                                    username: username,
                                    userID: userID,
                                    profileImage: profileImage,
                                    comment:userComment,
                                    createdAt: createdAt,
                                    postID: postID

                                })
                                console.log("All details captured here  " +  JSON.stringify(commentInfo));
                                console.log('Now heading to the comments page')
                                //get the userid of the current user

                                console.log('user ID is \n' + userID )
                                if (count === resultsCount) {
                                    props.navigation.navigate("showComment", { navigation: props.navigation, commentInfo: commentInfo,  postID: props.postID})
                                }
                            }).catch((exception) => {
                            alert(`\nError seeing comment Info \n\n${exception}`);
                            console.log(`\nError seeing comment Info \n\n${exception}`);
                        })
                    })


            }).catch((exception) => {
            alert(`\nError getting users who commented on this post\n\n${exception}`);
            console.log(`\n\nError getting users who commented on post ${props.postID}`);
        })

    }



    return(
        <View style = {feedStyles.likeAndCommentsBTN_View}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => getCommentByUsers(postID)}
            >
                <Ionicons
                    color="#FFFFFF"
                    size={24}
                    name={"chatbubble"}
                />
            </TouchableOpacity>
            <Likes_And_Comments_Count_Txt use={"comment"} count={currentCommentsCount}/>
        </View>

    )
}




const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'}
    ,
    actionButton: {
        paddingBottom: 16
    },
    actionButtonText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 4
    }
})