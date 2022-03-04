import {Button, Dimensions, FlatList, Image, ImageBackground, StyleSheet, StatusBar, Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import {Feather} from "@expo/vector-icons";
import React, {useState} from "react";
import {ScrollView} from "react-native-gesture-handler";
import firebase from 'firebase/app';
import "firebase/auth";

const {height, width} = Dimensions.get('window');


export default function PrivateProfileDisplay(props) {

    const [refresh, setRefresh] = useState(false);
      
      


    return (
        <View>
        <FlatList
                showsHorizontalScrollIndicator={false}
                data={props.data}
                horizontal
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                renderItem={({item}) => {
                    return (
<ScrollView style={StyleSheet.container}>
                        <><View style={styles.textWrapper}>
                        <Image style={styles.imageStyle}
                          source={{
                            width: 100,
                            height: 200,
                            uri: item.profileimage ? item.profileimage : 'null'
                          }} />
                        <Text style={styles.createText}>{item.name ? item.name : 'null'}</Text>

                      </View>
                      <View>
                      <Text style={styles.createText}>   @{item.username ? item.username : 'null'}</Text>
                      </View>
                      <View style={styles.textWrapper}>
                      <Text style={styles.createText2}>Followers</Text>
            <Text style={styles.createText}>{item.followers ? item.followers : 'null'}</Text>
                        </View>
                        <View style={styles.textWrapper}>
                        <Text style={styles.createText2}>Following</Text>
            <Text style={styles.createText}>{item.following ? item.following : 'null'}</Text>

                        </View>

                        <SafeAreaView>
                        <View>
            <Text style = {styles.bioText}>   {item.bio ? item.bio : 'null'}</Text>
        </View>
        <View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Edit</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => firebase.auth().signOut()}>
          <Text style={styles.loginText}>Log out</Text>
        </TouchableOpacity>
        </View>
                        </SafeAreaView>
                        </>    
                        </ScrollView>               
                    )
                }}
            />
      
        </View>
        
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    imageStyle: {
      height: 50,
      width: 50,
      borderRadius: 75,
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
    },
    createText: {
      fontWeight: "bold",
      fontSize: 18,
      color: "white",
      justifyContent: "center",
      alignContent: "center",
    },
    createText2: {
      fontWeight: "bold",
      fontSize: 10,
      color: "white",
      justifyContent: "center",
      alignContent: "center",
    },
    textWrapper: {
      borderWidth: 2,
      borderColor: "white",
      borderRadius: 75,
      padding: 10,
      backgroundColor: "grey",
      margin: 10,
    },
    lines: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      top: 20,
    },
    userNameTop: {
      fontWeight: "bold",
      fontSize: 20,
      color: "white",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    loginBtn: {
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        left: 20
      },
      loginText: {
        color: 'black',
    },
    bioText: {
        color: 'white',
        fontSize: 15,
    },
    usernameBackButton: {
      flex: 0,
      flexDirection: 'row'
    },
    postImages: {
      margin: 20,
      left: 20,
     
    }
  });