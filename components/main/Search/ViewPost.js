import {
    ScrollView,
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity, Dimensions,
} from "react-native";
import React, {useEffect, Component, useState} from 'react'
import {feedStyles} from "../Feeds/Shared_Objects/Styles";
import Pictures_And_Videos_Post_Object from "../Feeds/Shared_Objects/Pictures_And_Videos_Post_Object";
import {SimpleLineIcons} from "@expo/vector-icons";
import styles from "../../post/styles";


const windowHeight = Dimensions.get('window').height;
export default function ViewPost(props) {

    console.log(`\n\nViewPost() ${props.route.params.data.key}`)

    return (

        <View style={{backgroundColor: "black", paddingTop: 30, flex: 1}}>

            <TouchableOpacity style={{padding: 30}}
                              onPress={() => {
                                  const navigation = props.route.params.navigation;
                                  console.log(`\n\nGoing Back to Screen: ${props.route.params.comingFrom}`)

                                  if(props.route.params.comingFrom ==="PrivateProfile")
                                  {
                                      props.route.params.navigation.navigate("PrivateProfile", {navigation: navigation})
                                  }
                                  else if(props.route.params.comingFrom ==="PublicProfile")
                                  {
                                      const userID = props.route.params.userID;
                                      props.navigation.navigate("PublicProfile", {uid: userID})
                                  }
                                  else
                                  {
                                      props.route.params.navigation.navigate("Search", {navigation: navigation})
                                  }
                              }}
            >
                <SimpleLineIcons
                    style={styles.icon}
                    name="arrow-left"
                    size={40}
                    color="white"

                />
            </TouchableOpacity>


            {/*<View style={{paddingTop: 10, height: 20, backgroundColor:"black"}}>*/}
            {/*</View>*/}

            <View style={{flex:1, paddingTop:25, alignItems: 'center'}}>
                <Pictures_And_Videos_Post_Object
                    name={props.route.params.data.name}
                    profileImage={props.route.params.data.profile}
                    userID={props.route.params.data.userID}
                    navigation={props.navigation}
                    downloadURL={props.route.params.data.downloadURL}
                    mediaType={props.route.params.data.mediaType}

                    postID={props.route.params.data.key}
                    commentsCount={props.route.params.data.commentsCount}

                />
            </View>


            {props.route.params.data.mediaType === "video"
                ?
                <View style={{paddingTop: 10, height: 100, backgroundColor:"black"}}>
                </View>
                :

                <View style={{paddingTop: 10, height: 150, backgroundColor:"black"}}>
                </View>}


        </View>

    )
}