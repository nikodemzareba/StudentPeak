import React, { useEffect, useRef, useState } from 'react';
import {View, Image, StyleSheet, Text, Button} from 'react-native';
import { Video } from 'expo-av';
import {Feather} from "@expo/vector-icons";

import VideoControls from './VideoControls';
import {B} from "../../../Shared_Objects/Bold";
import  ProfileTitle from "../../../Shared_Objects/Profile_Objects/ProfileTitle"
import Caption from "../../../Shared_Objects/Caption";
import Likes_And_Comments_Count_Txt  from "../../../Shared_Objects/Likes_And_Comments/Likes_And_Comments_Count_Txt";
import View_All_Comments from "../../../Shared_Objects/Likes_And_Comments/Comments/View_All_Comments";
import {feedStyles} from "../../../Shared_Objects/Styles";
import LikeBTN from "../../../Shared_Objects/Likes_And_Comments/Likes/LikeBTN";
import LikesAndCommentsDisplay from "../../../Shared_Objects/Likes_And_Comments/LikesAndCommentsDisplay";

export default function VideoPlayer(props) {

  const { 
    height, 
    width, 
    videoUri,
    outOfBoundItems,
    item,
    navigation} = props;

  const playbackInstance = useRef(null);
  
  const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
    position: 0,
    duration: 0,
    state: 'Buffering'
  });

  useEffect(() => {

    return () => {
      if (playbackInstance.current) {
        playbackInstance.current.setStatusAsync({
          shouldPlay: false
        })
      }
    }

  }, []);


  useEffect(() => {

    playbackInstance.current.pauseAsync();

  }, [outOfBoundItems]);
  
  const togglePlay = async () => {

    const shouldPlay = playbackInstanceInfo.state !== 'Playing';

    if (playbackInstance.current !== null) {
      await playbackInstance.current.setStatusAsync({
        shouldPlay,
        ...(playbackInstanceInfo.state === 'Ended' && { positionMillis: 0 }),
      })
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        state:
          playbackInstanceInfo.state === 'Playing'
          ? 'Paused'
          : 'Playing',
      })
    }

  }


  const updatePlaybackCallback = (status) => {
    //console.log(status, 'status');
    if (status.isLoaded) {
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        position: status.positionMillis,
        duration: status.durationMillis || 0,
        state: status.didJustFinish ? 'Ended' : 
        status.isBuffering ? 'Buffering':
        status.shouldPlay ? 'Playing' : 'Paused'
      })
    } else {
      if (status.isLoaded === false && status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        //console.log(errorMsg, 'error')
        // setErrorMessage(errorMsg)
      }
    }

  }

  return (
    <View style={feedStyles.post}>
      <ProfileTitle name={item.name} profileImage={item.profile} userID ={item.userID} navigation={navigation}  />
        <Video
          ref={playbackInstance}
          style={styles.video(width, height)}
          source={{ uri:videoUri }}
          resizeMode="cover"
          isLooping
          //useNativeControls
          //volume={5.0}
          //muted={true}
          onPlaybackStatusUpdate={updatePlaybackCallback}
        />
      <View style={styles.controlsContainer}>
        <VideoControls
          state={playbackInstanceInfo.state}
          playbackInstance={playbackInstance.current}
          playbackInstanceInfo={playbackInstanceInfo}
          setPlaybackInstanceInfo={setPlaybackInstanceInfo}
          togglePlay={togglePlay}
        />
      </View>
      <LikesAndCommentsDisplay userID={props.userID}  userLikedPost={item.userLikedPost} postID={item.key} navigation={props.navigation}/>

    </View>
  );
}


const styles = StyleSheet.create({
  video: (width, height) => ({
    alignSelf: 'center',
    width: width,
    height: undefined,
    aspectRatio: 1,
  }),
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  controlsContainer: {
    position:'absolute',
    bottom:10,
    padding:30,
  }
});

