import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";


export default function Interests({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>StudentPeak</Text>

      <Text style={styles.intro}>Please select your interests</Text>
      

      <TouchableOpacity
        style={styles.loginBtn}
         >
        <Text style={styles.loginText}>Art</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.loginBtn}
         >
        <Text style={styles.loginText}>Sports</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.loginBtn}
         >
        <Text style={styles.loginText}>Debating</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
         >
        <Text style={styles.loginText}>Gaming</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        >
        <Text style={styles.loginText}>Technology</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        >
        <Text style={styles.loginText}>Skating</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        >
        <Text style={styles.loginText}>DIY</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        >
        <Text style={styles.loginText}>Climbing</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={styles.loginBtn}
         >
        <Text style={styles.loginText}>Debating</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
         >
        <Text style={styles.loginText}>Swimming</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        >
        <Text style={styles.loginText}>Technology</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        
        >
        <Text style={styles.loginText}> Dance</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
         >
        <Text style={styles.loginText}>Drama</Text>
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


  buttons: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'start',
    justifyContent: 'start',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
    height: 30,
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
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    marginBottom: 50,
    marginTop: 50,
    
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

