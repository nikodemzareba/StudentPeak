import {Image, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {feedStyles} from "../../Styles";
import Likes_And_Comments_Count_Txt from "../Likes_And_Comments_Count_Txt";
import firebase from "firebase";
import comment_img from './comment-13420.png'




export default function CommentBTN(props) {



    let [currentCommentsCount, setCurrentCommentsCount] = useState(false);
    const [currentComments, setCurrentComments] = useState(0);
    const postID = props.postID;
    console.log("PostedID recevied " + postID);


    const commentBTN_Count = () => {
        let currentCommentState, commentCount;

        // Get the current count of the post
            firebase.firestore()
                .collection('postData')
                .doc(props.postID)
                .get()
                .then((dbCommentCount) => {
                    commentCount = dbCommentCount.get("commentsCount");
                    if(dbCommentCount.exists){
                        currentCommentsCount = true;
                        return;
                    }
                    currentCommentState = false;
                })
                .then(() => {
                    setCurrentComments(commentCount)
                    setCurrentCommentsCount(currentCommentState)
                })
    }


    commentBTN_Count();

    //get comments  via the postID
    function getCommentByUsers  (postID) {
        //Array to store comment Details
        let commentInfo = [];
        firebase.firestore()
            .collection('postData')
            .doc(postID)
            .collection("comments")
            //sort comments out by latest entries to the collection
            .orderBy('createdAt', 'desc')
            .get()
            .then(doc =>{
                const resultsCount  = doc.size;
                console.log("\n\n Document has is \n\n" + resultsCount);
                let count = 0;
                //allow user to go comments like
                if(resultsCount === 0){
                    props.navigation.navigate("showComment", { navigation: props.navigation, commentInfo: commentInfo,  postID: props.postID})
                }
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
                style={feedStyles.button}
                onPress={() => getCommentByUsers(postID)}
            >

                <Image source={comment_img} style={{height: 24, resizeMode: 'contain'}}/>
            </TouchableOpacity>
            <Likes_And_Comments_Count_Txt use={"comment"} count={currentComments}/>
        </View>

    )
}




