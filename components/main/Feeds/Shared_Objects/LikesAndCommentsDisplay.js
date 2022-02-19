import {View} from "react-native";
import {feedStyles} from "./Styles";
import LikeBTN from "./LikeBTN";
import React from "react";
import Comment from "./Comment";


export default function LikesAndCommentsDisplay(props) {
    return(
        <View style={feedStyles.commentsAndLikesCircle}>

            <LikeBTN postID={props.postID} likesCount={props.likesCount} navigation={props.navigation}/>
            <Comment postID={props.postID}   commentsCount={props.commentsCount}/>
        </View>
    )
}
