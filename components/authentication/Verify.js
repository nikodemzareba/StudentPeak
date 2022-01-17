import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Component, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native'

import { SimpleLineIcons } from '@expo/vector-icons'


import firebase from 'firebase'
import 'firebase/firestore'



export class Verify extends Component {

  constructor(props) {
    super(props)

    this.state = {
      verifyEmail: '',
    }

    this.onVerify = this.onVerify.bind(this)
  }

  onVerify() {
    const { verifyEmail} = this.state
        firebase.firestore()
        .collection("users")
        .set({
          verifyEmail,
        })
        .then(() => {
        console.log(`Successfully Verified`);
        })
        .catch((error) => {
          console.log(error)
        })
      }
    
      
  
    


  render(){
    const { navigation } = this.props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <SimpleLineIcons
          style={styles.icon}
          name="arrow-left"
          size={20}
          color="white"
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.logo}>StudentPeak</Text>
      </View>
      <View>
        <Text style={styles.createText}>Student Status</Text>
      </View>
      <View>
        <Text style={styles.etextView}>Student Email</Text>
      </View>
      <View style={styles.emailView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email address*"
          placeholderTextColor="black"
          onChangeText={(verifyEmail) => this.setState({ verifyEmail })}
        />
      </View>
      <View>
        <Text style={styles.ptextView}>Place of Study</Text>
      </View>
      <View style={styles.passView}>
        
        {/* <Picker
          selectedValue={selectedValue}
          style={{ height:100, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="University of Kent" value="ukc" />
          <Picker.Item label="Canterbury Christ Church" value="ccu" />
        </Picker> */}
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={this.onVerify}>
        <Text style={styles.loginText}>Verify</Text>
      </TouchableOpacity>
    </View>
  )
 }
}

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
    marginBottom: 40,
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
  emailView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  passView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  confirmpassView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
    fontFamily: 'Montserrat',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 80,
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
    marginRight: 150,
    fontSize: 20,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  cptextView: {
    height: 30,
    marginRight: 100,
    fontSize: 20,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  signText: {
    marginTop: 20,
    color: 'white',
    fontFamily: 'Montserrat',
    textAlign: 'center',
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
})

export default function(props) {
  const navigation = useNavigation();

  return <Verify {...props} navigation={navigation} />;
}