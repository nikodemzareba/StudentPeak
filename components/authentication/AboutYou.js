import React from 'react'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import { Component, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native'




require("firebase/firestore")
require("firebase/firebase-storage")

function AboutYou() {
  const navigation = useNavigation()
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [selectedValue, setSelectedValue] = useState("");


  const onAboutYou = () => {

    // Implement a check for student email to check if the email is .ac.uk.
    // Implement outlook API to authenticate. 
    // Create a database of Universities and render them on screen as selection. 
  
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
          name: name,
          surname: surname,
          dob: dob,
          gender: selectedValue,
        })
        .then(() => {
        //navigation.navigate('AboutYou');
        console.log(`Successfully Verified`);
        })
        .catch((error) => {
          console.log(error)
        })
      };
  


 
  
    
  return (
    <View style={styles.container}>
        <View>
        <Text style={styles.etextView}></Text>
        </View>
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

      <Picker
        selectedValue={selectedValue}
        style={{ height: 10, width: 300, marginBottom: 100 }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        itemStyle={{ backgroundColor: "black", color: "white", fontFamily:"Montseratt", fontSize:20 }}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <TouchableOpacity style={styles.loginBtn} onPress={onAboutYou()}>
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
