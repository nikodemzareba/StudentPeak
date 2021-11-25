import React from 'react'
import { Component, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  UselessTextInput
} from 'react-native'

import SwitchSelector from 'react-native-switch-selector'
import { SimpleLineIcons } from '@expo/vector-icons'; 

import firebase from 'firebase'
import 'firebase/firestore'

const Picture = ({navigation}) => {
  function navigate(){
      /* 
      Add validation with 
      database and send user to profile.
      */
      navigation.navigate('Login'); 
  }

  const [selectedValue, setSelectedValue] = useState("University of Kent");

    return (
      <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <SimpleLineIcons style={styles.icon} name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <View>
                <Text style={styles.logo}>StudentPeak</Text>
            </View>
            <View>
                <Text style={styles.createText}>Select a profile picture</Text>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => pickImage()}>
            {image && <Image source={{ uri: image}} style={{flex: 1}} />}
              <Text style = {styles.loginText}> Pick image from gallery</Text>
              </TouchableOpacity>
            
        </View>
        
      

      
    )
  }
  export default function ImagePicker() {
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
  
    useEffect(() => {
      (async () => {

        const status = await ImagePicker.requestCameraRollPermissionsAsync();
        setHasPermission(status.status === 'granted');
        
      })();
    }, []);
  
    if (hasPermission === false || hasPermission === flase) {
        return <View />;
    }
  
    
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    
   
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 300,
    marginBottom: 40,
    height: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    fontSize: 40,
    color: 'white',
    marginTop: 10,
    marginBottom: 70,
  },
  emailView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 200,
    marginBottom: 30,
    justifyContent: 'center',
    padding: 20,
  },
  passView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 100,
    margin: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    fontFamily: 'Montserrat',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Montserrat',
    marginBottom: 30,
    marginLeft: 150,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  loginText: {
    color: 'black',
    fontFamily: 'Montserrat',
  },
  passwordText: {
    color: 'white',
    fontFamily: 'Montserrat',
    borderRadius: 20,
  },
  etextView: {
    height: 30,
    marginRight: 160,
    fontSize: 20,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  ptextView: {
    height: 30,
    marginRight: 200,
    fontSize: 20,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  signText: {
    marginTop: 10,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat',
  },
  stayLogged: {
    color: 'white',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
  },
  createText: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    fontSize: 30,
    color: 'white',
    marginTop: 10,
    marginRight: 60,
    marginBottom: 30,
  },
})

export default Picture

}
