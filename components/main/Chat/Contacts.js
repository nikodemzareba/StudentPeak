import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import firebase from "firebase";
import Context from "./context/Context";
import ListItem from "./ListItem";
import image from "react-native-web/dist/exports/Image";
import {user} from "../../../redux/reducers/user";

export default function Contacts() {

    const contacts = getContacts()
    return (
        //TODO: sort out names.
        <FlatList
            style={{flex: 1, padding: 10}}
            data = {contacts}
            keyExtractor={(name,i) => name}
            renderItem = {({item}) =>
                <ContactPreview contact = {item}/>}
        />
    );
}



function ContactPreview({contact}){
    const {rooms} = useContext(Context)
    const user = contact.username

    return(
        <ListItem
            style = {{marginTop: 7}}
            type = "contacts"
            user = {user}
            room = {rooms.find((room) => room.participantArray.includes(contact.email))}
        />
    );
}

//TODO: will be used to display users when error with undefined usernames is adressed
export function getContacts(){
    const [userNames, setUserNames] = useState([]);
    const uid = firebase.auth().currentUser.uid
    console.log(`CURRENT USER >> ${uid}`)

    //get contacts
    useEffect(() =>{
        const getUsers = async() =>{
            const snapshot =  await
                firebase.firestore()
                    .collection("users").get()
            const usernames = snapshot.docs.map(doc =>({
                username: doc.get("username"),
                firstName: doc.get("name"),
                lastName: doc.get("surname"),
                email: doc.get("email"),
                image: doc.get("profileimage")
            }))
            usernames.forEach(user =>{
                if(user.username === undefined) {
                    user.username = "someUser"
                }
                console.log(`username:${user.username} :: firstName:${user.firstName} :: lastName:${user.lastName} :: email:${user.email}`)
            });
            setUserNames(usernames)
        };
        getUsers();
    },[]);

    return userNames
}
