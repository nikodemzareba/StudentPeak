import {FlatList, Text, View} from "react-native";
import Pictures_And_Videos_Post_Object from "../../Shared_Objects/Pictures_And_Videos_Post_Object";
import React, {useState} from "react";
import {B} from "../../Shared_Objects/Bold";

export default function Trending_Posts_FlatList(props) {
    const [refresh, setRefresh] = useState(false);

    return (
        <View style={{padding:15}}>
            <Text style={{marginLeft: 10, color: 'white', fontSize:20, fontWeight: 'bold', paddingRight: 10}}><B>{props.text}</B>
            </Text>

            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{paddingTop: 25}}
                data={props.data}
                horizontal={true}
                scrollEventThrottle={20}
                showsVerticalScrollIndicator={false}
                viewabilityConfig={{itemVisiblePercentThreshold: 30, waitForInteraction: true}}
                overScrollMode="never"
                extraData={refresh}
                ItemSeparatorComponent={
                    () => <View style={{width: 16}}/>
                }
                renderItem={({item}) => {
                    return (

                        <Pictures_And_Videos_Post_Object
                            name={item.name}
                            profileImage={item.profile}
                            userID={item.userID}
                            navigation={props.navigation}
                            downloadURL={item.downloadURL}
                            mediaType={item.mediaType}

                            postID={item.key}
                            commentsCount={item.commentsCount}
                            height={200}

                        />
                    )
                }}
            />
        </View>
    )
}