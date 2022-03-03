import {FlatList} from "react-native";
import StoriesObject from "./StoriesObject";
import React from "react";

export default function Stories_FlatList(props) {

    return(
        // Profile Stories
    <FlatList
        showsHorizontalScrollIndicator={false}
        data={props.storyData}
        horizontal
        contentContainerStyle={{
            alignItems: 'center'
        }}
        renderItem={({item}) => {
            return (

                <StoriesObject
                    userID={item.key}
                    profileImage={item.profileImage}
                    width={45}
                    height={45}
                    borderRadius={45}
                    username={item.username}
                    maxUsernameLength={8}
                    fontSize={9}
                    navigation={props.navigation}
                />
            )
        }}
    />
    )
}