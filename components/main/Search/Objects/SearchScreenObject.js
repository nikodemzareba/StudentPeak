import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

import React, {useEffect, useState} from "react";
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function SearchScreenObject(props) {

    const [doneThumbnail, setDoneThumbnail] = useState(false);
    const [videoImageThumbnail, setVideoImageThumbnail] = useState(null);

    const generateThumbnail = async (uriIn) => {
        console.log(`\n\nSearchScreenObject generateThumbnail() URI itemKEy \n${props.item.key}`);
        try {
            const {uri} = await VideoThumbnails.getThumbnailAsync(
                uriIn,
                {
                    time: 15000,
                }
            );

            console.log(`\n\nSearchScreenObject generateThumbnail() URI \n${uri}`);

            setVideoImageThumbnail(uri);
            setDoneThumbnail(true);


        } catch (e) {
            console.log(`\n\nSearchScreenObject generateThumbnail() Error \n${e}`);
        }
    };

    useEffect(() => {
        if (props.item.mediaType === 'video') {
            generateThumbnail(props.item.downloadURL);
        }
    }, []);


    return (
        <TouchableOpacity style={{flex: 1, flexDirection: 'column', margin: 1}}
                          onPress={() => {
                              const navigation = props.navigation;
                              const comingFrom = props.comingFrom;
                              const userIDOfProfile =  props.userIDOfProfile;
                              props.navigation.navigate("ViewPost", {navigation: navigation, data: props.item, comingFrom: comingFrom, userID: userIDOfProfile})
                          }}
        >
            {props.item.mediaType === "picture"
                ?
                <Image style={styles.imageThumbnail} source={{uri: props.item.downloadURL}}/>
                :

                <View>
                    {doneThumbnail
                        ?
                        <Image style={styles.imageThumbnail} source={{uri: videoImageThumbnail}}/>
                        :

                        <Image style={{ width:135, height:100, alignSelf:"center"}} source={require('../Pictures/youtube-logo2.jpg')}/>

                    }

                </View>
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});