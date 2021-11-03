import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, Image, Button } from 'react-native';

export default function App() {
    return (
        <View
            style = {{
                flex: 1,
                flexDirection: "row",
                alignItems: "flex-start",
            }}
        >

            <View style = {{
                backgroundColor: "black",
                flex: 2,
                width: "100%",
                height: "100%",
                position: "absolute",
            }}
            />
            <Image
                source = {require('../../assets/ProfilePicture.png')} 
                style = {{
                    width: 100,
                    height: 100,
                    left: 50,
                    top: 30,
                    borderRadius: 150 / 2,
                    borderColor: "white",
                    borderWidth: 3,

                }}
            />


            <Image
                source= {{
                    width: 100,
                    height: 150,
                    uri: "https://picsum.photos/200/300",

                }}
                style = {{
                    top:250,
                    position: "absolute",
                    borderColor: "white",
                    borderWidth: 3,
                }}
            />

            <Image
                source= {{
                    width: 100,
                    height: 150,
                    uri: "https://picsum.photos/200/300",

                }}
                style = {{
                    top:250,
                    left: 150,
                    position: "absolute",
                    borderColor: "white",
                    borderWidth: 3,
                }}
            />
            <Image
                source= {{
                    width: 100,
                    height: 150,
                    uri: "https://static.wikia.nocookie.net/pixar/images/3/38/Mike1.png/revision/latest?cb=20210509121400",

                }}
                style = {{
                    top:250,
                    left: 290,
                    position: "absolute",
                    borderColor: "white",
                    borderWidth: 3,
                }}
            />
            <Image
                source= {{
                    width: 100,
                    height: 150,
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWRIR39w1s5n0vjtoAUaQKv1m-b2spZgAdgA&usqp=CAU",

                }}
                style = {{
                    top:450,
                    position: "absolute",
                    borderColor: "white",
                    borderWidth: 3,
                }}
            />

            <Image
                source= {{
                    width: 100,
                    height: 150,
                    uri: "https://picsum.photos/200/300",

                }}
                style = {{
                    top:450,
                    left: 150,
                    position: "absolute",
                    borderColor: "white",
                    borderWidth: 3,
                }}
            />
            <Image
                source= {{
                    width: 100,
                    height: 150,
                    uri: "https://picsum.photos/200/300",

                }}
                style = {{
                    top:450,
                    left: 290,
                    position: "absolute",
                    borderColor: "white",
                    borderWidth: 3,
                }}
            />


            <Text style = {{fontSize: 20, fontWeight: "bold", padding: 10, color: "white", left: 75, top: 25}}>Mike Wazowski</Text>
            <Text style = {{fontSize: 15, fontWeight: "bold", padding: 10, color: "white", right: 85, top: 75}}>Followers: {"\n"}    1.2m</Text>
            <Text style = {{fontSize: 15, fontWeight: "bold", padding: 10, color: "white", right: 85, top: 75}}>Following: {"\n"}        1</Text>
            <Text style = {{fontSize: 15, fontWeight: "bold", padding: 10, color: "white", right: 250, top: 140, borderStyle: "solid", borderColor: "white", borderWidth: 1, borderRadius: 50}}>Edit Profile</Text>


        </View>

    );

    const containerStyle = {backgroundColor: "orange"};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});