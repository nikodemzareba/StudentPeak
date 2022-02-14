import {B} from "./Bold";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import { Dimensions, StyleSheet } from 'react-native'


export default function Comment(props) {
    return(
    <View style = {styles.container}>
        <TouchableOpacity
            style={styles.actionButton}
            //onPress={() => dispatch(openCommentModal(true, post))}
        >
            <Ionicons
                color="#FFFFFF"
                size={30}
                name={"chatbubble"}
            />
            <Text style={styles.actionButtonText}>
                {1}
            </Text>
        </TouchableOpacity>
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