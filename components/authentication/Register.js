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

    //TODO: dob should be a calendar
    //TODO: gender should be at least 4: Male, Female, Other, Prefer not to say
    //TODO: courses should be all courses presented by UKC
    //TODO: yearofstudy should be 4 options based on UG(1-4) and PG(1)
    //TODO: stage should be 2 options Undergraduate and Postgraduate
    //TODO: accomodation list of colleges depending on location(Canterbury or Medway)
    //TODO: nationality list of all nationalities
    //TODO: placeofstudy should be 2 options Medway and Canterbury
    onSignUp(){
        const  {email,
                password,
                name,
                surname,
                dob,
                gender,
                anonynoususername,
                username,
                course,
                yearofstudy,
                stage,
                bio,
                topics,
                friends,
                photos,
                messages,
                accomodation,
                stayaround, //same as accomodation
                nationality,
                placeofstudy,
                followers,
                following,
                videos,
                likes,
                societies,
                profileimage

                } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                email,
                password,
                name,
                surname,
                dob,
                gender,
                anonynoususername,
                username,
                course,
                yearofstudy,
                stage,
                bio,
                topics,
                friends,
                photos,
                messages,
                accomodation,
                stayaround, //same as accomodation
                nationality,
                placeofstudy,
                followers,
                following,
                videos,
                likes,
                societies,
                profileimage
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
