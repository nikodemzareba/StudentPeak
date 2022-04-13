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
        .then(commentsCollection => {
            const resultsCount = commentsCollection.size;
            // console.log("\n\n Document has is \n\n" + resultsCount);
            let count = 0;

            //allow user to go comments like
            if (resultsCount === 0) {
                navigation.navigate("showComment", {navigation: navigation, commentInfo: commentInfo, postID: postID})
                return
            }

            commentsCollection.forEach((commentDoc) => {
                count++;
                //get the comment made by the user
                const userComment = commentDoc.get('comment');
                const userId = commentDoc.get('userId')
                const createdAt = commentDoc.get('createdAt')
                // console.log("got user id from data  " + userId + " comm is  " + userComment + "   createdAT" + createdAt )
                //next step will be to go get the comment User Details
                firebase.firestore()
                    .collection('users')
                    .doc(userId)
                    .get()
                    .then(userDetails => {

                        let  userPostedID = commentDoc.id, userExists=false, username ="Deleted User", profileImage="";
                        if(userDetails.exists)
                        {
                            username = userDetails.get("username");
                            profileImage = userDetails.get("profileimage");
                            userExists = true;

                            console.log(`\n\ngetCommentByUsers() \nuserID: ${userPostedID} does exist`)
                        }
                        else {
                            console.log(`\n\ngetCommentByUsers() \nuserID: ${userPostedID} doesnt exist`)
                        }

                        //saving all information into array
                        commentInfo.push({
                            key: userPostedID,
                            username: username,
                            userID: firebase.auth().currentUser.uid,
                            profileImage: profileImage,
                            comment: userComment,
                            createdAt: createdAt,
                            postID: postID,
                            userExists: userExists

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