import {
    ScrollView,
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React, {useEffect, Component, useState} from 'react'
import {feedStyles} from "../Feeds/Shared_Objects/Styles";
import Pictures_And_Videos_Post_Object from "../Feeds/Shared_Objects/Pictures_And_Videos_Post_Object";
import {SimpleLineIcons} from "@expo/vector-icons";
import styles from "../../../frontend/screens/feed/styles";


export default function ViewPost(props) {

    console.log(`\n\nViewPost() ${props.route.params.data.key}`)

    return (

        <View style={feedStyles.screenBackground}>
            <View style={{paddingTop: 10, height: 30}}>
            </View>
            <TouchableOpacity
                onPress={() => {
                    const navigation = props.route.params.navigation;
                    props.route.params.navigation.navigate("Search", {navigation: navigation})
                }}
            >
                <SimpleLineIcons
                    style={styles.icon}
                    name="arrow-left"
                    size={20}
                    color="white"

                />
            </TouchableOpacity>
            <View style={{paddingTop: 10, height: 30}}>
            </View>

                <Pictures_And_Videos_Post_Object
                    name={props.route.params.data.name}
                    profileImage={props.route.params.data.profile}
                    userID={props.route.params.data.userID}
                    navigation={props.navigation}
                    downloadURL={props.route.params.data.downloadURL}
                    mediaType={props.route.params.data.mediaType}

                    postID={props.route.params.data.key}
                    commentsCount={props.route.params.data.commentsCount}
                />

        </View>
    )
}