import { UPDATE_USER, UPDATE_USER_NUMBER } from "../StoreConstants";

export function updateUserNumber(phoneNum, otp) {
  return dispatch => {
    dispatch(_updateUserNumber(phoneNum, otp));
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
