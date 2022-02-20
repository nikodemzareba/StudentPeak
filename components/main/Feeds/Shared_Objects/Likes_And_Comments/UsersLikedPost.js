import React, {Component, useRef, useState} from 'react'
import {
    View,
    Dimensions,
    FlatList,
    Text,
    ActivityIndicator,
    ScrollView,
    Button,
    StyleSheet,
    SafeAreaView, Image, TouchableOpacity, ImageBackground
} from 'react-native';
import {feedStyles} from "../Styles";
import ProfileTitle from "../ProfileTitle";
import LikesAndCommentsDisplay from "./LikesAndCommentsDisplay";
import Profile_Icon from "../Profile_Icon";
import Username_Link_Txt from "../Username_Link_Txt";
import {Feather} from "@expo/vector-icons";


export default function UsersLikedPost(props) {

    return (
        <ScrollView style={{flex: 1, paddingTop: 15, backgroundColor: "black"}}>
            <View>
                {/*<FlatList*/}
                {/*    style={{flex: 1}}*/}
                {/*    contentContainerStyle={{paddingTop: 25}}*/}
                {/*    data={props.data}*/}
                {/*    horizontal={false}*/}
                {/*    scrollEventThrottle={20}*/}
                {/*    showsVerticalScrollIndicator={false}*/}
                {/*    viewabilityConfig={{itemVisiblePercentThreshold: 30, waitForInteraction: true}}*/}
                {/*    overScrollMode="never"*/}
                {/*    renderItem={({item}) => {*/}
                {/*        return (*/}
                {/*            <View style={{*/}
                {/*                flexDirection: 'row',*/}
                {/*                alignItems: 'center',*/}
                {/*                justifyContent: 'space-between',*/}
                {/*                paddingHorizontal: 10,*/}
                {/*                marginBottom: 10*/}
                {/*            }}>*/}

                {/*                <View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                {/*                    <Profile_Icon userID={item.userID} width={30} height={30} borderRadius={30}*/}
                {/*                                  profileImage={item.profileImage} navigation={props.navigation}/>*/}

                {/*                    <Username_Link_Txt name={item.name} userID={item.userID} fontSize={15}*/}
                {/*                                       fontWeight={'bold'} navigation={props.navigation}/>*/}
                {/*                </View>*/}
                {/*                <View>*/}
                {/*                    <Button title={"Follow"} />*/}
                {/*                </View>*/}

                {/*            </View>*/}
                {/*        )*/}
                {/*    }}*/}
                {/*/>*/}
            </View>

        </ScrollView>
    )

}