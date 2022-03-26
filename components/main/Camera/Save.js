import {Feather} from '@expo/vector-icons';
import {Video} from 'expo-av';
import firebase from 'firebase';
import React, {useLayoutEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert, Dimensions,
    FlatList,
    Image, Linking,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import MentionsTextInput from 'react-native-mentions';
import {Snackbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserPosts, sendNotification} from '../../../redux/actions';
import {getRandomString} from "../Feeds/Shared_Objects/Functions_And_Methods/getRandomString";
import {B} from "../Feeds/Shared_Objects/Bold";
import Trending_Topics_TXT from "../Feeds/Trending_Feed/Trending_Feed_Objects/Trending_Topics_TXT";
import Topic_Object from "../Feeds/Trending_Feed/Trending_Feed_Objects/Topic_Object";


// Firebase collection information. 
// Type "1" = Image
// Type "0" = Video

require("firebase/firestore")
require("firebase/firebase-storage")


function Save(props) {

    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;

    const [caption, setCaption] = useState("")

    const [uploading, setUploading] = useState(false)
    const currentUser = firebase.auth().currentUser.uid;

    const [postTags, setPostTags] = useState([])
    const [tagToAdd, setTagToAdd] = useState("");
    const [refreshFlatListTags, setRefreshFlatListTags] = useState(false)

    const postStorageRef = (postID) => `posts/${currentUser}/${postID}`;

    const postsRef =
        firebase.firestore()
            .collection("posts")
            .doc(currentUser)
            .collection("userPosts")


    const postDataRef =
        firebase.firestore()
            .collection("postData")


    const postTagsDocRef = (tag) =>
        firebase.firestore()
            .collection("postTags")
            .doc(tag)

    const postTagsDocPostsRef = (tag, postID) =>
        firebase.firestore()
            .collection("postTags")
            .doc(tag)
            .collection("posts")
            .doc(postID)


    const [keyword, setKeyword] = useState("")
    const [error, setError] = useState(false)

    const [data, setData] = useState("")


    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Feather style={navbar.image} name="check" size={24} color="green" onPress={() => {
                    uploadImage()
                }}/>
            ),
        });

        console.log(`\n\n propsType: ${props.route.params.type}`)

    }, [caption]);

    const uploadImage = async () => {

        try {

            const result = await firebase.firestore().runTransaction(async (t) => {

                setUploading(true);
                console.log(`\n\nSave uploadImage() - Requested to save to firebase Storage`);

                let postID = getRandomString(36); // generate postID
                const storagePath = postStorageRef(postID); // generate storage path

                console.log(`\nSave uploadImage() - checking if tags exist`);

                // check if tags exist in db
                let postTagsChecked = [];
                for (const tag of postTags) {

                    const postTagFetched = await t.get(postTagsDocRef(tag.key));
                    let found = false;

                    if (postTagFetched.exists) {
                        console.log(`\n${tag.key} does exist`)
                        found = true;
                    } else {
                        console.log(`\n${tag.key} doesn't exists`)
                    }

                    postTagsChecked.push({
                        key: tag.key,
                        inDB: found,
                    });
                }

                // Uploading file to storage
                console.log(`\nSave uploadImage() - uploading to firebase Storage`);
                const response = await fetch(props.route.params.source); // fetch media
                const blob = await response.blob(); // convert to blob
                const ref = firebase.storage().ref().child(storagePath); // reference to mediaFile path

                await ref.put(blob)
                    .then(snapshot => {
                        return snapshot.ref.getDownloadURL();
                    })
                    .catch((error) => {
                        console.log(`${error} \nSave uploadImage() - Error uploading file to fire-storage!`);
                    })
                    .then(async downloadURL => {
                        console.log(`\nSave uploadImage() uploading; posts, postData`);

                        t.set(postsRef.doc(postID), {})

                        const mediaType = props.route.params.type === 0 ? "video" : "picture";

                        t.set(postDataRef.doc(postID), {
                            caption: caption,
                            commentsCount: 0,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            downloadURL: downloadURL,
                            likesCount: 0,
                            mediaType: mediaType,
                            thumbnail: props.route.params.imageSource,
                            userId: currentUser,
                        })

                        console.log(`\nSave uploadImage() uploading to postTags`);

                        let pos = 0;
                        const noOfTags = postTagsChecked.length;

                        for (const tag of postTagsChecked) {
                            pos++;
                            console.log(`\nSave uploadImage() uploading to postTag ${tag.key}`);

                            if (tag.inDB) // if tag already exists update count
                            {
                                await t.update(postTagsDocRef(tag.key), "numberOfPosts", firebase.firestore.FieldValue.increment(1))
                            } else // if tag doesnt exist create count
                            {
                                await t.set(postTagsDocRef(tag.key), {numberOfPosts: 1});
                            }

                            await t.set(postTagsDocPostsRef(tag.key, postID), {})

                            if (noOfTags === pos) {
                                console.log(`\n\nSave uploadImage() 1  Successfully uploaded to all paths in DB!`);

                                setUploading(false);
                                props.navigation.navigate("Add")
                            }
                        }
                        if (noOfTags === 0) {
                            console.log(`\n\nSave uploadImage() 2 Successfully uploaded to all paths in DB!`);

                            setUploading(false);
                            props.navigation.navigate("Add")
                        }
                    });
            })

        } catch (e) {
            // This will be a "population is too big" error.
            console.log(`\n\nSave uploadImage() Error  \n${e}`);

            alert("Error Uploading Media File!!")
            setUploading(false);
        }
    }


    const renderSuggestionsRow = ({item}, hidePanel) => {
        return (
            <TouchableOpacity onPress={() => onSuggestionTap(item.username, hidePanel)}>
                <View style={styles.suggestionsRowContainer}>
                    <View style={styles.userIconBox}>
                        <Image
                            style={{aspectRatio: 1, height: 45}}
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
        const comment = caption.slice(0, -keyword.length)
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
                    return {id, ...data}
                });
                setData(result)

            })
    }

    return (
        <View style={[container.container, utils.backgroundWhite]}>
            {uploading ? (

                <View style={[container.container, utils.justifyCenter, utils.alignItemsCenter]}>
                    <ActivityIndicator style={utils.marginBottom} size="large"/>
                    <Text style={[text.bold, text.large]}>Upload in progress...</Text>
                </View>
            ) : (
                <View style={[container.container]}>
                    <View style={[container.container, utils.backgroundWhite, utils.padding15]}>

                        <View style={[{marginBottom: 20, width: '100%', borderColor: 'red', borderWidth: 2}]}>


                            <MentionsTextInput

                                textInputStyle={{
                                    borderColor: '#ebebeb',
                                    borderWidth: 1,
                                    padding: 5,
                                    fontSize: 15,
                                    width: '100%'
                                }}
                                suggestionsPanelStyle={{backgroundColor: 'rgba(100,100,100,0.1)'}}
                                loadingComponent={() => <View style={{
                                    flex: 1,
                                    width: 200,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}><ActivityIndicator/></View>}
                                textInputMinHeight={30}
                                textInputMaxHeight={80}
                                trigger={'@'}
                                triggerLocation={'new-word-only'} // 'new-word-only', 'anywhere'
                                value={caption}
                                onChangeText={setCaption}
                                triggerCallback={callback.bind(this)}
                                renderSuggestionsRow={renderSuggestionsRow.bind(this)}
                                suggestionsData={data}
                                keyExtractor={(item, index) => item.username}
                                suggestionRowHeight={45}
                                horizontal={true}
                                MaxVisibleRowCount={3}
                            />
                        </View>

                        {props.route.params.type ?

                            <Image
                                style={container.image}
                                source={{uri: props.route.params.source}}
                                styles={{aspectRatio: 1, backgroundColor: 'black'}}
                            />

                            :

                            <Video
                                source={{uri: props.route.params.source}}
                                shouldPlay={true}
                                isLooping={true}
                                resizeMode="cover"

                                style={{aspectRatio: 1, backgroundColor: 'black'}}
                            />
                        }


                    </View>
                    {/*  <View style={[{ borderColor:'red',borderWidth:2}]}>
                    <Snackbar
                        visible={error}
                        duration={2000}
                        onDismiss={() => setError(false)}>
                        Something Went Wrong!
                    </Snackbar>
                    </View>
                    */}

                    {/* Tag Input */}
                    <View style={[{height: 120, paddingLeft: 15, paddingRight: 15}]}>
                        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', padding: 5}}>
                            <B>Tags:</B>
                        </Text>

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={postTags}
                            horizontal
                            inverted={true}
                            extraData={refreshFlatListTags}


                            contentContainerStyle={{

                                justifyContent: 'space-between'

                            }}
                            ItemSeparatorComponent={
                                () => <View style={{width: 16}}/>
                            }
                            renderItem={({item, index}) => {
                                return (
                                    <>
                                        {item === null ?
                                            <View> </View>
                                            :
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Alert.alert('Notification', `Do you want to remove this tag '${item.key}'?`, [
                                                        {
                                                            text: 'Yes', onPress: () => {
                                                                setPostTags(postTags.filter(x => x.key !== item.key))
                                                                setRefreshFlatListTags(!refreshFlatListTags);
                                                            }
                                                        },
                                                        {
                                                            text: 'No',
                                                            onPress: () => {

                                                            },
                                                            style: 'cancel',
                                                        },
                                                    ]);
                                                }}
                                            >
                                                <Topic_Object

                                                    number={` #${index}`}
                                                    circleBackground={"white"}
                                                    circleTxtColor={"black"}

                                                    text={item.key}
                                                    txtColor={"white"}
                                                    backgroundColor={"black"}
                                                />
                                            </TouchableOpacity>
                                        }

                                    </>

                                )
                            }}
                        />
                    </View>

                    {/* Tag  TXT Input and Tick Button */}
                    <View style={{
                        flexDirection: "row",
                        paddingTop: 15,
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingBottom: 50
                    }}>

                        <View style={{
                            backgroundColor: "white",
                            borderColor: 'black',
                            borderWidth: 2,
                            justifyContent: "center",
                            width: WIDTH - 90,
                            height: 50
                        }}>
                            <TextInput
                                placeholder="Add Tag To Post"
                                textAlign={'center'}
                                onChangeText={(tag) => {
                                    if (tag !== undefined || tag !== "") {
                                        setTagToAdd(tag)
                                    }
                                }}
                            />
                        </View>

                        <View style={{
                            borderColor: 'black',
                            borderWidth: 2,
                            height: 50,
                            width: 62,
                            justifyContent: "center"
                        }}>

                            <Feather style={navbar.image} name="check" size={18} color="green" onPress={() => {
                                if (tagToAdd !== "") {

                                    let x = tagToAdd.split(" ");
                                    let newTag = "";
                                    console.log(`Tag Split by space ${x}`)

                                    x.forEach((txt)=>{
                                       newTag += txt.charAt(0).toUpperCase() + txt.slice(1);
                                    })

                                    const checkIfTagCondition = obj => obj.key === newTag;
                                    const tagCheckedResult = postTags.some(checkIfTagCondition);

                                    if (!tagCheckedResult) {
                                        postTags.push({key: newTag})
                                        setRefreshFlatListTags(!refreshFlatListTags);
                                    }
                                }
                            }}
                            />
                        </View>
                    </View>

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
        aspectRatio: 1,
    },
    fillHorizontal: {
        flexGrow: 1,
        paddingBottom: 0
    },
    imageSmall: {
        aspectRatio: 1,
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

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUserPosts, sendNotification}, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(Save);