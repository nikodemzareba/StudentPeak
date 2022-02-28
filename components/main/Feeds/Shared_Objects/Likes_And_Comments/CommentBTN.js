import {B} from "../Bold";
import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
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
import Profile_Icon from "../Profile_Icon";
import handleComment from "./handleComment";



export default function CommentBTN(props) {

    const [comment, setComment] = useState('yy')
    const [currentCommentsCount, setCurrentCommentsCount] = useState(props.commentsCount);
    const postID = props.postID;
    console.log("This has been clicked");
    console.log("PostedID recevied " + postID);
    const bottomSheet = useRef();

    //check if Modal open function
    let [isVisible, setIsVisible] = useState(false)

    //feeback that modal is open
    function checkVisble() {
        if(setIsVisible == true ){
            console.log("opened modal");

        }
    }

    // function that checks modal is opened and then calls for comments to be fetched.
    function combined(){
        bottomSheet.current.show();
        setIsVisible = true;
        checkVisble();
    }


    //test to see if I can use flalist on this view
    render = () => {
        console.log("should be rendering data " + JSON.stringify(setIsVisible))
            return (
                <View style = {feedStyles.screenBackground}>
                    <FlatList
                        style={{flex: 1}}
                        data={commentInfo}
                        keyExtractor={item => item.userId}
                        renderItem = {({item}) => {
                            return (
                                <View style = {{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal:5,
                                    marginBottom: 10,
                                    padding: 10,
                                }}>
                                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingRight: 5}}>
                                        <Profile_Icon userID={item.userID} width={50} height={50} borderRadius={50}
                                                      profileImage={item.profileImage} navigation={props.navigation}/>
                                    </TouchableOpacity>
                                    <Text style = {{
                                        color:'white'
                                    }}>{item.username}</Text>
                                    <View>
                                        <Text style ={{
                                            color:'white'
                                        }}>{item.comment}</Text>
                                    </View>
                                </View>

                            )
                        }
                        }
                    />

                </View>
            );
    }

    console.log(JSON.stringify(setComment));

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
                                //saving all information into array
                                commentInfo.push({
                                    key: userId,
                                    username: username,
                                    profileImage: profileImage,
                                    comment:userComment,
                                    createdAt: createdAt
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
            onPress={() => combined()}
        >
            <Ionicons
                color="#FFFFFF"
                size={24}
                name={"chatbubble"}
            />
            <BottomSheet
                sheetBackgroundColor = {'black'}
                draggable={true}
                hasDraggableIcon
                ref={bottomSheet}
                height={450}>
                {getCommentLike(postID)}
                {render()}
                <View>
                    <TextInput
                        style ={{
                            color: 'white',
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            flexDirection: 'row',
                        }}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Enter comment here"
                    />
                    <TouchableOpacity onPress={() => handleComment(postID, firebase.auth().currentUser.uid, setComment)}>
                        <Ionicons name="arrow-up-circle" size={34} color={'crimson'} />
                    </TouchableOpacity>
                </View>
            </BottomSheet>
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