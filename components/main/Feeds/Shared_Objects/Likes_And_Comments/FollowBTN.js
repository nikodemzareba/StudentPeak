import {Button, Text, View} from "react-native";
import React, {useState} from "react";
import firebase from "firebase";


export default function FollowBTN(props) {

    const [followingUser, setFollowing] = useState(props.followingUser);
   let followingTxt = followingUser ? "Unfollow": "Follow";
   console.log(`\n\nFollowBTN() CurrentUserID: ${props.userID} \nOtherUserID: ${props.otherUserID}\nFollowingState ${props.followingUser}`)


    const dbRef = firebase.firestore()
        .collection('following')
        .doc(props.userID)
        .collection('userFollowing');

    const setFollowingTxtMethod = () => {
        if (followingUser) {
            followingTxt = "Unfollow";
            return;
        }
        followingTxt = "Follow";
    }


    const followEvent = () => {
        
        if (followingUser) 
        {
            dbRef.doc(props.otherUserID).delete()
                .then(() => {
                    console.log(`\n\nUser is ${props.userID} is now NOT following ${props.otherUserID}`);
                    setFollowing(false)
                    setFollowingTxtMethod();
                })
                .catch((exception) => {
                    alert(`\nError Unfollowing User \n${props.otherUserID}`);
                    console.log(`\nError Following User \n${props.otherUserID} \n\n${exception}`);
                })

        } 
        else
        {
            dbRef.doc(props.otherUserID)
                .set({})
                .then(() => {
                    console.log(`\n\nUser is ${props.userID} is now following ${props.otherUserID}`);
                    setFollowing(true)
                    setFollowingTxtMethod();
                })
                .catch((exception) => {
                    alert(`\nError Following User \n${props.otherUserID}`);
                    console.log(`\nError Following User \n${props.otherUserID} \n\n${exception}`);
                })
        }
       
    }

    return (
        <View style={{width: 100, height: 40}}>
            <Button title={followingTxt} onPress={followEvent}/>
        </View>
    )
}