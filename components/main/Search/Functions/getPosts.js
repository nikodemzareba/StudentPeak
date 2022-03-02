import firebase from "firebase";

export  const getPosts = async (tag, navigation) => {

    // Get the posts related to the tag (results = postID's)
    firebase.firestore()
        .collection('postTags')
        .doc(tag)
        .collection('posts')
        .get()
        .then((postTag) => {

            if (postTag === undefined || postTag.size === 0) {
                alert(`Sorry, the tag ${props.postTag} has no results`);
                return;
            }

            const resultSize = postTag.size;
            let count = 0;
            let postsData = []

            // For each postID
            postTag.forEach((post) => {

                // For each postID get its data
                firebase.firestore()
                    .collection('postData')
                    .doc(post.id)
                    .get()
                    .then((postData) => {

                        count++;

                        // Get the user who posted the post's DATA
                        firebase.firestore()
                            .collection('users')
                            .doc(postData.get("userID"))
                            .get()
                            .then(userDetails => {

                                const profileImage = userDetails.get("profileimage");
                                const username = userDetails.get("username");
                                const userID = postData.get("userID");

                                const caption = postData.get("caption");
                                const createdAt = postData.get("createdAt");
                                const downloadURL = postData.get("downloadURL");
                                const mediaType = postData.get("mediaType");

                                const commentsCount = postData.get("commentsCount");

                                postsData.push({
                                    key: postData.id,
                                    userID: userID,
                                    name: username,
                                    profile: profileImage,
                                    caption: caption,
                                    createdAt: createdAt,
                                    downloadURL: downloadURL,
                                    mediaType: mediaType,

                                    commentsCount: commentsCount, // Needs be retrieved inside the comment method
                                });

                                console.log(`\nSearchScreenResults getPosts()  \nUserID: ${userID} \nUserName: ${username} \nProfile Picture: ${profileImage}   \nPostID : ${postData.id} \nMediaType : ${mediaType} \nCaption: ${caption} \nCreatedAt: ${createdAt} \nDownloadURL: ${downloadURL} \nMediaType: ${mediaType} \nCommentsCount: ${commentsCount} `);

                                if (count === resultSize) {
                                    console.log(`\n\nSetting Results `);
                                    navigation.navigate("SearchScreenResults", {
                                        postTag: postTag,
                                        navigation:navigation,
                                        data: postsData
                                    })
                                }
                            })
                    })
                    .catch((exception) => {
                        console.log(`\n\nFind_Post_Object()  getPosts \nError getting postInfo postID's \n\n${exception}`)
                    })
            })


        })
        .catch((exception) => {
            console.log(`\n\nFind_Post_Object()  getPosts \nError getting postTags postID's \n\n${exception}`)
        })
}