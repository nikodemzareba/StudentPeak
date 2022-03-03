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


function PublicProfile(props) {
  const [userPosts, setUserPosts] = useState();
  const[user, setUser] = useState (null);
   const [following, setFollowing] = useState(false);

 
  useEffect(() => {
    const{currentUser, posts } = props;
    console.log({currentUser, posts})
   
    if(props.route.params.uid == firebase.auth().currentUser.uid) {
      setUser(currentUser)
      retrieveUserPosts();

    }
    else {

      firebase.firestore()
            .collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUser(snapshot.data());
                }
                else {
                    console.log('does not exist')
                }
            })
            firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) =>{
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return{id,...data}
                    })
                    setUserPosts(posts)

            })

    }

    if(props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    }
      else{
        setFollowing(false);
      }


  }, [props.route.params.uid, props.following])



const onFollow = () => {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .set({})
  }

const onUnFollow = () => {
  firebase.firestore()
  .collection("following")
  .doc(firebase.auth().currentUser.uid)
  .collection("userFollowing")
  .doc(props.route.params.uid)
  .delete()
  }

if(user== null) {
  return <View/>
}
return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
  <View style={styles.container}>
    <View style={styles.containerInfo}>
      <View>
    <Text style={styles.userNameTop}>@{user.username}</Text>
    </View>
    
      {props.route.params.uid != firebase.auth().currentUser.uid ? (
        <View>
          {following ?(
            <Button
            title="Following"
            onPress={()=> onUnFollow()}

           />
          ):
          (
            <Button
            title="Follow"
            onPress={()=> onFollow()}

           />
          )}
          </View>

      ) : null}
    </View>
    
    <View style={styles.textWrapper}>
            <Text style={styles.createText2}>Followers</Text>
            <Text style={styles.createText2}>       {user.followers}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.createText2}>Following</Text>
            <Text style={styles.createText2}>     {user.following}</Text>
          </View>
          <View>
  <Text style = {styles.bioText}>    {user.bio}</Text>
  </View>
  <View style={styles.containerGallery}>
 
 <FlatList
   numColumns= {3}
   horizontal = {false}
   data = {userPosts}
   renderItem={({item})=>(
     <View
       style = {styles.containerImage}>
     <Image
     style = {styles.image}
       source={{uri: item.downloadURL}}
     />
     </View>
   ) }
 />

</View>
        
  </View>
 
  </SafeAreaView>

)
}
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
  },
  userNameTop: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
    fontSize: 20,
    color: "white",
    justifyContent: "center",
    alignItems: "flex-start",
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
  bioText: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 15,
},
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.postImages,
  following: store.userState.following
})

export default connect (mapStateToProps, null)(PublicProfile);
