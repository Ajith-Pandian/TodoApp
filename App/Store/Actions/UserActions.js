import {
  UPDATE_USER,
  UPDATE_USER_NUMBER,
  UPDATE_USER_AUTH_TOKEN
} from "../StoreConstants";

export function updateUserNumber(phoneNum, otp) {
  return dispatch => {
    dispatch(_updateUserNumber(phoneNum, otp));
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

function _updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  };
}
