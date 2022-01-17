import { combineReducers } from "redux";
import { user } from './user'
import messageReducer from './messageReducer';

export default combineReducers({
    userState: user,
    messages: messageReducer,
});