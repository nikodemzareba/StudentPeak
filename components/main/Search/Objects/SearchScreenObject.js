import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {Video} from "expo-av";
import React from "react";

export default function SearchScreenObject(props) {
    return (
        <TouchableOpacity style={{flex: 1, flexDirection: 'column', margin: 1}}
                          onPress={() => {
                              const navigation = props.navigation;
                              props.navigation.navigate("ViewPost", {navigation: navigation, data: props.item})
                          }}
        >
            {props.item.mediaType === "picture"
                ?
                <Image style={styles.imageThumbnail} source={{uri: props.item.downloadURL}}/>
                :

                <Video source={{uri: props.item.downloadURL}}   // Can be a URL or a local file.
                       paused={true}
                       controls={false}
                />
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