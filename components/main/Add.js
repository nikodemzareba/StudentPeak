import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { Audio } from "expo-av";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';
import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from "react-native";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);





export default function VideoScreen(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isFlash, setIsFlash] = useState(false);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [type, setType] = useState(0);
    const [showGallery, setShowGallery] = useState(true)
    const [galleryItems, setGalleryItems] = useState([])
    const [galleryScrollRef, setGalleryScrollRef] = useState(null)
    const [galleryPickedImage, setGalleryPickedImage] = useState(null)
    const cameraRef = useRef();
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {

            const cameraPermissions = await Camera.requestPermissionsAsync();
            const galleryPermissions = await MediaLibrary.requestPermissionsAsync();

            const audioPermissions = await Audio.requestPermissionsAsync();

            if (cameraPermissions.status === 'granted' && audioPermissions.status === 'granted' && galleryPermissions.status === 'granted') {
                const getPhotos = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['photo', 'video'] })
                setGalleryItems(getPhotos)
                setGalleryPickedImage(getPhotos.assets[0])
                setHasPermission(true)

            }

        })();
    }, []);
    const onCameraReady = () => {
        setIsCameraReady(true);
    };
    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                props.navigation.navigate('Save', { source, imageSource: null, type })
            }
        }
    };
    const recordVideo = async () => {
        if (cameraRef.current) {
            try {

                const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480p'] }


                const videoRecordPromise = cameraRef.current.recordAsync(options);
                if (videoRecordPromise) {
                    setIsVideoRecording(true);
                    const data = await videoRecordPromise;
                    const source = data.uri;
                    let imageSource = await generateThumbnail(source)
                    props.navigation.navigate('Save', { source, imageSource, type })

                }
            } catch (error) {
                console.warn(error);
            }
        }
    };
    const generateThumbnail = async (source) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                source,
                {
                    time: 5000,
                }
            );
            return uri;
        } catch (e) {
            console.warn(e);
        }
    };


    const stopVideoRecording = async () => {

        if (cameraRef.current) {
            setIsVideoRecording(false);
            cameraRef.current.stopRecording();
        }
    };
    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType((prevCameraType) =>
            prevCameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };
    const handleGoToSaveOnGalleryPick = async () => {
        let type = galleryPickedImage.mediaType == 'video' ? 0 : 1


        const loadedAsset = await MediaLibrary.getAssetInfoAsync(galleryPickedImage);
        let imageSource = null
        if (type == 0) {
            imageSource = await generateThumbnail(galleryPickedImage.uri)

        }

        props.navigation.navigate('Save', {
            source: loadedAsset.localUri,
            type,
            imageSource
        })
    }

    const renderCaptureControl = () => (
        <View>
            <View style={{ justifyContent: 'space-evenly', width: '100%', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
                <TouchableOpacity disabled={!isCameraReady} onPress={() => setIsFlash(!isFlash)} >
                    <Feather style={utils.margin15} name={"zap"} size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
                    <Feather style={utils.margin15} name="rotate-cw" size={25} color="black" />
                </TouchableOpacity>
                {type == 0 ?

                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={!isCameraReady}
                        onLongPress={recordVideo}
                        onPressOut={stopVideoRecording}
                        style={styles.capture}
                    />
                    :
                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={!isCameraReady}
                        onPress={takePicture}
                        style={styles.capturePicture}
                    />}

                <TouchableOpacity disabled={!isCameraReady} onPress={() => type == 1 ? setType(0) : setType(1)} >
                    <Feather style={utils.margin15} name={type == 0 ? "camera" : "video"} size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowGallery(true)} >
                    <Feather style={utils.margin15} name={"image"} size={25} color="black" />
                </TouchableOpacity>
            </View>

        </View>

    );
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }

    if (showGallery) {
        return (
            <ScrollView
                ref={(ref) => setGalleryScrollRef(ref)}
                style={[container.container, utils.backgroundWhite]}>

                <View
                    style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
                    <Image
                        style={{ flex: 1 }}
                        source={{ uri: galleryPickedImage.uri }}

                        style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}
                        ratio={'1:1'}

                    />
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginRight: 20, marginVertical: 10, flexDirection: 'row' }}>

                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 10, marginRight: 15, borderRadius: 50, borderWidth: 1, borderColor: 'black' }}
                        onPress={() => handleGoToSaveOnGalleryPick()} >

                        <Text style={{ fontWeight: 'bold', color: 'white', paddingBottom: 1 }}>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', backgroundColor: 'gray', borderRadius: 50, borderWidth: 1, borderColor: 'black' }} onPress={() => setShowGallery(false)} >
                        <Feather style={{ padding: 10 }} name={"camera"} size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }, [utils.borderTopGray]}>

                    <FlatList
                        numColumns={3}
                        horizontal={false}
                        data={galleryItems.assets}

                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[container.containerImage, utils.borderWhite]}
                                onPress={() => { galleryScrollRef.scrollTo({ x: 0, y: 0, animated: true }); setGalleryPickedImage(item); }}>

                                <Image
                                    style={container.image}
                                    source={{ uri: item.uri }}
                                />

                            </TouchableOpacity>

                        )}

                    />
                </View>

            </ScrollView>
        )
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>

            <View

                style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
                {isFocused ?
                    <Camera
                        ref={cameraRef}
                        style={{ flex: 1 }}
                        type={cameraType}
                        flashMode={isFlash ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                        style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}
                        ratio={'1:1'}
                        onCameraReady={onCameraReady}
                    />
                    : null}

            </View>

            <View style={[{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
            }]}>
                <View>
                    {renderCaptureControl()}
                </View>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        top: 35,
        left: 15,
        height: closeButtonSize,
        width: closeButtonSize,
        borderRadius: Math.floor(closeButtonSize / 2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c4c5c4",
        opacity: 0.7,
        zIndex: 2,
    },
    media: {
        ...StyleSheet.absoluteFillObject,
    },
    closeCross: {
        width: "68%",
        height: 1,
        backgroundColor: "black",
    },
    control: {
        position: "absolute",
        flexDirection: "row",
        bottom: 38,
        width: "100%",

        alignItems: "center",
        justifyContent: "center",
    },
    recordIndicatorContainer: {
        flexDirection: "row",
        position: "absolute",
        top: 0,
        opacity: 0.7,
    },
    recordTitle: {
        fontSize: 14,
        color: "black",
        textAlign: "center",
    },
    recordDot: {
        borderRadius: 3,
        height: 6,
        width: 6,
        backgroundColor: "#ff0000",
        marginHorizontal: 5,
    },
    text: {
        color: "#000000",
    },

    capture: {
        backgroundColor: "red",
        borderRadius: 5,
        height: captureSize,
        width: captureSize,
        borderRadius: Math.floor(captureSize / 2),
        marginHorizontal: 31,
    },
    capturePicture: {
        borderWidth: 6,
        borderColor: 'gray',
        backgroundColor: "white",
        borderRadius: 5,
        height: captureSize,
        width: captureSize,
        borderRadius: Math.floor(captureSize / 2),
        marginHorizontal: 31,
    },
});


const container = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        flexWrap: "wrap"
    },
    containerPadding: {
        flex: 1,
        padding: 15
    },
    center: {
        flex: 1,
    },
    horizontal: {
        flexDirection: 'row',
        display: 'flex',
    },
    form: {
        flex: 1,
        margin: 25
    },
    profileInfo: {
        padding: 25,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',

    },
    formCenter: {
        justifyContent: 'center',
        flex: 1,
        margin: 25
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        aspectRatio: 1 / 1,
    },
    fillHorizontal: {
        flexGrow: 1,
        paddingBottom: 0
    },
    imageSmall: {
        aspectRatio: 1 / 1,
        height: 70
    },
    gallery: {

        borderWidth: 1,
        borderColor: 'gray',
    },
    splash: {
        padding: 200,
        height: '100%',
        width: '100%'
    },
    chatRight: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'dodgerblue',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end'

    },
    chatLeft: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 8,
        alignItems: 'flex-end',
        textAlign: 'right',
        alignSelf: 'flex-start'
    }
})

const utils = StyleSheet.create({
    centerHorizontal: {
        alignItems: 'center',
    },
    marginBottom: {
        marginBottom: 20,
    },
    marginBottomBar: {
        marginBottom: 330,
    },
    marginBottomSmall: {
        marginBottom: 10,
    },
    profileImageBig: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
    profileImage: {
        marginRight: 15,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    profileImageSmall: {
        marginRight: 15,
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
    },
    searchBar: {
        backgroundColor: 'whitesmoke',
        color: 'grey',
        paddingLeft: 10,
        borderRadius: 8,
        height: 40,
        marginTop: -5
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    padding15: {
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
    },
    padding10Top: {
        paddingTop: 10

    },
    padding10: {
        padding: 10
    },
    margin15: {
        margin: 15
    },
    padding10Sides: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    margin15Left: {
        marginLeft: 15,
    },
    margin15Right: {
        marginRight: 15,
    },
    margin5Bottom: {
        marginBottom: 5,
    },
    backgroundWhite: {
        backgroundColor: 'white',
    },
    borderTopGray: {
        borderTopWidth: 1,
        borderColor: 'lightgrey'
    },
    borderWhite: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderColor: 'white'
    },
    buttonOutlined: {
        padding: 8,
        color: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        textAlign: 'center',
    },

    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
})