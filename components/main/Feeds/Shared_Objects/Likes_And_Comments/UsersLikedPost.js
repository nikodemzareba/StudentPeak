import React from 'react'
import {
    View,
    FlatList,
} from 'react-native';

import {feedStyles} from "../Styles";

import Profile_Icon from "../Profile_Icon";
import Username_Link_Txt from "../Username_Link_Txt";

import {isUserNameTooLong} from "../FunctionsAndMethods/isUserNameTooLong";
import FollowBTN from "./FollowBTN";


export default function UsersLikedPost(props) {

    console.log(`\n\nUsersLikedPost() \nUserID: ${props.route.params.userID} \nPostID: ${props.route.params.postID} \nData: ${props.route.params.postLikeData}`)

    return (
        <View style={feedStyles.screenBackground}>

                <FlatList
                    style={{flex: 1}}
                    contentContainerStyle={{paddingTop: 25}}
                    data={props.route.params.postLikeData}
                    horizontal={false}
                    scrollEventThrottle={20}
                    showsVerticalScrollIndicator={false}
                    viewabilityConfig={{itemVisiblePercentThreshold: 30, waitForInteraction: true}}
                    overScrollMode="never"
                    renderItem={({item}) => {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                marginBottom: 10,
                                padding: 10
                            }}>

                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Profile_Icon userID={item.key} width={50} height={50} borderRadius={50}
                                                  profileImage={item.profileImage} navigation={props.navigation}/>
                                </View>
                                <View style={{alignItems: 'flex-start'}}>
                                    <Username_Link_Txt
                                        name={isUserNameTooLong(item.username, 28)}
                                        userID={item.key}
                                        fontSize={15}
                                        fontWeight={'bold'} navigation={props.navigation}
                                    />
                                </View>
                                <View style={{width: 100, height: 40}}>

                                    {props.route.params.userID !== item.key ?

                                        <FollowBTN userID={props.route.params.userID} otherUserID={item.key}
                                                   followingUser={item.following}/>
                                        :
                                        <View>

                                        </View>

                                    }

                                </View>

                            </View>


                        )
                    }}
                />

        </View>
    )

}
