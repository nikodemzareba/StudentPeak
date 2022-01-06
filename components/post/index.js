import React, { forwardRef, useImperativeHandle, useRef, useEffect }  from 'react'
import { View, Text } from 'react-native'
import {Video } from 'expo-av'
import styles from './styles'


export const PostSingle = forwardRef(({ item }, parentRef) => {
    const ref = useRef(null);

    //pass functions to parent ref using hooks
    useImperativeHandle(parentRef, () => ({
        play,
        unload,
        stop
    }))

    useEffect(() => {
        return () => unload();
    }, [])



    //destroy video instance in memory not in use
    const play = async () => {
        if (ref.current == null) {
            return;
        }

        // if video is already playing return
        const status = await ref.current.getStatusAsync();
        if (status?.isPlaying) {
            return;
        }
        try {
            await ref.current.playAsync();
        } catch (e) {
            console.log(e)
        }
    }

    /**
     *
     * @returns stop the vidoe in the component if the ref
     * of the video is not null
     */
    const stop = async () => {
        if (ref.current == null) {
            return;
        }

        // if video is already stopped return
        const status = await ref.current.getStatusAsync();
        if (!status?.isPlaying) {
            return;
        }
        try {
            await ref.current.stopAsync();
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * unload the vid in the component if the ref
     * of the video is not null
     * @returns
     */

    const unload = async () => {
        if (ref.current == null) {
            return;
        }

        // if video is already stopped return
        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <Video
                style={styles.container}
                resizeMode={Video.RESIZE_MODE_STRETCH}
                shouldPlay={true}
                isLooping
               // usePoster
                //posterSource={{ uri: item.downloadURL }}
                //posterStyle={{ resizeMode: 'cover', height: '100%' }}
                //source = {{uri: "https://firebasestorage.googleapis.com/v0/b/studentpeak-8b306.appspot.com/o/Videos%2FUFIhX1f91a4eMFtKFzy8%2FBig_Buck_Bunny_1080_10s_2MB.mp4?alt=media&token=9906cd4e-5614-4e9a-b01c-837bafdc472e"}}
                //should be the code above but  react is refusing to accept that rn.
                source = {{uri: item.downloadURL}}
            />
            ,
            /</>
    )
})

export default PostSingle

