import firebase from "firebase";


export const getProfileImage = (userID) => {
    firebase.firestore()
        .collection('users')
        .doc(userID)
        .get()
        .then(userDetails => {
            console.log(`\n\nCurrent UserID: ${userID} \nProfile Image URL: ${userDetails.get("profileimage")}`)
            if (userDetails.get("profileimage") !== "") {
                console.log(`\n\n Has Profile Image`);
            }

            return  userDetails.get("profileimage");
        })
}