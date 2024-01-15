import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from "./type";

export const loginRequest = (payload) => async (dispatch) => {
  dispatch({
    type: LOGIN,
  });
  try {
    const res = await axios.post(
      `http://localhost:5000/users/login`,
      payload.formInput,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });
      Cookies.set("task||userInfo", res.data.token, {
        expires: 30,
      });

      toast.success("Logged In!");
      payload.callback();
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
    });
    toast.error("An error occurred!");
  }
};
export const signupRequest = (payload) => async (dispatch) => {
  dispatch({
    type: SIGNUP,
  });
  try {
    const res = await axios.post(
      "http://localhost:5000/users/signup",
      payload.formInput,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = res.data;

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: responseData,
    });

    toast.success("Account created Successfully");
    payload.callback();
  } catch (error) {
    console.error("Error in signup request:", error);
    dispatch({
      type: SIGNUP_FAILURE,
    });
  }
};
