import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_USER_NUMBER,
  UPDATE_USER_DETAILS,
  UPDATE_USER_AUTH_TOKEN
} from "../StoreConstants";

export function loginUser() {
  return dispatch => {
    dispatch(_loginUser());
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(_logoutUser());
  };
}

export function updateUserNumber(phoneNum, otp) {
  return dispatch => {
    dispatch(_updateUserNumber(phoneNum, otp));
  };
}

export function updateUserDetails(id, phoneNum) {
  return dispatch => {
    dispatch(_updateUserDetails(id, phoneNum));
  };
}

export function updateUserAuthToken(authToken) {
  return dispatch => {
    dispatch(_updateAuthToken(authToken));
  };
}

function _updateAuthToken(authToken) {
  return {
    type: UPDATE_USER_AUTH_TOKEN,
    authToken
  };
}

function _updateUserNumber(phoneNum, otp) {
  return {
    type: UPDATE_USER_NUMBER,
    phoneNum,
    otp
  };
}

function _updateUserDetails(id, phoneNum) {
  return {
    type: UPDATE_USER_DETAILS,
    id,
    phoneNum
  };
}

function _loginUser() {
  return {
    type: USER_LOGIN
  };
}

function _logoutUser() {
  return {
    type: USER_LOGOUT
  };
}
