import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import { updateUserNumber } from "./UserActions";
export function onLogin(phoneNum) {
  return dispatch => {
    dispatch(_onLogin());
    ApiHelper.authenticate(phoneNum).then(res => {
      if (res && res.success) {
        dispatch(_onLoginSuccess());
        dispatch(updateUserNumber(phoneNum, res.otp));
      } else dispatch(_onLoginFailure());
    });
  };
}

function _onLogin() {
  return {
    type: LOGIN_REQUEST
  };
}

function _onLoginSuccess() {
  return {
    type: LOGIN_REQUEST_SUCCESS
  };
}
function _onLoginFailure() {
  return {
    type: LOGIN_REQUEST_FAILURE
  };
}
