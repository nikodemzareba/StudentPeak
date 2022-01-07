import React, {useEffect, useState} from 'react'
import {View, TextInput, Image, Button, StyleSheet} from 'react-native'

import firebase from 'firebase'
import {NavigationContainer} from '@react-navigation/native'
import Text from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedText";


import {Video, AVPlaybackStatus} from 'expo-av';
import {TouchableWithoutFeedback} from "react-native-gesture-handler";

export default function Save(props) {
    //console.log(props.route.image)

    const uri = props.route.params.image;
    const [caption, setCaption] = useState("")
    const [mediaType, setMediaType] = useState("")
    const [isVideo, setIsVideo] = useState(false)

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    useEffect(() => { // checks if user has set permissions to use the camera
        let fileExtension = uri.substr(uri.lastIndexOf('.') + 1);

        let pieces = fileExtension.split(";");
        let type = pieces[0]
        let fileType = type.substring(
            type.indexOf(":") + 1,
            type.lastIndexOf("/")
        );
        setMediaType(fileType);

        if (fileType === "video") {
            setIsVideo(true)
        }


        console.log("State = " + isVideo)
    }, []);

    const uploadImage2 = async () => {
        const childPath2 = `posts/${firebase.auth().currentUser.uid}/${getRandomString(36)}`;

        console.log(`\nNew Path: ${childPath2} `);
        const response = await fetch(uri); // fetch image
        const blob = await response.blob(); // convert to blob

        var ref = firebase.storage().ref().child(childPath2); // reference to image

        // upload image to fireStorage
        await ref.put(blob)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            })
            .catch((error) => {
                console.log(`${error} \nError uploading file to fire-storage!`);
                return downloadURL;
            })
            .then(downloadURL => {
                console.log(`Successfully uploaded file and got download link - ${downloadURL}`);

                //upload to firestore
                firebase.firestore()
                    .collection('posts')
                    .doc(firebase.auth().currentUser.uid)
                    .collection("userPosts")
                    .add({
                        downloadURL,
                        caption,
                        mediaType: mediaType,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        console.log(`Successfully uploaded file to fire-store`);
                        props.navigation.navigate("Add"); // return to camera screen
                    })
                    .catch((error) => {
                        console.log(`${error} \nError uploading file to fire-store!`);
                        return downloadURL;
                    });
                return downloadURL;
            });
    }

    const getRandomString = (length) => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    if (isVideo) {
        return (
            <View style={styles.container}>
                <Video
                    ref={video}
                    style={{flex: 1}}
                    source={{
                        uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Write a Caption ...."
                        onChangeText={(caption) => setCaption(caption)}
                    />
                </View>
                <Button title="Save" onPress={() => uploadImage2()}/>

            </View>
        );

    } else {
        return (

            <View style={{flex: 1, padding:10}}>

                <Image source={{uri: props.route.params.image}} style={{flex: 1}}/> {/* Displays image taken below  */}
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Write a Caption ...."
                        onChangeText={(caption) => setCaption(caption)}
                    />
                </View>
                <Button title="Save" onPress={() => uploadImage2()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        borderLeftWidth: 4,
        borderRightWidth: 4,
        height: 30,
        padding:10
    },
})
