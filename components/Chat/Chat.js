import React, {userState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "./Button";
import {View, StyleSheet} from "react-native";
import {Messages} from "./Messages";
import {Input} from "./Input";
import {colors} from "../../theme/colors";
import {fetchMessages, postMessage} from "../../redux/actions";

const Chat = () => {
    const [userMessage, setUserMessage] = userState('');
    const messages = useSelector(state => state.messages.messages);
    //TODO: get userId from firestore
    const userID = useSelector(state => state.auth.userId);
    //TODO: get name from firestore
    const userName = useSelector(state => state.auth.name);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMessages());
    }, []);

    const onButtonPress = () => {
        dispatch(postMessage(userMessage, userId, userName));
        setUserMessage('');
    };

    return (
        <View style={styles.container}>
            <Messages messages = {messages} />
            <View style={styles.inputArea}>
                <View style={styles.inputWrapper}>
                    <Input
                    placeholder={"Hey..."}
                    value = {userMessage}
                    onChangeText={text => setUserMessage(text)}
                    />
                </View>
                <View style={buttonWrapper}>
                <Button
                    text={"SEND"}
                    onButtonPress={onButtonPress}
                    disabled={!userMessage.length}
                />
            </View>
            </View>
        </View>
    );
 };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 'auto',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.lightgray,
    },
    imputArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputWrapper:{
        width:'75%',
    },
    buttonWrapper:{
        width: '20%',
    },
});

export default Chat;