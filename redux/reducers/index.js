import { combineReducers } from "redux";
import { user } from './user'
import messageReducer from './messageReducer';
import { users } from "./users";

export default combineReducers({
    userState: user,
    usersState: users,
    messages: messageReducer,
});