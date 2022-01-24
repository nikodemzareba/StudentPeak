import {USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from "../constants";

const initialiseState = {
    users: [],
    usersLoaded: 0,
}

export const users = (state = initialiseState, action) => {
    switch (action.type) {
        case USERS_DATA_STATE_CHANGE:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case USERS_POSTS_STATE_CHANGE:
            return {
                ...state,
                usersLoaded: state.usersLoaded + 1,
                users: state.users.map(user => user.uid === action.uid ?
                    {...user, posts: action.posts}: user)
            }
            
        default:
            return state;
    }
}