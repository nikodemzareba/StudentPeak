import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { connect } from "react-redux";

function ProfileDisplay(props) {
  const [userPosts, setUserPosts] = useState();
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;
    console.log({ currentUser, posts });

    if (props.userID == firebase.auth().currentUser.uid) {
      setUser(currentUser);
    } else {
      // Check if user has posts
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("does not exist");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }

    if (props.following.indexOf(props.userID) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.userID, props.following]);

  // On press, follow the user.
  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.userID)
      .set({});

    const increment = firebase.firestore.FieldValue.increment(1);

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({ following: increment });

    firebase
      .firestore()
      .collection("users")
      .doc(props.userID)
      .update({ followers: increment });
  };

  // On press, unfollow the user.
  const onUnFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.userID)
      .delete();

    const decrement = firebase.firestore.FieldValue.increment(-1);

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({ following: decrement });

    firebase
      .firestore()
      .collection("users")
      .doc(props.userID)
      .update({ followers: decrement });
  };

  // Sign the user out.
  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={StyleSheet.container}>
      <FlatList
        data={props.data}
        renderItem={({ item }) => {
          return (
            <>
              <View style={styles.textWrapper}>
                <Image
                  style={styles.imageStyle}
                  source={{
                    width: 100,
                    height: 200,
                    uri: item.profileimage ? item.profileimage : "null",
                  }}
                />
                <Text style={styles.createText}>
                  {item.name ? item.name : "null"}
                </Text>
              </View>
              <View>
                <Text style={styles.createText}>
                  {" "}
                  @{item.username ? item.username : "null"}
                </Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.createText2}>Followers</Text>
                <Text style={styles.createText}>
                  {item.followers ? item.followers : "null"}
                </Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.createText2}>Following</Text>
                <Text style={styles.createText}>
                  {item.following ? item.following : "null"}
                </Text>
              </View>

              <SafeAreaView>
                <View>
                  <Text style={styles.bioText}>
                    {" "}
                    {item.bio ? item.bio : "null"}
                  </Text>
                </View>
                {item.key != firebase.auth().currentUser.uid ? (
                  <View>
                    <View style={styles.loginBtn}>
                      {following ? (
                        <Button
                          title="Following"
                          onPress={() => onUnFollow()}
                        />
                      ) : (
                        <Button title="Follow" onPress={() => onFollow()} />
                      )}
                    </View>
                  </View>
                ) : (
                  <View></View>
                )}

                {item.key === firebase.auth().currentUser.uid ? (
                  <View>
                    <View>
                      <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.loginText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => signOut()}
                      >
                        <Text style={styles.loginText}>Log out</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View></View>
                )}
              </SafeAreaView>
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 75,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  createText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    justifyContent: "center",
    alignContent: "center",
  },
  createText2: {
    fontWeight: "bold",
    fontSize: 10,
    color: "white",
    justifyContent: "center",
    alignContent: "center",
  },
  textWrapper: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 75,
    padding: 10,
    backgroundColor: "grey",
    margin: 10,
  },
  lines: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: 20,
  },
  userNameTop: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  loginBtn: {
    width: "60%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    left: 20,
  },
  loginText: {
    color: "black",
  },
  bioText: {
    color: "white",
    fontSize: 15,
  },
  usernameBackButton: {
    flex: 0,
    flexDirection: "row",
  },
  postImages: {
    margin: 20,
    left: 20,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.postImages,
  following: store.userState.following,
});

export default connect(mapStateToProps, null)(ProfileDisplay);