import React from 'react'
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

const AboutYou = ({ navigation }) => {
  function navigate() {
    /* 
      Add validation with 
      database and send user to profile.
      */
    navigation.navigate('Login')
  }
  const [selectedValue, setSelectedValue] = useState("University of Kent");


 
  
    
  return (
    <View style={styles.container}>
        <View>
        <Text style={styles.etextView}></Text>
        </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
        <Text style={styles.createText}>About You</Text>
      </View>
      <View>
        <Text style={styles.etextView}>First Name</Text>
      </View>
      <View style={styles.emailView}>
        <TextInput
          style={styles.inputText}
          placeholder=" First Name"
          placeholderTextColor="black"
          //onChangeText={(text) => this.setState({ email: text })}
        />
      </View>
      <View>
        <Text style={styles.etextView}>Last Name</Text>
      </View>
      <View style={styles.emailView}>
        <TextInput
          style={styles.inputText}
          placeholder=" Last Name"
          placeholderTextColor="black"
          //onChangeText={(text) => this.setState({ email: text })}
        />
      </View>
      <View>
      <Text style={styles.etextView}>{'   Date of Birth'}</Text>
      </View>
      <View style = {{flex: 1, flexDirection: 'row'}}>
      <View style={styles.dobView}>
      <TextInput
          style={styles.inputText}
          placeholder=" DD"
          placeholderTextColor="black"
          //onChangeText={(text) => this.setState({ email: text })}
        />
        </View>
        <View style={styles.dobView}>
         <TextInput
          style={styles.inputText}
          placeholder=" MM"
          placeholderTextColor="black"
          //onChangeText={(text) => this.setState({ email: text })}
        />
        </View>
        <View style={styles.dobView}>
         <TextInput
          style={styles.inputText}
          placeholder=" YYYY"
          placeholderTextColor="black"
          //onChangeText={(text) => this.setState({ email: text })}
        />
      </View>
      </View>
      <View>
      <Text style={
          styles.genderTextView}>{'Gender'}</Text>
      </View>
      <View style={styles.passView}>
        <Picker
          selectedValue={selectedValue}
          style={{ height:100, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Male" value="M" />
          <Picker.Item label="Female" value="F" />
          <Picker.Item label="Other" value="O" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={navigate}>
        <Text style={styles.loginText}>Verify</Text>
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
  dobView: {
      left: 200,
    width: '13.5%',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    padding: 10,
    margin: 3 
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
  genderTextView: {
    height: 30,
    marginRight: 200,
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

export default AboutYou
