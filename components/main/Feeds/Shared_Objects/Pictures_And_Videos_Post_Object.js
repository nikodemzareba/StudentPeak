import {feedStyles} from "./Styles";
import ProfileTitle from "./Profile_Objects/ProfileTitle";
import {Button, Dimensions, ImageBackground, View, StyleSheet} from "react-native";
import LikesAndCommentsDisplay from "./Likes_And_Comments/LikesAndCommentsDisplay";
import React from "react";
import {Video} from "expo-av";

export default function Pictures_And_Videos_Post_Object(props) {


    const [status, setStatus] = React.useState({});
    const video = React.useRef(null);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const heightV = props.height === undefined ? windowHeight / 1.6 : props.height;
    const widthV =  props.width === undefined ? windowWidth : props.width;

    const position = props.mediaType === "picture" ? "absolute" : "relative";
    return (

        <View style={feedStyles.post}>
            <ProfileTitle
                name={props.name}
                profileImage={props.profileImage}
                userID={props.userID}
                navigation={props.navigation}
            />

            <View style={{height: props.height!==undefined? props.height: undefined, width: props.width!==undefined? props.width: undefined}}>
                {props.mediaType === "picture" ?
                    <ImageBackground
                        source={{uri: props.downloadURL}}
                        style={{
                            width: '100%',
                            height: undefined,

                            aspectRatio: 1,
                        }}
                    />


                    :
                    <View>
                        <Video
                            ref={video}
                            style={feedStyles.video(widthV, heightV)}
                            source={{uri: props.downloadURL}}
                            resizeMode="cover"
                            isLooping
                            useNativeControls
                            //useNativeControls
                            //volume={5.0}
                            //muted={true}
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                    </View>
                }
            </View>

            <LikesAndCommentsDisplay
                userID={props.userID}

                postID={props.postID}
                navigation={props.navigation}
                position={position}

                commentsCount={props.commentsCount}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
