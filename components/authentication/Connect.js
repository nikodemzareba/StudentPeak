import React from 'react'
import { Component, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker
} from 'react-native'

import SwitchSelector from 'react-native-switch-selector'
import { SimpleLineIcons } from '@expo/vector-icons'; 

import firebase from 'firebase'
import 'firebase/firestore'

const Connect = ({navigation}) => {
  function navigate(){
      /* 
      Add validation with 
      database and send user to profile.
      */
      navigation.navigate('Bio'); 
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
        <Text style={styles.createText}>Connect</Text>
      </View>
        <View>
          <Text style={styles.ptextView}>Accommodation</Text>
        </View>
        <View style={styles.emailView}>
        <Picker
          selectedValue={selectedValue}
          style={{ height:100, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Parkwood" value="PW" />
          <Picker.Item label="Keynes" value="K" />
        </Picker>
        </View>
        <View>
          <Text style={styles.etextView}>{" I stay around"}</Text>
        </View>
        <View style={styles.emailView}>
        <Picker
          selectedValue={selectedValue}
          style={{ height:100, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Parkwood" value="PW" />
          <Picker.Item label="Keynes" value="K" />
        </Picker>
        </View>
        <View>
          <Text style={styles.etextView}>Nationality</Text>
        </View>
        <View style={styles.emailView}>
        <Picker
          selectedValue={selectedValue}
          style={{ height:100, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="English" value="EN" />
          <Picker.Item label="Spanish" value="ES" />
        </Picker>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={navigate}>
          <Text style={styles.loginText}>Continue</Text>
        </TouchableOpacity>

      </View>
    )
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
    marginBottom: 70,
  },
  emailView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 50,
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
    height: 50,
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
    marginRight: 110,
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

export default Connect
