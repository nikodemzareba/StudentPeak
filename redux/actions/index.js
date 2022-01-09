import firebase from 'firebase'
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, FETCH_MESSAGES, POST_MESSAGE} from '../constants/index'

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export function fetchUserPosts(){
    return ((dispatch) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) =>{
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return{id,...data}
                    })
                    console.log(posts)
                    dispatch({type: USER_POSTS_STATE_CHANGE, posts})

            })
    })
}

const setMessages = messages => ({
    type: FETCH_MESSAGES,
    payload: {
        messages,
    },
});

//TODO: get message from firebase
export const fetchMessages = () => {
    return async dispatch => {
        const response = await fetch('https://jsonblob.com/api/jsonBlob/5eaa632d-d887-11e9-9ec2-6ba2d03581bf',
            );
        const data = await response.json();

        return dispatch(setMessages(data));
    };
};

//TODO: get userId, userName, avatarUrl from firebase
export const postMessage = (message, userId, userName) => {
  return {
      type: POST_MESSAGE,
      payload: {
          message: {
              user: {
                  id: userId,
                  name: userName,
                  avatarUrl: 'data:image/png;base64,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'
              },
          },
      },
  };
};