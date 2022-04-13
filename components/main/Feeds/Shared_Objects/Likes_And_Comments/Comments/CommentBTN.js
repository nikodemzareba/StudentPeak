import {Image, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import { Dimensions, StyleSheet } from 'react-native'
import {feedStyles} from "../../Styles";
import Likes_And_Comments_Count_Txt from "../Likes_And_Comments_Count_Txt";
import firebase from "firebase";
import comment_img from './comment-13420.png'
import {getCommentByUsers} from "./Functions/getCommentByUsers";



export default function CommentBTN(props) {

    // console.log(`CommentBTN() PostedID received  \n${props.postID}`);

    let [currentCommentsCount, setCurrentCommentsCount] = useState(false);
    const [currentComments, setCurrentComments] = useState(0);
    const postID = props.postID;

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




    return(
        <View style = {feedStyles.likeAndCommentsBTN_View}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => getCommentByUsers(postID, props.navigation)}
            >

                <Image source={comment_img} style={{height: 25, width:25,}}/>
            </TouchableOpacity>
            <Likes_And_Comments_Count_Txt use={"comment"} count={currentComments} postID={props.postID} navigation={props.navigation}/>
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