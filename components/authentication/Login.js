import firebase from 'firebase';
import "firebase/firestore";
import React from 'react'
import { Component, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import SwitchSelector from 'react-native-switch-selector'
import { SimpleLineIcons } from '@expo/vector-icons'; 

/* - 
LOGIN CLASS v1.1
PROBLEMS: 
- Navigation stack doesn't want to work - further research. 
- Stay logged in button does not work - should control the state.
- After user is successful send them to a different screen.   
- Missing functionality to set password to visible. 
- Forgot password/ other GUI links needed.

FIXES: 
- USER CAN LOGIN
- Stay logged in button imported/installed.
- GUI IMPROVED.
*/

export class Login extends Component {

  
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
    }

    this.onSignIn = this.onSignIn.bind(this)
}

onSignIn() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
            alert("Account does not exist or wrong details provided.");
        })
}

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <SimpleLineIcons style={styles.icon} name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.logo}>StudentPeak</Text>
        </View>
        <View>
          <Text style={styles.etextView}>Email address</Text>
        </View>
        <View style={styles.emailView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email address*"
            placeholderTextColor="black"
            onChangeText={(email) => this.setState({ email })}
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
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.stayLogged}>Stay Logged in?</Text>
          <SwitchSelector
            textStyle={{ fontFamily: 'Montserrat' }}
            selectedTextStyle={{ fontFamily: 'Montserrat' }}
            initial={0}
            //onPress={(value) => this.setState({ signIn: value })}
            textColor="black" 
            fontSize={20}
            selectedColor="white"
            buttonColor="black"
            borderColor="white"
            hasPadding
            options={[
              { label: ' YES ', value: 'y' }, 
              { label: ' NO ', value: 'n' }, 
            ]}
            testID="signIn-switch-selector"
            accessibilityLabel="signIn-switch-selector"
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={this.onSignIn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.signText}>Don't have an account? Signup</Text>
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
})

export default function(props) {
  const navigation = useNavigation();

  return <Login {...props} navigation={navigation} />;
}

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
