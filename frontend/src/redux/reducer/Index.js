import { combineReducers } from "redux";
import * as authReducers from "./authReducer";

export default combineReducers({
  login: authReducers.loginReducer,
  signup: authReducers.signupReducer,
});
