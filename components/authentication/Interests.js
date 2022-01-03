import React from 'react'

import { StyleSheet, Text, View, Button, TouchableOpacity, useState, SafeAreaView } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import FloatingActionButton from "react-native-floating-action-button";

export default function Interests({ navigation }) {



  return (
    <View style={styles.container}>
      <Text style={styles.logo}>StudentPeak</Text>

      <Text style={styles.intro}>Please select your interests</Text>
      
        <View style={styles.buttons}>
        
          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Art</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Sports</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>DIY</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Debating</Text>
          </TouchableOpacity>

         </View>
        
        <View style={styles.buttons}>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Drama</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Dance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Technology</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Movies</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Music</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Culture</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Anime</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.buttons}>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Cars</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Travel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Media</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Army</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Meditation</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Philosophy</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Food</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Gaming</Text>
         </TouchableOpacity>
        </View>

        <View style={styles.buttons}>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Science</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Engineering</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Clubbing</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Humanities</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.buttons}>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Health</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Business</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Exploring</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Gaming</Text>
         </TouchableOpacity>
        </View>

        <View style={styles.buttons}>

         <TouchableOpacity style={styles.loginBtn} >
         <Text style={styles.loginText}>Reading</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Poetry</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Outdoors</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}>
         <Text style={styles.loginText}>Religion</Text>
         </TouchableOpacity>
        </View>

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
    padding: 16
  },
  loginBtn: {
    width: '20%',
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

