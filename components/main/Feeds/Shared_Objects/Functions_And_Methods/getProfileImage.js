import firebase from "firebase";


export const getProfileImage = async (userID) => {

    return await firebase.firestore()
        .collection('users')
        .doc(userID)
        .get()
        .then(userDetails => {
            console.log(`\n\nCurrent UserID: ${userID} \nProfile Image URL: ${userDetails.get("profileimage")}`)
            if (userDetails.get("profileimage") !== "") {
                console.log(`\n\n Has Profile Image`);
            }

            return userDetails.get("profileimage");
        })
        .
        catch((Exception) =>{
            console.log(`\n\nError getting Profile Image \n\n${Exception}`);
            return undefined;
        })


}