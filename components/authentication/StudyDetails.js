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

const StudyDetails = ({navigation}) => {
  function navigate(){
      /* 
      Add validation with 
      database and send user to profile.
      */
      navigation.navigate('Connect'); 
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
        <Text style={styles.createText}>Study Details</Text>
      </View>
        <View>
          <Text style={styles.etextView}>Chosen Course</Text>
        </View>
        <View style={styles.emailView}>
        <Picker
          selectedValue={selectedValue}
          style={{ height:100, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Computer Science" value="compc" />
          <Picker.Item label="Business" value="bss" />
        </Picker>
        </View>
        <View>
          <Text style={styles.etextView}>Year of Study</Text>
        </View>
        <View style={styles.emailView}>
        <Picker
          selectedValue={selectedValue}
          style={{ height:100, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="First Year" value="1" />
          <Picker.Item label="Second Year" value="2" />
          <Picker.Item label="Third Year" value="3" />
          <Picker.Item label="Fourth Year" value="4" />
        </Picker>
        </View>
        

        <View>
          <Text style={styles.stayLogged}>Stage of study?</Text>
          <SwitchSelector
            textStyle={{ fontFamily: 'Montserrat' }}
            selectedTextStyle={{ fontFamily: 'Montserrat' }}
            initial={0}
            //onPress={(value) => this.setState({ signIn: value })}
            textColor="black" //'#7a44cf'
            fontSize={15}
            selectedColor="white"
            buttonColor="black"
            borderColor="white"
            hasPadding
            options={[
              { label: ' Undergraduate ', value: 'UG' }, 
              { label: '  Postgraduate  ', value: 'PG' }, 
            ]}
            testID="signIn-switch-selector"
            accessibilityLabel="signIn-switch-selector"
          />
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

export default StudyDetails
