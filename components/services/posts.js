import firebase from "firebase"

export const getFeed = () => new Promise((resolve, reject) => {
    console.log('attempt to connect')
    /*
    firebase
        .firestore()
        .collection('Videos')
        .get()
        //get res as usable object
        .then((res)=>{
                //map info to object we can use
                const post = res.docs.map((value) =>{
                    const id = value.id;
                    const data = value.data();
                    //should return all the id with their objects
                    return {id, ...data}

                })
                resolve(post)
                console.log('got data')
            },
        )
    console.log("should be rendering data")

     */

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
})
