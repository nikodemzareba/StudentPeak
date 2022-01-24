import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Image,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";

import firebase from 'firebase'
require('firebase/firestore')
import "firebase/auth";
import {connect} from 'react-redux'

/*
import { StatusBar } from "expo-status-bar";
import { FlatList, RawButton, ScrollView } from "react-native-gesture-handler";
import { SimpleLineIcons } from '@expo/vector-icons';
import App from '../../App';
*/


function Feed(props) {
  const[posts, setPosts] = useState ([]);
  
  useEffect(() => {
    let posts = [];
    if(props.usersLoaded == props.following.length){
        for (let i = 0; i < props.following.length; i++){
            const user = props.users.find(el => el.uid === props.following[i]);
            if (user != undefined){
                posts = [...posts, user.posts]
            }
        }

        posts.sort(function(x,y) {
            return x.creation - y.creation;
        })

        setPosts(posts);
    }


  }, [props.usersLoaded])

}
return (
  <View style={styles.container}>
    
    <View style={styles.containerGallery}>
      <FlatList
        numColumns= {1}
        horizontal = {false}
        data = {posts}
        renderItem={({item})=>(
          <View
            style = {styles.containerImage}>
            <Text style={styles.container}>{item.user.name}</Text>
            <Image
            style = {styles.image}
                source={{uri: item.downloadURL}}
            />
          </View>
        ) }
      />

    </View>

  </View>

)

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginTop : 40 
  },

  containerInfo: {
    margin : 20

  },

  containerInfoGallery: {
    flex : 1

  },
  image: {
    flex:1 ,
    aspectRatio: 1/1 
  },

  containerImage: {
    flex: 1/3
  }
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersLoaded: store.usersState.users,
})

export default connect (mapStateToProps, null)(Feed);
