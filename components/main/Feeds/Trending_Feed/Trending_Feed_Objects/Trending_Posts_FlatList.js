import {Dimensions, FlatList, Text, TouchableOpacity, View} from "react-native";
import Pictures_And_Videos_Post_Object from "../../Shared_Objects/Pictures_And_Videos_Post_Object";
import React, {useState} from "react";
import {B} from "../../Shared_Objects/Bold";
import {feedStyles} from "../../Shared_Objects/Styles";

export default function Trending_Posts_FlatList(props) {
    const [refresh, setRefresh] = useState(false);
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    console.log(`\nTrending_Posts_FlatList() ${props.text} Data Size: ${Object.keys(props.data).length}`)

    return (
        <View style={{padding: 15}}>
            <Text style={{

                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',

            }}><B>{props.text}</B>
            </Text>

            {Object.keys(props.data).length === 0 ?
                <View style={{height:(windowHeight/ 3), width:(windowWidth-65), borderColor:"red", borderWidth:2}}>
                </View>
            :

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

                            <TouchableOpacity
                                onPress={() => {
                                    const navigation = props.navigation;
                                    props.navigation.navigate("ViewPost", {navigation: navigation, data: item})
                                }}>
                                <Pictures_And_Videos_Post_Object
                                    name={item.name}
                                    profileImage={item.profile}
                                    userID={item.userID}
                                    navigation={props.navigation}
                                    downloadURL={item.downloadURL}
                                    mediaType={item.mediaType}

                                    postID={item.key}
                                    commentsCount={item.commentsCount}
                                    height={windowHeight / 3}
                                    width={windowWidth - 65}

                                />
                            </TouchableOpacity>
                        )
                    }}
                />
            }

        </View>
    )
}