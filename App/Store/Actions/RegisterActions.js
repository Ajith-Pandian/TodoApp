import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILURE
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import {
  updateUserDetails,
  updateUserAuthToken,
  loginUser
} from "./UserActions";
export function registerUser(user) {
  return dispatch => {
    dispatch(_registerUser());
    ApiHelper.register(user).then(res => {
      if (res && res.success) {
        let { token, phone, user_id } = res;
        dispatch(_registerUserSuccess());
        dispatch(
          updateUserDetails({ id: user_id, phoneNum, authToken: token })
        );
        dispatch(loginUser());
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
