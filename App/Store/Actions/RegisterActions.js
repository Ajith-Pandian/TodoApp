import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILURE
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import { updateUserAuthToken } from "./UserActions";
export function registerUser(user) {
  return dispatch => {
    dispatch(_registerUser());
    ApiHelper.register(user).then(res => {
      if (res && res.success) {
        dispatch(_registerUserSuccess());
        dispatch(updateUserAuthToken(res.auth_token));
      } else dispatch(_registerUserFailure());
    });
  };
}

function _registerUser() {
  return {
    type: REGISTER_REQUEST
  };
}

function _registerUserSuccess() {
  return {
    type: REGISTER_REQUEST_SUCCESS
  };
}
function _registerUserFailure() {
  return {
    type: REGISTER_REQUEST_FAILURE
  };
}
