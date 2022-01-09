import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE} from "../constants";

const initialiseState = {
    currentUser: null,
    posts: []
}

export const user = (state = initialiseState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_POSTS_STATE_CHANGE:
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state;
    }
}