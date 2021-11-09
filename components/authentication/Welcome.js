import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';


/*
Welcome page presents two buttons which allow the 
user to navigate to either register or login. 
*/
export default function Welcome({navigation}) {
    return (
        <View style={styles.container}>
        <Text style={styles.logo}>StudentPeak</Text>
        
            <Button 
            title = "Register" 
            onPress= {() => navigation.navigate("Register")}
            />
            <Button 
            title = "Login" 
            onPress= {() => navigation.navigate("Login")}
            />
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
    logo: {
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
      fontSize: 40,
      color: 'white',
      marginBottom: 100,
    },
})

