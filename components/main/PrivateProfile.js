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
const [following, setFollowing] = useState(false);


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

/*
const getFollowing
if(following.indexOf(user.uid) > -1) {
  setFollowing(true);
} else {
  setFollowing(false);
  }

}, [following];
*/

const onFollow = () => {
  if(user!= null) {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(user.uid)
    .set({})
  }
}

const onUnfollow = () => {
  if(user!= null) {
    firebase.firestore()
  .collection("following")
  .doc(firebase.auth().currentUser.uid)
  .collection("userFollowing")
  .doc(user.uid)
  .delete()
  }

}
useEffect(() => {
  
  retrieveProfileInfo();
 
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
            <Image
              style={styles.imageStyle}
              source={require("../../assets/ProfilePicture.png")}
            />
            <Text style={styles.createText}>{profileDisplay ? profileDisplay.name : ''}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.createText2}>Followers</Text>
            <Text style={styles.createText2}>       {profileDisplay ? profileDisplay.followers : ''}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.createText2}>Following</Text>
            <Text style={styles.createText2}>     {profileDisplay ? profileDisplay.following : ''}</Text>
          </View>

          <View style= {styles.container}>
            <View style= {styles.containerInfo}>
          
                <View>
                  {following ?(
                    <Button 
                      title = "Following"
                      onPress = {() => onUnfollow()}


                      />
                  ): 
                  (
                    <Button 
                      title = "Follow"
                      onPress = {() => onFollow()}


                      />
                  )}

                  </View>
                  ) :
                  <Button
                      title="Logout"
                      onPress={() => onLogout()}
                  />
                  </View>
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
            uri: "https://picsum.photos/200/300"
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