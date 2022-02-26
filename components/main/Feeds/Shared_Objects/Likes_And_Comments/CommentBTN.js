import {B} from "../Bold";
import {Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import { Dimensions, StyleSheet } from 'react-native'
import {feedStyles} from "../Styles";
import Likes_And_Comments_Count_Txt from "./Likes_And_Comments_Count_Txt";
import commentModal from "./commentModal";
import  { useRef } from "react";
import {SafeAreaView} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import firebase from "firebase";



export default function CommentBTN(props) {

    const [currentCommentsCount, setCurrentCommentsCount] = useState(props.commentsCount);
    const postID = props.postID;
    console.log("This has been clicked");
    console.log("PostedID recevied " + postID);
    const bottomSheet = useRef();

    const getCommentLike =
        firebase.firestore()
            .collection('postData')
            .doc(props.postID)
            .collection("comments")
            .get()
            .then(doc =>{
               doc.forEach(commentgot =>{
                   console.log(commentgot.data());
               })
            })

    console.log("Post data new is " + {getCommentLike});

    return(
    <View style = {feedStyles.likeAndCommentsBTN_View}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => bottomSheet.current.show()}
        >
            <Ionicons
                color="#FFFFFF"
                size={24}
                name={"chatbubble"}
            />

        </TouchableOpacity>
        <BottomSheet
            draggable={true}
            hasDraggableIcon
            ref={bottomSheet}
            height={450}>
            <View>
                <Text>{getCommentLike}</Text>
            </View>
        </BottomSheet>
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