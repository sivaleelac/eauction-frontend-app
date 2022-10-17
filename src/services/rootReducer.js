import {combineReducers} from "redux";
import personReducer from "./person/personReducer";
import authReducer from "./person/auth/authReducer";

const rootReducer = combineReducers({
    person: personReducer,
    auth: authReducer
});

export default rootReducer;