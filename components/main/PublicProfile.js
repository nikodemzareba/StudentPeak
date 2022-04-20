import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import firebase from "firebase";
import ProfileDisplay from "./ProfileDisplay";
import { feedStyles } from "./Feeds/Shared_Objects/Styles";
import SearchScreenObject from "./Search/Objects/SearchScreenObject";

class PublicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImageLoaded: false,
      profileImage: "",
      userId: firebase.auth().currentUser.uid,

      mediaDataDataFetched: [],
      mediaDataIsLoading: true,
      loadMediaData: false,
      userID: "",
      previous: "",
    };
    this.usersFollowingRef = firebase
      .firestore()
      .collection("following")
      .doc(this.props.route.params.uid)
      .collection("userFollowing");
  }

  componentDidMount() {


    this.props.navigation.addListener('focus', () => {
        this.state.mediaDataDataFetched = [];
        this.getPostInfo(this.props);
    this.getProfileInfo(this.props);
    });
  }


  // This method is passed all of the users posts
  getPostInfo = async (props) => {
    // Get navigated to users info
    firebase
      .firestore()
      .collection("users")
      .doc(props.route.params.uid)
      .get()
      .then((userDetails) => {
        // Get all of the posts from the user
        firebase
          .firestore()
          .collection("posts")
          .doc(props.route.params.uid)
          .collection("userPosts")
          .get()
          .then((privatePosts) => {
            let expectedResultsSize = privatePosts.size;
            let count = 0;

                        privatePosts.forEach((userPost) => {

                            count++;
                            // Get the posts details
                            firebase.firestore()
                                .collection('postData')
                                .doc(userPost.id)
                                .get()
                                .then((postData => {

                                    const profileImage = userDetails.get("profileimage");
                                    const name = userDetails.get("username");
                                    const caption = postData.get("caption");
                                    const createdAt = postData.get("createdAt");
                                    const downloadURL = postData.get("downloadURL");
                                    const mediaType = postData.get("mediaType");
                                    const userID = props.route.params.uid;
                                    const thumbnail = postData.get("thumbnail");

                                    this.state.mediaDataDataFetched.push({
                                        key: userPost.id,
                                        caption: caption,
                                        createdAt: createdAt,
                                        downloadURL: downloadURL,
                                        mediaType: mediaType,
                                        profile: profileImage,
                                        name: name,
                                        userID: userID,
                                        thumbnail: thumbnail,
                                    });

                  if (count === expectedResultsSize) {
                    this.setState({
                      mediaDataDataFetched: this.state.mediaDataDataFetched,
                      loadMediaData: false,
                    });
                  }
                });
            });
          });
      });
  };

  // Get the profile info related to the user
  getProfileInfo = async (props) => {
    const profileDataFetched = [];

    // In the users collection, search for the currently logged in user's info
    firebase
      .firestore()
      .collection("users")
      .doc(props.route.params.uid)
      .get()
      .then((userInfo) => {
        const bio = userInfo.get("bio");
        const followers = userInfo.get("followers");
        const following = userInfo.get("following");
        const name = userInfo.get("name");
        const username = userInfo.get("username");
        const profileimage = userInfo.get("profileimage");

        profileDataFetched.push({
          key: props.route.params.uid,
          bio: bio,
          followers: followers,
          following: following,
          name: name,
          username: username,
          profileimage: profileimage,
          profile: profileimage,
        });

        this.setState({
          profileDataFetched: profileDataFetched,
        });
      });
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, paddingTop: 15, backgroundColor: "black" }}>
        <View>
          <ProfileDisplay
            userID={this.props.route.params.uid}
            data={this.state.profileDataFetched}
            navigation={this.props.route.params.navigation}
          />
        </View>

        {this.state.loadMediaData ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <View style={{ flex: 1, paddingTop: 15, backgroundColor: "black" }}>
            <View style={feedStyles.screenBackground}>
              <View style={{ paddingTop: 10, height: 30 }}></View>

                            <FlatList
                                data={this.state.mediaDataDataFetched}
                                numColumns={3}
                                renderItem={({item}) => (

                                    <SearchScreenObject
                                        item={item}
                                        navigation={this.props.route.params.navigation}
                                        comingFrom={"PublicProfile"}
                                        userIDOfProfile={this.props.route.params.uid}
                                    />
                                )}

                            />

                        </View>
                    </View>
                }
            </ScrollView>
        );

    }
}

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PublicProfile;
