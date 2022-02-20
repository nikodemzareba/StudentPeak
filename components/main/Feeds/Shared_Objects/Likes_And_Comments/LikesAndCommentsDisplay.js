import {View} from "react-native";
import {feedStyles} from "../Styles";
import LikeBTN from "./LikeBTN";
import React from "react";
import CommentBTN from "./CommentBTN";


export default function LikesAndCommentsDisplay(props) {
    return(
        <View style={feedStyles.commentsAndLikesCircle}>

            <LikeBTN  userID={props.userID} postID={props.postID} userLikedPost={props.userLikedPost} likesCount={props.likesCount} navigation={props.navigation}/>
            <CommentBTN userID={props.userID} postID={props.postID} commentsCount={props.commentsCount} navigation={props.navigation}/>
        </View>
    )
}


