import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function Add({navigation}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => { // checks if user has set permissions to use the camera
    (async () => {
      const hasCameraPermission = await Camera.requestPermissionsAsync();

      setHasCameraPermission(hasCameraPermission.status === 'granted');

      const  galleryStatus  = await ImagePicker.getMediaLibraryPermissionsAsync();
      console.log(galleryStatus.status);

     setHasGalleryPermission(galleryStatus.status === 'granted');

        if (
            galleryStatus.status !== 'granted' &&
            hasCameraPermission.status !== 'granted'
        ) {
            alert('Permission for media access needed.');
        }

    })();
  }, []);

  const takePicture = async () => {
      if(camera){
          const data = await camera.takePictureAsync(null);
          console.log(data.uri)
          setImage(data.uri)
      }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  
  //What does this section do?
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={{flex : 1}}>
        <View style={styles.cameraContainer}>
            <Camera
                ref = {ref => setCamera(ref)}
                style={styles.fixedRatio}
                type={type}
                ratio ={'1:1'} />
        </View>

        <Button
            title = "Flip Image"
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}>
        </Button>
        <Button title="Take Picture" onPress ={() => takePicture()}/>
        <Button title="Pick Image From Gallery" onPress ={() => pickImage()}/>
        <Button title="Save" onPress ={() => navigation.navigate('Save', {image})}/>
        {image && <Image source = {{uri:image}} style = {{flex: 1}} />}  {/* Displays image taken below  */}
    </View>
  );
}

const styles = StyleSheet.create({
   cameraContainer: {
       flex:1,
       flexDirection: 'row'
   },
   fixedRatio:{
    flex:1,
    aspectRatio: 1
   }
})
