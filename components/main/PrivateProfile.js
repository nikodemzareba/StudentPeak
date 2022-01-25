import firebase from 'firebase/app';
import "firebase/auth";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
import { SimpleLineIcons } from '@expo/vector-icons';
import App from '../../App';



const ProfileView = () => {

var db = firebase.firestore();


//const followers = '20';
//const following = '56';




// firebase.auth().onAuthStateChanged(async user => {
//   if (user) {
    
//   setupUI(user);



//   }
  
  
// });



// const setupUI = (user) => {
//   if (user) {
   
//     db.collection('users').doc(user.uid).onSnapshot((doc => {
//       if (doc.exists) {
//       name = doc.data().name;
//       username = doc.data().username;
//       bio = doc.data().bio;
//       console.log(bio);
//       const user = firebase.auth().currentUser;
//       console.log(user.uid);
      
//       }
      
//     }))
//   }
// }

const [profileDisplay, setprofileDisplay] = useState();

const [userPosts, setUserPosts] = useState();



const user = firebase.auth().currentUser;



const retrieveProfileInfo = async() => {
  if (user != null) {
  await db.collection('users').doc(user.uid).get().then((doc) => {
    if( doc.exists ) {
      setprofileDisplay(doc.data());
    }
  })
}
}

const retrieveUserPosts = async() => {
  if (user != null) {
  await db.collection('posts').doc(user.uid).get().then((doc) => {
    if( doc.exists ) {
      setUserPosts(doc.data());
    }
  })
}
}








useEffect(() => {
  
  retrieveProfileInfo();
  retrieveUserPosts();
  
});



// const user = firebase.auth().currentUser;
// if (user != null) {
// user.reload;
// }



//if (user !== null) {
//  setupUI(user);
//}


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
          <Text style={styles.userNameTop}>{profileDisplay ? profileDisplay.username : ''}</Text>
          </TouchableOpacity>
        </View> 
        <SafeAreaView style={styles.lines}>
          <View style={styles.textWrapper}>
          <Image    style={styles.imageStyle}
          source={{
            width: 100,
            height: 200,
            uri: userPosts ? userPosts.downloadURL[0] : ''
          }}
          />
            <Text style={styles.createText}>{profileDisplay ? profileDisplay.name : ''}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.createText2}>Followers</Text>
            <Text style={styles.createText2}>       {profileDisplay ? profileDisplay.followers : '0'}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.createText2}>Following</Text>
            <Text style={styles.createText2}>     {profileDisplay ? profileDisplay.following : '0'}</Text>
          </View>

         
       
        </SafeAreaView>
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
        <View>
            <Text style = {styles.bioText}>    {profileDisplay ? profileDisplay.bio : ''}</Text>
        </View>
        <View>
          <Image style = {styles.postImages}
          source={{
            width: 100,
            height: 200,
            uri: userPosts ? userPosts.downloadURL[0] : ''
          }}
          />
         
        </View>
        <View>
          <Image style = {styles.postImages}
          source={{
            width: 100,
            height: 200,
            uri: userPosts ? userPosts.downloadURL[1] : ''
          }}
          />
         
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
        };


export default ProfileView;


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