import {B} from "../Bold";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
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

    //flatlist test data
    //Get rid of this test data
    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "First Comment",
        },
        {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "Second Comment",
        },
        {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: "Third Comment",
        },
    ];

    //test to see if I can use flalist on this view
    render = () => {
        return (
            <View>
                <FlatList
                    data={commentInfo}
                    keyExtractor={item => item.username}
                    renderItem = {({item}) => {
                    return (
                        <View>
                            <Text>{item.comment}</Text>
                            <Text>{item.username}</Text>
                        </View>
                    )
                    }
                }
                />
            </View>
        );
    }

    //Array to store comment Details
    let commentInfo = [];

    //get comments  via the postID
    function getCommentLike  (postID) {
        firebase.firestore()
            .collection('postData')
            .doc(postID)
            .collection("comments")
            .get()
            .then(doc =>{
                doc.forEach((commentGot) =>{
                    //get the comment made by the user
                    const userComment = commentGot.get('comment');
                    //next step will be to go get the comment User Details
                    firebase.firestore()
                        .collection('users')
                        .doc(commentGot.id)
                        .get()
                        .then(userDetails => {
                            const userID = commentGot.id;
                            const username = userDetails.get("username");
                            const profileImage = userDetails.get("profileimage");
                            //saving all information into array
                            commentInfo.push({
                                key: userID,
                                username: username,
                                profileImage: profileImage,
                                comment:userComment
                            })
                            console.log("All details captured here here " +  JSON.stringify(commentInfo));

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
            {getCommentLike(postID)}
            {render()}
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