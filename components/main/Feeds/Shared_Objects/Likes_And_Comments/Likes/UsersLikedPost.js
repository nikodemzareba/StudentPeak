import React from 'react'
import {
    View,
    FlatList,
} from 'react-native';

import {feedStyles} from "../../Styles";

import Profile_Icon from "../../Profile_Objects/Profile_Icon";
import Username_Link_Txt from "../../Profile_Objects/Username_Link_Txt";

import {isUserNameTooLong} from "../../Functions_And_Methods/isUserNameTooLong";
import FollowBTN from "./FollowBTN";
import ProfileIcon_And_Username from "../../Profile_Objects/ProfileIcon_And_Username";


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

                                <ProfileIcon_And_Username
                                    userID={item.key}
                                    profileImage={item.profileImage}
                                    navigation={props.navigation}
                                    name={item.username}
                                />

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
