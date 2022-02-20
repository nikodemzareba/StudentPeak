import {B} from "../Bold";
import {Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import { Dimensions, StyleSheet } from 'react-native'
import {feedStyles} from "../Styles";
import Likes_And_Comments_Count_Txt from "./Likes_Count_Txt";


export default function Comment(props) {

    const [currentCommentsCount, setCurrentCommentsCount] = useState(props.commentsCount);

    return(
    <View style = {feedStyles.likeAndCommentsBTN_View}>
        <TouchableOpacity
            style={styles.actionButton}
            //onPress={() => dispatch(openCommentModal(true, post))}
        >
            <Ionicons
                color="#FFFFFF"
                size={24}
                name={"chatbubble"}
            />

        </TouchableOpacity>
        <Likes_And_Comments_Count_Txt count={currentCommentsCount}/>
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