import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {feedStyles} from "../../Styles";
import firebase from "firebase";
import {Ionicons} from "@expo/vector-icons";
import Profile_Icon from "../../Profile_Objects/Profile_Icon";
import {useState} from "react";


export default function showComment(props) {
    console.log('we are in the ShowComments');
    console.log(`\n\n ${props.route.params.commentInfo}\n` + 'data in array is \n' + JSON.stringify(props.route.params.commentInfo))

    const userMakingPost = firebase.auth().currentUser.uid;

    const navigation = props.route.params.navigation;

    //let postID = ${props.params.route.postID};
    console.log('\ntest  \n' + props.route.params.postID);

    const [comment, setComment] = useState("");
    const[refresh, setRefresh] = useState(false);


    const commentInfoData = props.route.params.commentInfo;

    const database = (postId) =>
        firebase.firestore()
            .collection('postData')
            .doc(postId)
            .collection('comments')


    const increaseCommentsRef = (postId) =>
        firebase.firestore()
            .collection('postData')
            .doc(postId)


    const getRandomString = (length) => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    const dbCheck = (key) => {
        firebase.firestore()
            .collection('postData').doc('id').get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    db.collection('users').doc('id')
                        .onSnapshot((doc) => {
                            // do stuff with the data
                        });
                }
            });
    }


    const handleComment = async (postId, userId, comment) => {

        //going to need the postId to make comment
        //the current user id
        //the comment
        //the time of the creation
        //console.log('details to send are \n' + postId + '\n' + userId +'\n' + comment);
        try {


            const result = await firebase.firestore().runTransaction(async (t) => {

                const id = getRandomString(26);
                // add users id to likes db
                t.set(database(postId).doc(id), {
                    userId: userId,
                    comment: comment,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });


                // increase comments on post
                t.update(increaseCommentsRef((postId)), "commentsCount", firebase.firestore.FieldValue.increment(1))
                return id;

            })
            console.log(result);
            if(result !== undefined)
            {
                console.log('\nresult to be shown here \n' + result)
                firebase.firestore()
                    .collection('postData')
                    .doc(props.route.params.postID)
                    .collection("comments")
                    .doc(result)
                    .get()
                    .then((r) => {

                        firebase.firestore()
                            .collection('users')
                            .doc(userId)
                            .get()
                            .then(userDetails => {
                                const username = userDetails.get("username");
                                const profileImage = userDetails.get("profileimage");
                                const userID = firebase.auth().currentUser.uid
                                //saving all information into array
                                commentInfoData.push({
                                    key: r.id,
                                    username: username,
                                    userID: userID,
                                    profileImage: profileImage,
                                    comment: r.get("comment"),
                                    createdAt: r.get("createdAt"),
                                    postID: postId

                                })
                                setRefresh(!refresh)
                            })
                            .catch((exception) => {
                                alert(`\nUnable to pull user information \n\n${exception}`);
                                console.log(`\nUnable to pull user information\n\n${exception}`);
                            })

                    })
            }

        }catch (e) {
            // This will be a "population is too big" error.
            console.error(e);
        }
    }

    return (
        <View style={feedStyles.screenBackground}>
            <FlatList
                style={{flex: 1}}
                data={commentInfoData}
                extraData={refresh}
                renderItem={({item}) => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 5,
                            marginBottom: 10,
                            padding: 10,
                            backgroundColor: 'grey'
                        }}>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingRight: 5}}>
                                <Profile_Icon userID={item.userID} width={50} height={50} borderRadius={50}
                                              profileImage={item.profileImage} navigation={navigation}/>
                            </TouchableOpacity>
                            <Text style={{
                                color: 'white'
                            }}>{item.username}</Text>
                            <View>
                                <Text style={{
                                    color: 'white'
                                }}>{item.comment}</Text>
                            </View>

                        </View>

                    )
                }
                }
            />
            <View>
                <TextInput
                    style={{
                        color: 'black',
                        backgroundColor: 'white',
                        padding: 10,
                        flexDirection: 'row',
                    }}
                    onChangeText={(comment) => {

                        if (comment !== "" || comment !== undefined) {
                            setComment(comment)
                        }
                    }}
                    placeholder="Enter comment here"
                />
                <TouchableOpacity onPress={() => handleComment(props.route.params.postID, userMakingPost, comment)}>
                    <Ionicons name="arrow-up-circle" size={34} color={'crimson'}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}


