import React from 'react';
import { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

import firebase from 'firebase'
import "firebase/firestore";

export class Register extends Component {
    constructor(props){
    super (props);
        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const  {email,
                password,
                name,
                bio,
                topics,
                friends,
                photos,
                messages
                } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email,
                bio,
                topics,
                friends,
                photos,
                messages
            },)
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
                    placeholder="name"
                    onChangeText={(name) => this.setState({name})}
                />

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
                  onPress={() => this.onSignUp()}
                  title="Sign Up"
                />
            </View>
        )
    }
}


export default Register
