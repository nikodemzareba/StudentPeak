//@refresh reset
//By default reset is set to HOLD, we need refresh to keep it up tod ate
import React, {useCallback, useContext, useEffect} from 'react';
import {Text, useState, View} from 'react-native';
import firebase from "firebase";
import {useRoute} from "@react-navigation/native";
import "react-native-random-values"
import nanoid from "nanoid";
import Context from "./context/Context";
import {GiftedChat} from "react-native-gifted-chat"
import {ImageBackground} from "react-native-web";

const randomId = nanoid.random(64)

export default function Chat(){
    const[roomHash, setRoomHash] = useState("") // security feature
    const [messages, setMessages] = useState("")
    const{theme: {colors}} = useContext(Context)
    const {currentUser} = firebase.auth
    const route = useRoute()
    const room = route.params.room
    const selectedImage = route.params.image
    const userB = route.params.user

    const sender = currentUser.photoURL ? {
            name: currentUser.displayName,
            _id: currentUser.uid,
            avatar: currentUser.photoURL
        } : {
        name: currentUser.displayName,
        _id: currentUser.uid,
    }

    const roomId = room ? room.id : randomId
    const roomRef = firebase.firestore().collection("rooms").doc(roomId)
    const roomMessagesRef = firebase.firestore()
        .collection("rooms")
        .doc(roomId)
        .collection("messages");

    useEffect(() => {

        (async () =>{
          if(!room){
              const currentUserData = {
                  displayName: currentUser.username,
                  email: currentUser.email
              }
              if(currentUser.photoURL){
                  currentUserData.photoURL = currentUser.photoURL
              }
              const userBData = {
                  displayName: userB.username,
                  email: userB.email
              }
              if(userB.photoURL){
                  userBData.photoURL = userB.photoURL
              }
              const roomData = {
                  participants: [currentUserData, userBData],
                  participantsArray: [currentUser.email, userB.email]
              }
              //create a room if there is no room available
              try {
                  await setDoc(roomRef, roomData)
                  console.log(sender)
              }catch(error){
                  console.log(error)
              }
          }
          setRoomHash(`${currentUser.email}:${userB.email}`)
        })()
    }, []);

    //read messages
    useEffect(()=>{
        const unsubscribe = roomMessagesRef.onSnapshot(snapshot => {
            const messagesFirestore = snapshot.docChanges().filter(({type}) => type === "added")
                .map(doc => {
                    const message = doc.data()
                    return {...message, createdAt: message.createdAt.toDate()}
                });
            appendMessages(messagesFirestore);
        });
        unsubscribe()
    },[]);

    //use callback not to waste memory
    const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages)
        );
    },[messages]);

    async function onSend(messages = []) {
        const writes = messages.map(m =>
            roomMessagesRef.doc().set(m)
        )
        const lastMessage = messages[messages.length - 1]
        writes.push(roomRef.update(lastMessage))
        await Promise.all(writes)
    }

    return(
        <ImageBackground
            resizeMode = "cover"
            source={require('../../../assets/chat-bg.jpg')}
            style ={{flex: 1}}>
            <GiftedChat
                onSend = {onSend}
                messages = {messages}
                user = {sender}
                renderAvatar = {null}
            />
        </ImageBackground>
    )
}


