import {View} from "react-native";
import {feedStyles} from "../Styles";
import LikeBTN from "./Likes/LikeBTN";
import React from "react";
import CommentBTN from "./Comments/CommentBTN";


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

                navigation={props.navigation}
            />
        </View>
    )
}


