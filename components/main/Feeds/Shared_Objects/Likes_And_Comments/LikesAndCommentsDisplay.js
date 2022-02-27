import {View} from "react-native";
import {feedStyles} from "../Styles";
import LikeBTN from "./LikeBTN";
import React from "react";
import CommentBTN from "./CommentBTN";


export default function LikesAndCommentsDisplay(props) {
    return(
        <View style={feedStyles.commentsAndLikesCircle(props.position)}>

            <LikeBTN
                userID={props.userID}
                postID={props.postID}
                navigation={props.navigation}
            />

            <CommentBTN
                userID={props.userID}
                postID={props.postID}
                commentsCount={props.commentsCount}
                navigation={props.navigation}
            />
        </View>
    )
}


