import {Dimensions, FlatList, Image, StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";
import ProfileTitle from "./Shared_Objects/ProfileTitle";
import Caption from "./Shared_Objects/Caption";
const {height, width} = Dimensions.get('window');
export default function PictureFeed(props) {
    return (
        <View style={{flex: 1}}>

            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{paddingTop: 25}}
                data={props.data}
                horizontal={false}
                scrollEventThrottle={20}
                showsVerticalScrollIndicator={false}
               // onViewableItemsChanged={this.handlePicturesViewableItemsChanged}
                viewabilityConfig={{itemVisiblePercentThreshold: 30, waitForInteraction: true}}
                overScrollMode="never"
                renderItem={({item}) => {
                    return (
                        <View style={{flex: 1, marginBottom: 20}}>
                            <ProfileTitle name={item.name} profilePicture={item.profile}/>

                            <Image source={{uri: item.downloadURL}}
                                   style={styles.picture(width, height)}/>

                            <Caption  name={item.name} caption={item.caption}  />

                        </View>
                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    picture: (width, height) => ({
        alignSelf: 'center',
        width: width,
        height: height
    }),
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 10
    }
})