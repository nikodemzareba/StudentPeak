import {feedStyles} from "../Styles";
import ProfileTitle from "../ProfileTitle";
import {Button, Dimensions, ImageBackground, View, StyleSheet} from "react-native";
import LikesAndCommentsDisplay from "./LikesAndCommentsDisplay";
import React from "react";
import {Video} from "expo-av";

export default function Pictures_And_Videos_Post_Object(props) {


    const [status, setStatus] = React.useState({});
    const video = React.useRef(null);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const  heightV = windowHeight/ 1.6;
    const widthV = windowWidth;

    const position = props.mediaType=== "picture" ? "absolute" : "relative";
    return (

        <View style={feedStyles.post}>
            <ProfileTitle
                name={props.name}
                profileImage={props.profileImage}
                userID={props.userID}
                navigation={props.navigation}
            />

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

            <LikesAndCommentsDisplay
                userID={props.userID}
                userLikedPost={props.userLikedPost}
                postID={props.postID}
                likesCount={props.likesCount}
                commentsCount={props.commentsCount}
                navigation={props.navigation}
                position={position}
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
