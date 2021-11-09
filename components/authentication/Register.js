import React from 'react'
import { Component, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'


import { SimpleLineIcons } from '@expo/vector-icons'; 

import firebase from 'firebase'
import 'firebase/firestore'

const Register = ({navigation}) => {
  function navigate(){
      /* 
      Add validation with 
      database and send user to profile.
      */
      navigation.navigate('Verify'); 
  }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <SimpleLineIcons style={styles.icon} name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.logo}>StudentPeak</Text>
        </View>
        <View>
          <Text style={styles.createText}>Create account</Text>
        </View>
        <View>
          <Text style={styles.etextView}>Email address</Text>
        </View>
        <View style={styles.emailView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email address*"
            placeholderTextColor="black"
            //onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View>
          <Text style={styles.ptextView}>Password</Text>
        </View>
        <View style={styles.passView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password*"
            placeholderTextColor="black"
            //onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View>
          <Text style={styles.cptextView}>Confirm Password</Text>
        </View>
        <View style={styles.confirmpassView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password*"
            placeholderTextColor="black"
            //onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
     

        <TouchableOpacity>
          <Text style={styles.signText}>By signing up you are agreeing to the 
          StudentPeak terms of service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={navigate}>
          <Text style={styles.loginText}>Sign me up...</Text>
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
    marginTop: 30,
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
    textAlign: 'center'
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

export default Register

// export class Login extends Component {
//     constructor(props){
//     super (props);

//     this.state = {
//         email: '',
//         password: ''
//        }
//        this.onLogin = this.onLogin.bind(this)
//     }

//     onLogin(){
//         const { email, password} = this.state;
//         firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((result) => {
//             console.log(result)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
//     }

//     render() {
//         return (
//             <View>
//                 <TextInput
//                     placeholder="email"
//                     onChangeText={(email) => this.setState({email})}
//                 />

//                 <TextInput
//                     placeholder="password"
//                     secureTextEntry={true}
//                     onChangeText={(password) => this.setState({password})}
//                 />
//                 <Button
//                   onPress={() => this.onLogin()}
//                   title="Sign Up"
//                 />
//             </View>
//         )
//     }
// }

// export default Login


// export class Register extends Component {
//     constructor(props){
//     super (props);
//         this.onSignUp = this.onSignUp.bind(this)
//     }

//     //TODO: dob should be a calendar
//     //TODO: gender should be at least 4: Male, Female, Other, Prefer not to say
//     //TODO: courses should be all courses presented by UKC
//     //TODO: yearofstudy should be 4 options based on UG(1-4) and PG(1)
//     //TODO: stage should be 2 options Undergraduate and Postgraduate
//     //TODO: accomodation list of colleges depending on location(Canterbury or Medway)
//     //TODO: nationality list of all nationalities
//     //TODO: placeofstudy should be 2 options Medway and Canterbury
//     onSignUp(){
//         const  {email,
//                 password,
//                 name,
//                 surname,
//                 dob,
//                 gender,
//                 anonynoususername,
//                 username,
//                 course,
//                 yearofstudy,
//                 stage,
//                 bio,
//                 topics,
//                 friends,
//                 photos,
//                 messages,
//                 accomodation,
//                 stayaround, //same as accomodation
//                 nationality,
//                 placeofstudy,
//                 followers,
//                 following,
//                 videos,
//                 likes,
//                 societies,
//                 profileimage

//                 } = this.state;

//         firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((result) => {
//             firebase.firestore().collection("users")
//             .doc(firebase.auth().currentUser.uid)
//             .set({
//                 email,
//                 password,
//                 name,
//                 surname,
//                 dob,
//                 gender,
//                 anonynoususername,
//                 username,
//                 course,
//                 yearofstudy,
//                 stage,
//                 bio,
//                 topics,
//                 friends,
//                 photos,
//                 messages,
//                 accomodation,
//                 stayaround, //same as accomodation
//                 nationality,
//                 placeofstudy,
//                 followers,
//                 following,
//                 videos,
//                 likes,
//                 societies,
//                 profileimage
//             },)
//             console.log(result)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
//     }

//     render() {
//         return (
//             <View>
//                 <TextInput
//                     placeholder="name"
//                     onChangeText={(name) => this.setState({name})}
//                 />

//                 <TextInput
//                     placeholder="email"
//                     onChangeText={(email) => this.setState({email})}
//                 />

//                 <TextInput
//                     placeholder="password"
//                     secureTextEntry={true} 
//                     onChangeText={(password) => this.setState({password})}
//                 />
//                 <Button
//                   onPress={() => this.onSignUp()}
//                   title="Sign Up"
//                 />
//             </View>
//         )
//     }
// }


// export default Register
