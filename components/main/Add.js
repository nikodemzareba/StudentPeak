import React, {useState, useEffect} from 'react';
import {eventsData } from '../Json_Testing/EventsJsonData.js';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Image,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    ActivityIndicatorComponent, SafeAreaViewComponent
} from 'react-native';

import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import {jsx} from "react/cjs/react-jsx-runtime.production.min";


export default function Add({navigation}) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const API_URL = "https://reactnative.dev/movies.json";
    const [title, setTitle] = useState([]);



    /*
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("da7203eb879f74f5c81852618ca7a91c2d35a0c298af3ed1d11d14331eed437b");

    const params = {
        q: "events in Austin",
        google_domain: "google.com",
        gl: "us",
        hl: "en"
    };

    const callback = function (data) {
        console.log(data['events_results']);
    };

    // Show result as JSON
    search.json(params, callback);

     */

    useEffect(() => {
        fetch("https://reactnative.dev/movies.json")
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setTitle(json.title);

            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));


        /*
                fetch("http://localhost:3000/")
                    .then((response) => response.json())
                    .then((json) => {
                        setData2(json)
                        console.log("\n\nResults 2" + json);
                    })
                    .catch((error) => console.error(error))
        */
    }, []);

    console.log("\n\nOther Json\n" + eventsData.events_results[0].title + eventsData.events_results[0].date.start_date);


    return (

        <SafeAreaView style={{flex: 1, padding: 24}}>
            {isLoading ? (<ActivityIndicator/> //<Text>Loading...</Text>
            ) : (
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Text style={styles.title}>{eventsData.search_parameters.q}</Text>
                    <Text
                        style={{fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>
                    <FlatList
                        data={eventsData.events_results}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item}) => (
                            <Text>{item.title}</Text>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>


    );

};

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 48,
    },
    movieText: {
        fontSize: 32,
        fontWeight: "bold"
    },
    title: {
        fontSize: 32, fontWeight: "bold"
    }
})
