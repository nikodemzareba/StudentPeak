import React, {useState, useEffect} from 'react';
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
    const [title, setTitle] =  useState([]);

    useEffect(() => {
        fetch("https://reactnative.dev/movies.json")
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setTitle(json.title);
                console.log("\n\nResults 1" + json.movies);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));


       fetch("http://localhost:3000/")
           .then((response) => response.json())
           .then((json) => {
               setData2(json)
               console.log("\n\nResults 2" + json.movies);
           })
           .catch((error) => console.error(error))
    }, []);


    return (

        <SafeAreaView style={{ flex: 1, padding: 24 }}>
            {isLoading ? ( <ActivityIndicator /> //<Text>Loading...</Text>
            ):(
                <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>
                    <FlatList
                        data={data.movies}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <Text>{item.id + '. ' + item.title}</Text>
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
    container:{
        flex:1,
        alignItems: "center",
        marginTop:48,
    },
    movieText:{
        fontSize: 32,
        fontWeight:"bold"
    },
    title:{
        fontSize:32, fontWeight:"bold"
    }
})
