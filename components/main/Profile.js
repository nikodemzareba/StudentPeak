import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, Image, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Profile() {

    const styles = StyleSheet.create({
        imageStyle: {
            height: 50,
            width: 50,
            borderRadius: 75,
            
        },
        container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        },
        createText: {
            fontWeight: 'bold',
            fontFamily: 'Montserrat',
            fontSize: 18,
            color: 'white',
            justifyContent: 'center',
            alignContent: 'center'

        },
        textWrapper: {
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 75,
            padding: 10,
            backgroundColor: 'grey',
          
            
        },
        lines: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    return (
        <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
            <ScrollView
            style={StyleSheet.container}
             contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} >
           <SafeAreaView style = {styles.lines}>
                  
                   <View style ={styles.textWrapper}>
                   <Image 
                  style = {styles.imageStyle}
                  source = {require('../../assets/ProfilePicture.png')}
                  />
                  <Text style = {styles.createText}>Mike Wazowski</Text>
                  
               </View>
               <View style ={styles.textWrapper}>
               <Text style = {styles.createText}>Followers</Text>
               </View>
               <View style ={styles.textWrapper}>
               <Text style = {styles.createText}>Following</Text>
               </View>
               </SafeAreaView>
            </ScrollView>
        </SafeAreaView>

    );
 
 
   
};