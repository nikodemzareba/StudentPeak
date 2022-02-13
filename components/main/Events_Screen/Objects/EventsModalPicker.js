import React from 'react'
import {
    StyleSheet, Text, View,
    TouchableOpacity, Dimensions, ScrollView
} from 'react-native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const EventsModalPicker = (props) => {

    const OPTIONS = ['Clubbing','Fashion Show','Football','Masquerade Party'];

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option);
    }

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT / 2}]}>
                <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    option: {
        alignItems: 'flex-start'
    },
    text: {
        margin: 20,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    touchableOpacity: {
        //backgroundColor: 'orange',
        alignSelf: 'stretch',
        paddingHorizontal: 20
    }
});

export {EventsModalPicker}