import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import {Avatar} from "./Avatar";
import {colors} from "../../theme/colors";
import PropTypes from "prop-types";
import {Time} from './Time';

//TODO: state should get userId from firebase
const Message = ({message}) => {
  const userID = useSelector(state => state.auth.userID);
  const isUserMessage = message.user.id === userID;

  return (
      <View style = {[styles.topContainer, isUSerMessage ? styles.topContainerReverse : null]}>
          <Avatar src = {message.user.avatarUrl} style = {styles.avatar} />
          <LinearGradient
              colors={colors.mainGradientColor}
              style={[styles.messageWrapper, isUserMessage ? styles.messageWrapperReverse : null]}>
              <View style={styles.messageContainer}>
                  <Text style={styles.messageText}>{message.text}</Text>
              </View>
          </LinearGradient>
          <Time style = {styles.time} timestamp = {message.timestamp} />
      </View>
  );
};

Message.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            avatarUrl: PropTypes.string,
        }).isRequired,
        text: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    topContainer: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'flext-start',
        width: '100%',
        marginBottom: 40,
    },
    topContainerReverse: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        position: 'relative',
        top: 20,
    },
    messageWrapper: {
        flexWrap: 'wrap',
        minWidth: 100,
        maxWidth: 250,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
    },
    messageWrapperReverse: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 0,
    },
    messageContainer: {
        padding: 10,
    },
    messageText: {
        color: colors.lightgray,
    },
    time: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
});

export {Message};