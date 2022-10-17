import * as AT from "./authTypes";
import axios from "axios";

const AUTH_URL = "http://3.84.148.234:8060/api/v1/person/authenticate";

export const authenticatePerson = (userName, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(AUTH_URL, {
      userName: userName,
      password: password,
    });
    localStorage.setItem("jwtToken", response.data.accessToken);
    dispatch(success({ emailAddress: response.data.emailAddress, classification: response.data.classification, isLoggedIn: true }));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }
};

export const logoutPerson = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    dispatch(success({ emailAddress: "", classification: "", isLoggedIn: false }));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
