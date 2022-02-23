import { Feather } from '@expo/vector-icons';
import { Video } from 'expo-av';
import firebase from 'firebase';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import MentionsTextInput from 'react-native-mentions';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserPosts, sendNotification } from '../../redux/actions/index';



require("firebase/firestore")
require("firebase/firebase-storage")



function Save(props) {
    const [caption, setCaption] = useState("")
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState("")
    const [keyword, setKeyword] = useState("")


    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Feather style={navbar.image} name="check" size={24} color="green" onPress={() => { uploadImage() }} />
            ),
        });
    }, [caption]);

    const uploadImage = async () => {
        if (uploading) {
            return;
        }
        setUploading(true)
        let downloadURLStill = null
        let downloadURL = await SaveStorage(props.route.params.source, `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`)

        if (props.route.params.imageSource != null) {
            downloadURLStill = await SaveStorage(props.route.params.imageSource, `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`)
        }

        savePostData(downloadURL, downloadURLStill);

    }

    const SaveStorage = async (image, path) => {
        if (image == 'default') {
            return '';
        }

        const fileRef = firebase.storage().ref()
            .child(path);

        const response = await fetch(image);
        const blob = await response.blob();

        const task = await fileRef.put(blob);

        const downloadURL = await task.ref.getDownloadURL();

        return downloadURL;
    }
    const savePostData = (downloadURL, downloadURLStill) => {
        let object = {
            downloadURL,
            caption,
            likesCount: 0,
            commentsCount: 0,
            type: props.route.params.type,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }
        if (downloadURLStill != null) {
            object.downloadURLStill = downloadURLStill
        }

        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add(object).then((result) => {
                props.fetchUserPosts()
                props.navigation.popToTop()
            }).catch((error) => {
                setUploading(false)
                setError(true)
            })

        var pattern = /\B@[a-z0-9_-]+/gi;
        let array = caption.match(pattern);

        if (array !== null) {

            for (let i = 0; i < array.length; i++) {
                firebase.firestore()
                    .collection("users")
                    .where("username", "==", array[i].substring(1))
                    .get()
                    .then((snapshot) => {

                        snapshot.forEach((doc) => {
                            props.sendNotification(doc.data().notificationToken, "New tag", `${props.currentUser.name} Tagged you in a post`, { type: 0, user: firebase.auth().currentUser.uid })

                        });
                    })
            }
        }


    }

    const renderSuggestionsRow = ({ item }, hidePanel) => {
        return (
            <TouchableOpacity onPress={() => onSuggestionTap(item.username, hidePanel)}>
                <View style={styles.suggestionsRowContainer}>
                    <View style={styles.userIconBox}>
                        <Image
                            style={{ aspectRatio: 1 / 1, height: 45 }}
                            source={{
                                uri: item.image
                            }}
                        />
                    </View>
                    <View style={styles.userDetailsBox}>
                        <Text style={styles.displayNameText}>{item.name}</Text>
                        <Text style={styles.usernameText}>@{item.username}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const onSuggestionTap = (username, hidePanel) => {
        hidePanel();
        const comment = caption.slice(0, - keyword.length)
        setCaption(comment + '@' + username + " ");
    }


    const callback = (keyword) => {
        setKeyword(keyword)
        firebase.firestore()
            .collection("users")
            .where("username", ">=", keyword.substring(1))
            .limit(10)
            .get()
            .then((snapshot) => {
                let result = snapshot.docs.map(doc => {

                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setData(result)

            })
    }
    return (
        <View style={[container.container, utils.backgroundWhite]}>
            {uploading ? (

                <View style={[container.container, utils.justifyCenter, utils.alignItemsCenter]}>
                    <ActivityIndicator style={utils.marginBottom} size="large" />
                    <Text style={[text.bold, text.large]}>Upload in progress...</Text>
                </View>
            ) : (
                <View style={[container.container]}>
                    <View style={[container.container, utils.backgroundWhite, utils.padding15]}>

                        <View style={[{ marginBottom: 20, width: '100%' }]}>


                            {/*<MentionsTextInput*/}

                            {/*    textInputStyle={{ borderColor: '#ebebeb', borderWidth: 1, padding: 5, fontSize: 15, width: '100%' }}*/}
                            {/*    suggestionsPanelStyle={{ backgroundColor: 'rgba(100,100,100,0.1)' }}*/}
                            {/*    loadingComponent={() => <View style={{ flex: 1, width: 200, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>}*/}
                            {/*    textInputMinHeight={30}*/}
                            {/*    textInputMaxHeight={80}*/}
                            {/*    trigger={'@'}*/}
                            {/*    triggerLocation={'new-word-only'} // 'new-word-only', 'anywhere'*/}
                            {/*    value={caption}*/}
                            {/*    onChangeText={setCaption}*/}
                            {/*    triggerCallback={callback.bind(this)}*/}
                            {/*    renderSuggestionsRow={renderSuggestionsRow.bind(this)}*/}
                            {/*    suggestionsData={data}*/}
                            {/*    keyExtractor={(item, index) => item.username}*/}
                            {/*    suggestionRowHeight={45}*/}
                            {/*    horizontal={true}*/}
                            {/*    MaxVisibleRowCount={3}*/}
                            {/*    */}
                            {/*/>*/}
                        </View>
                        <View>
                            {props.route.params.type ?

                                <Image
                                    style={container.image}
                                    source={{ uri: props.route.params.source }}
                                    style={{ aspectRatio: 1 / 1, backgroundColor: 'black' }}
                                />

                                :

                                <Video
                                    source={{ uri: props.route.params.source }}
                                    shouldPlay={true}
                                    isLooping={true}
                                    resizeMode="cover"

                                    style={{ aspectRatio: 1 / 1, backgroundColor: 'black' }}
                                />
                            }
                        </View>

                    </View>
                    <Snackbar
                        visible={error}
                        duration={2000}
                        onDismiss={() => setError(false)}>
                        Something Went Wrong!
                    </Snackbar>
                </View>
            )}

        </View>

    )
}

const text = StyleSheet.create({
    center: {
        textAlign: 'center',
    },
    notAvailable: {
        textAlign: 'center',
        fontWeight: '700',//'bolder',
        fontSize: 20//'large',
    },
    profileDescription: {
        fontWeight: '300'
    },
    changePhoto: {
        marginTop: 5,
        color: 'deepskyblue',
    },
    deepskyblue: {
        color: 'deepskyblue',
    },
    username: {
        fontWeight: '600',
        color: 'black',
    },
    name: {
        color: 'grey',
    },
    bold: {
        fontWeight: '700',
    },
    large: {
        fontSize: 20//'large'
    },
    small: {
        fontSize: 10//'large'
    },
    medium: {
        fontSize: 15, //'large'
        marginBottom: 10
    },
    grey: {
        color: 'grey'
    },
    green: {
        color: 'lightgreen'
    },
    white: {
        color: 'white'
    },
    whitesmoke: {
        color: 'whitesmoke'
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
const navbar = StyleSheet.create({
    
    image: {
        padding: 20
    },
    custom: {
        marginTop: 30,
        height: 60,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    title: {
        fontWeight: '700',
        fontSize: 20//'larger',
    }
})
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
        margin: 25,
       
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

const styles = StyleSheet.create({
    container: {
        height: 300,
        justifyContent: 'flex-end',
        paddingTop: 100
    },
    suggestionsRowContainer: {
        flexDirection: 'row',
    },
    userAvatarBox: {
        width: 35,
        paddingTop: 2
    },
    userIconBox: {
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#54c19c'
    },
    usernameInitials: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 14
    },
    userDetailsBox: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 15
    },
    displayNameText: {
        fontSize: 13,
        fontWeight: '500'
    },
    usernameText: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.6)'
    }
});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserPosts, sendNotification }, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(Save);