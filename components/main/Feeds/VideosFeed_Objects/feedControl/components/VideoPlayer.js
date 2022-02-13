import React, { useEffect, useRef, useState } from 'react';
import {View, Image, StyleSheet, Text, Button} from 'react-native';
import { Video } from 'expo-av';
import {Feather} from "@expo/vector-icons";

import VideoControls from './VideoControls';
import {B} from "../../../Shared_Objects/Bold";
import  ProfileTitle from "../../../Shared_Objects/ProfileTitle"
import Caption from "../../../Shared_Objects/Caption";

export default function VideoPlayer(props) {

  const { 
    height, 
    width, 
    videoUri,
    outOfBoundItems,
    item} = props;

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
    <View style={{flex:1, marginBottom:20}}>
      <ProfileTitle name={item.name} profilePicture={item.profile}/>
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
      <Caption  name={item.name} caption={item.caption}  />

    </View>
  );
}


const styles = StyleSheet.create({
  video: (width, height) => ({
    alignSelf: 'center',
    width: width,
    height: height
  }),
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  controlsContainer: {
    position:'absolute',
    bottom:10
  }
});
