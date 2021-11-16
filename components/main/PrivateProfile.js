import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SimpleLineIcons } from '@expo/vector-icons'

const followers = '20';
const following = '56';
const name = 'Mike Wazowski';
const username = '@MikeWazowski123';
const bio = 'Welcome to Monsters Inc. I am an alien frog.';

export default function PrivateProfile() {
  const styles = StyleSheet.create({
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
      fontFamily: "Montserrat",
      fontSize: 18,
      color: "white",
      justifyContent: "center",
      alignContent: "center",
    },
    createText2: {
      fontWeight: "bold",
      fontFamily: "Montserrat",
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
      fontFamily: "Montserrat",
      fontSize: 20,
      color: "white",
      justifyContent: "left",
      alignItems: "left",
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
        fontFamily: 'Montserrat',
    },
    bioText: {
        color: 'white',
        fontFamily: 'Montserrat',
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView style={StyleSheet.container}>
        <View   style = {styles.usernameBackButton} >
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <SimpleLineIcons
          style={styles.icon}
          name="arrow-left"
          size={20}
          color="white"
          
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.userNameTop}>{username}</Text>
          </TouchableOpacity>
        </View> 
        <SafeAreaView style={styles.lines}>
          <View style={styles.textWrapper}>
            <Image
              style={styles.imageStyle}
              source={require("../../assets/ProfilePicture.png")}
            />
            <Text style={styles.createText}>{name}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.createText2}>Followers</Text>
            <Text style={styles.createText2}>       {followers}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.createText2}>Following</Text>
            <Text style={styles.createText2}>     {following}</Text>
          </View>
        </SafeAreaView>
        <View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Edit</Text>
        </TouchableOpacity>
        </View>
        <View>
            <Text style = {styles.bioText}>    {bio}</Text>
        </View>
        <View>
          <Image style = {styles.postImages}
          source={{
            width: 100,
            height: 200,
            uri: "https://picsum.photos/200/300"
          }}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}