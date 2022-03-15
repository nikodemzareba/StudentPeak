import firebase from "firebase";

export const getCommentByUsers = (postID, navigation) => {
    //Array to store comment Details
    let commentInfo = [];
    firebase.firestore()
        .collection('postData')
        .doc(postID)
        .collection("comments")
        //sort comments out by latest entries to the collection
        // .orderBy('createdAt', 'asc')
        .get()
        .then(doc => {
            const resultsCount = doc.size;
            // console.log("\n\n Document has is \n\n" + resultsCount);
            let count = 0;

            //allow user to go comments like
            if (resultsCount === 0) {
                navigation.navigate("showComment", {navigation: navigation, commentInfo: commentInfo, postID: postID})
                return
            }

            doc.forEach((commentGot) => {
                count++;
                //get the comment made by the user
                const userComment = commentGot.get('comment');
                const userId = commentGot.get('userId')
                const createdAt = commentGot.get('createdAt')
                // console.log("got user id from data  " + userId + " comm is  " + userComment + "   createdAT" + createdAt )
                //next step will be to go get the comment User Details
                firebase.firestore()
                    .collection('users')
                    .doc(userId)
                    .get()
                    .then(userDetails => {
                        const username = userDetails.get("username");
                        const profileImage = userDetails.get("profileimage");
                        const userID = firebase.auth().currentUser.uid
                        //saving all information into array
                        commentInfo.push({
                            key: commentGot.id,
                            username: username,
                            userID: userID,
                            profileImage: profileImage,
                            comment: userComment,
                            createdAt: createdAt,
                            postID: postID

                        })
                        // console.log("All details captured here  " +  JSON.stringify(commentInfo));
                        // console.log('Now heading to the comments page')
                        //get the userid of the current user

                        // console.log('user ID is \n' + userID )
                        if (count === resultsCount) {
                            navigation.navigate("showComment", {
                                navigation: navigation,
                                commentInfo: commentInfo,
                                postID: postID
                            })
                        }
                    })
                    .catch((exception) => {
                        alert(`\n\n getCommentByUsers() Error seeing comment Info \n\n${exception}`);
                        console.log(`\n\n getCommentByUsers() Error seeing comment Info \n\n${exception}`);
                    })
            })


        })
        .catch((exception) => {
            alert(`\n\n getCommentByUsers() Error getting users who commented on this post\n\n${exception}`);
            console.log(`\n\n getCommentByUsers() Error getting users who commented on post ${postID}`);
        })
}