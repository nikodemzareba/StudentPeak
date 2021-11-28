import React from 'react';
import {FlatList, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import {Message} from 'Message';

const Messages = ({messages}) => {
    const flatlistRef = userRef(); //TODO: update this field to grab from Firebase

    return (
        <FlatList
            ref={flatlistRef}
            style={styles.flatlist}
            contentContainerStyle={styles.container}
            data={messages}
            renderItem={({item}) => <Message message={item}/>}
            keyExtractor={() => {
                flatlistRef.current.scrollToEnd();
            }}
        />
    );
};

Messages.propTypes = {
    messages: PropTypes.arrayOf(Message.propType.message),
};

Messages.defaultProps = {
    messages: [],
};

const styles = StyleSheet.create({
    flatlist:{
        flex: 1,
    },
    container: {
        width: '100%',
    },
});

export {Messages}