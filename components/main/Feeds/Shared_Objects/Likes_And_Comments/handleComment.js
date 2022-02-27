import firebase from "firebase";

export default function handleComment(postId, userId, comment){
//going to need the postId to make comment
    //the current user id
    //the comment
    //the time of the creation
    if(comment.length == 0){
        return console.log("no comment to add")
    }
    else{
        firebase.firestore()
            .collection('postData')
            .doc(postId)
            .collection('comments')
            .add(
                {
                    userId: userId,
                    comment: 'testing comment feature',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                }
            ).then(
            console.log("commented sucessfully added") 
        )
    }


 }