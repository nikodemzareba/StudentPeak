import React, {useEffect, useState} from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    StyleSheet,
    TextInput, Button, Image, Dimensions, Alert, ActivityIndicator
} from 'react-native';

import {PORT} from '@env'

import {LocationModalPicker} from "./Objects/LocationModalPicker";
import {EventsModalPicker} from "./Objects/EventsModalPicker";
import MyActivityIndicator from "./Objects/MyActivityIndicator";

import {TouchableHighlight} from "react-native-gesture-handler";

import * as Network from 'expo-network';
export default function Events(props) {

    //https://soufiane-oucherrou.medium.com/how-to-get-react-native-ip-address-1adc191895e0
    const [ipAddress, setIPAddress] = useState(null)
    const displayIP = async () => {
        const ip = await Network.getIpAddressAsync();
        setIPAddress(ip)
        console.log(`\n\nIP Address: ${ip}`)
        console.log(`\n\nIP Address Var: ${ipAddress}`)
    }

    {/* Run Script when page is first rendered */
    }
    useEffect(() => {
           displayIP();
    }, []);

    {/* Variables  */
    }
    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;

    {/* Variables  */
    }
    const [queryData, setQueryData] = useState(null);

    {/* DropDown Option For Location  */
    }

    const [chosenLocation, setChosenLocation] = useState("Select A Location   ...");
    const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
    const changeLocationModalVisibility = (bool) => {
        setIsLocationModalVisible(bool)
    }
    const setLocationData = (option) => {
        setChosenLocation(option);
    }

    {/* DropDown Option For Location  */
    }

    const [chosenEvent, setChosenEvent] = useState("Select An Event   ...");
    const [isEventModalVisible, setIsEventModalVisible] = useState(false);
    const changeEventModalVisibility = (bool) => {
        setIsEventModalVisible(bool)
    }
    const setEventData = (option) => {
        setChosenEvent(option);
    }

    const alertMsg = (title, msg) => {
        alert(msg);
        Alert.alert(title , msg, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    }

    {/* Searching For Event  */}
    const btn_event = async () => {

        console.log(`\n\nEvents Data ${chosenEvent} \n\nLocation Data ${chosenLocation}`)
        if (chosenEvent !== "Select An Event ..." && chosenLocation !== "Select A Location   ...") {
            await searchEvent(chosenEvent, chosenLocation);
            return;
        }

        alertMsg('Error', 'Please enter in an event and select a location to search for events')
    }

    const searchEvent = async (event, location) => {

        const URL = `http://${ipAddress}:${PORT}/api/googleEvents/${event}/${location}`;

        console.log(URL);

        fetch(URL)
            .then(async (response) => response.json())
            .then(async (json) => {
                setQueryData(json);
                // console.log(`\n\nFetch Data Events Page \n${json}`);
                // console.log(`\n\nFetch Data Events Data 1\n${json[0].title}`);
                console.log(`\n\nEvents Page Fetch Data \n${JSON.stringify(json)}`);

                if(json.hasOwnProperty('events_results'))
                {
                    props.navigation.navigate('ShowEventsResults', {json});
                    return;
                }

                // report error
                alertMsg('Error!', 'Cannot Retrieve any results ! \n\nPlease Try Again!')

            })
            .catch((error) => {
                alertMsg('Error Fetching Data!', `Error Fetching Data \n\n${error}`)
                console.log("\n\n"+ error)
            });
    }

    {/* Rendering  */
    }
    return (
        <SafeAreaView style={styles.container}>

            {/*<MyActivityIndicator/>*/}
            <Image
                style={[styles.Image, {width: WIDTH, height: ((HEIGHT / 6) * 4) }]}
                source={require('./Images/Events2.jpg')}
            />

            {/* Text Input */}
            {/*}
            <TextInput style={[styles.input, {width: WIDTH}]}
                       onChangeText={onChangeEvent}
                       value={event} maxLength={30}
                       placeholder="Search For An Event ('Clubbing In Kent')"/>
            */}

            <View style={[styles.dropDownView, {width: WIDTH}]}>
                {/* Drop Down Selection For Event */}
                <TouchableOpacity
                    onPress={() => changeEventModalVisibility(true)}
                    style={[styles.touchableOpacity, {width: (WIDTH / 2) - 15}]}
                >
                    <Text style={styles.text}> {chosenEvent} </Text>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={isEventModalVisible}
                    nRequestClose={() => changeEventModalVisibility(false)}
                >
                    <EventsModalPicker
                        changeModalVisibility={changeEventModalVisibility}
                        setData={setEventData}
                    />
                </Modal>
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={isEventModalVisible}
                    nRequestClose={() => changeEventModalVisibility(false)}
                >
                    <EventsModalPicker
                        changeModalVisibility={changeEventModalVisibility}
                        setData={setEventData}
                    />
                </Modal>
                {/* Text Box */}

                <View style={styles.dropDownView}>
                    <Text style={styles.text}> In </Text>
                </View>

                {/* Drop Down For Location */}
                <TouchableOpacity
                    onPress={() => changeLocationModalVisibility(true)}
                    style={[styles.touchableOpacity, {width: (WIDTH / 2) - 15}]}
                >
                    <Text style={styles.text}> {chosenLocation} </Text>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={isLocationModalVisible}
                    nRequestClose={() => changeLocationModalVisibility(false)}
                >
                    <LocationModalPicker
                        changeModalVisibility={changeLocationModalVisibility}
                        setData={setLocationData}
                    />
                </Modal>
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={isLocationModalVisible}
                    nRequestClose={() => changeLocationModalVisibility(false)}
                >
                    <LocationModalPicker
                        changeModalVisibility={changeLocationModalVisibility}
                        setData={setLocationData}
                    />
                </Modal>
            </View>
            {/* Submit Button */}
            <View style={[styles.view, {width: WIDTH}]}>
                <Button title="Submit" style={styles.button} onPress={btn_event}/>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    dropDownView: {
        backgroundColor: 'lightgrey',
        flexDirection: "row",
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
    },
    view: {
        backgroundColor: "red",
        borderColor: 'black',
        borderWidth: 2,
    },
    modal: {
        backgroundColor: 'black',
        borderRadius: 10
    },
    text: {
        marginVertical: 20,
        fontSize: 15,
        textAlign: 'center'
    },
    touchableOpacity: {
        borderColor: 'black',
        borderWidth: 2,
        padding: 0,
        backgroundColor: 'lightgrey',
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    button: {
        flex: 1,
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    },
    Image: {}

});