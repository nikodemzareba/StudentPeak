import firebase from "firebase"

export const getFeed = () => new Promise((resolve, reject) => {
    // Get Users ID's the user is following
    firebase.firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .get()
        .then(snapshot => {
            // for each user ID we are following
            let data = [];
            snapshot.forEach((user) => {
                // console.log("!Users Following: " + user.id);
                data.push(user.id)
            })

            return data;
        })
        .catch((error) => {
            console.log(`${error} \nUnable to Get users Following!`);
        })
        .then(usersFollowing =>
            usersFollowing.forEach((userID) => {
                firebase.firestore()
                    .collection('posts')
                    .doc(userID)
                    .collection('userPosts')
                    .where("mediaType", "==", "video")
                    .get()
                    .then(userPost => {
                        console.log("\n\nUsersID: " + userID);
                        let data2 = [];
                        userPost.forEach((userPost) => {
                            console.log("PostID : " + userPost.id + " | MediaType: "+ userPost.get("mediaType") + " | Download URL: " + userPost.get("downloadURL"));
                            data2.push(userPost.id);
                        })


                        //########################################################################
                        // Israel Code
                        let posts = userPost.docs.map((value) => {
                            const id = value.id;
                            const data = value.data();
                            return { id, ...data }
                        })
                       // console.log(userPost.id)
                        resolve(posts)
                    })
                   //########################################################################
            })
        )
        .catch((error) => {
            console.log(`${error} \nUnable to get Users following posts!`);
        });





//################################################################################################################
//################################################################################################################
//################################################################################################################
/*
    // Get Users ID's the user is following
    firebase.firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .get()
        .then(snapshot => {
            snapshot.forEach((user) => {
                firebase.firestore()
                    .collection('posts')
                    .doc(user.id)
                    .collection('userPosts')
                    .where("mediaType", "==", "video")
                    .get()
                    .then(userPost => {
                        //########################################################################
                        // Delete later
                        console.log("\n\nUsersID: " + user.id);
                        snapshot.forEach((userPost) => {
                            console.log("PostID : " + userPost.id + " | MediaType: "+ userPost.get("mediaType") + " | Download URL: " + userPost.get("downloadURL"));
                        })
                        //########################################################################
                        // Videos
                        let posts = userPost.docs.map((value) => {
                            const id = value.id;
                            const data = value.data();
                            return { id, ...data }
                        })
                        console.log(userPost.id)
                        resolve(posts)
                    })
                    .catch((error) => {
                        console.log(`${error} \nUnable to get Users following posts!`);
                    });
            })
        })
        .catch((error) => {
            console.log(`${error} \nUnable to Get users Following!`);
        });
    console.log("should be rendering data")
 */

})

