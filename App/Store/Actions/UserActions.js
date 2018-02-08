import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_USER_NUMBER,
  UPDATE_USER_DETAILS,
  UPDATE_USER_AUTH_TOKEN,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from "../StoreConstants";
import ApiHelper, { BASE_URL } from "../../ApiHelper";
export function loginUser() {
  return dispatch => {
    dispatch(getProfile());
    dispatch(_loginUser());
  };
}

export function getProfile() {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    ApiHelper.getProfile(authToken).then(res => {
      if (res && res.success) {
        let { name, phone, email, image } = res.user;
        dispatch(
          updateUserDetails({
            phoneNum: phone.toString(),
            email,
            name,
            image: `${BASE_URL}/${image}`
          })
        );
      }
    });
  };
}
export function updateProfile(user) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_updateProfile());
    ApiHelper.updateProfile(authToken, user).then(res => {
      if (res && res.success) {
        dispatch(_updateProfileSuccess());
        dispatch(getProfile());
      } else {
        dispatch(_updateProfileFailure());
      }
    });
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

export function updateUserDetails(userDetails) {
  return dispatch => {
    dispatch(_updateUserDetails(userDetails));
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

function _updateUserDetails(userDetails) {
  return {
    type: UPDATE_USER_DETAILS,
    userDetails
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

function _updateProfile(userDetails) {
  return {
    type: UPDATE_PROFILE
  };
}
function _updateProfileSuccess(userDetails) {
  return {
    type: UPDATE_PROFILE_SUCCESS
  };
}
function _updateProfileFailure() {
  return {
    type: UPDATE_PROFILE_FAILURE
  };
}
