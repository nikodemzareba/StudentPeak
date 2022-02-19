import {View} from "react-native";
import {feedStyles} from "./Styles";
import LikeBTN from "./LikeBTN";
import React from "react";
import Comment from "./Comment";


export default function LikesAndCommentsDisplay(props) {
    return(
        <View style={feedStyles.commentsAndLikesCircle}>

            <LikeBTN likesCount={props.likesCount} navigation={props.navigation}/>
            <Comment  commentsCount={props.commentsCount}/>
        </View>
    )
}
