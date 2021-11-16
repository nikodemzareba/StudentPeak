import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

/*
Welcome page presents two buttons which allow the 
user to navigate to either register or login. 
*/
export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>StudentPeak</Text>


      <Text style={styles.intro}>A Social Network Exclusive to Students</Text>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Login')}
        >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.introTwo}>TheStudentPeak.com</Text>
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
  loginBtn: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  loginText: {
    color: 'black',
    fontFamily: 'Montserrat',
  },
  logo: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    fontSize: 40,
    color: 'white',
    marginBottom: 100,
  },
  intro: {
    color: 'white',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
  },
  introTwo: {
    color: 'white',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 100,
  },
})
