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
import firebase from "firebase";
import {Video} from "expo-av";
import {SimpleLineIcons} from "@expo/vector-icons";
import SearchScreenObject from "./Objects/SearchScreenObject";

export default function SearchScreenResults(props) {

    console.log(`\n\nSearchScreenResults() \n${props.route.params.postTag}`)

    return (
        <View style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>
            <View style={feedStyles.screenBackground}>
                <View style={{paddingTop: 10, height: 30}}>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        const navigation = props.route.params.navigation;
                        props.route.params.navigation.navigate("Search", {navigation:navigation})
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


                    <FlatList
                        data={props.route.params.data}
                        //Setting the number of column
                        numColumns={3}
                        renderItem={({item}) => (
                            <SearchScreenObject item={item} navigation={props.route.params.navigation}/>
                        )}

                    />

            </View>
        </View>
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