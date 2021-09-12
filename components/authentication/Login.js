import React from 'react';
import { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

import firebase from 'firebase'
import "firebase/firestore";

export class Login extends Component {
    constructor(props){
    super (props);
    
    this.state = {
        email: '',
        password: ''
       }
       this.onLogin = this.onLogin.bind(this)
    }

    onLogin(){
        const { email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({email})}
                />

                <TextInput
                    placeholder="password"
                    secureTextEntry={true} 
                    onChangeText={(password) => this.setState({password})}
                />
                <Button
                  onPress={() => this.onLogin()}
                  title="Sign Up"
                />
            </View>
        )
    }
}


export default Login
