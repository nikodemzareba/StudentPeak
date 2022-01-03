import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, useState } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import FloatingActionButton from "react-native-floating-action-button";

export default function Interests({ navigation }) {


 
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>StudentPeak</Text>

      <Text style={styles.intro}>Recommended groups for you</Text>
      
        <View style={styles.buttons}>
        
          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Freshers 2022</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Theraputic Arts</Text>
          </TouchableOpacity>

          

         

         </View>
        
        <View style={styles.buttons}>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Compuing Society</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Dance Society</Text>
          </TouchableOpacity>

          

         
        </View>

        <View style={styles.buttons}>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Film Society</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Music Society</Text>
          </TouchableOpacity>

          

         

        </View>

        <View style={styles.buttons}>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Basketball Society</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Women in STEM</Text>
          </TouchableOpacity>

          

          
        </View>

        <View style={styles.buttons}>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>UKC Yoga Society</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>UKC Philosophy Society</Text>
         </TouchableOpacity>

         

         
        </View>

        <View style={styles.buttons}>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Tech Society</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>UKC Erasmus Society</Text>
          </TouchableOpacity>

          

         
        </View>


        <View style={styles.buttons}>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>UKC History Society</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>UKC Business Society</Text>
         </TouchableOpacity>

         

         
        </View>

        <View style={styles.buttons}>

         <TouchableOpacity style={styles.loginBtn} >
         <Text style={styles.loginText}>UKC Jaoan Society </Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>UKC Poetry Society</Text>
         </TouchableOpacity>

         
         
        </View>

      


      <Text style={styles.introTwo}>TheStudentPeak.com</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'black',
    justifyContent: 'center',

    
  },


  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5
  },
  loginBtn: {
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 0,
   
  },

  loginBtnSel: {
    width: '20%',
    backgroundColor: 'green',
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
    marginBottom: 30,
    marginTop: 50,
    
  },
  intro: {
    color: 'white',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
  },
  introTwo: {
    color: 'white',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 50,
  },
})

