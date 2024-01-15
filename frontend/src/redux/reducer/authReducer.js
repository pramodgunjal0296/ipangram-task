import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "../action/type";

const initialState = {
  login: {},
  loading: false,
  error: null,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Signup failed. Please try again.",
      };

    default:
      return state;
  }
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        login: action.data,
      };
    default:
      return state;
  }
};

export { loginReducer, signupReducer };
