import {
  OTP_REQUEST,
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILURE,
  OTP_REQUEST_ERROR
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import {
  updateUserDetails,
  updateUserAuthToken,
  loginUser
} from "./UserActions";

export function verifyOtp(phoneNum, otp) {
  return dispatch => {
    dispatch(_onVerifyOtp());
    ApiHelper.checkOtp(phoneNum, otp).then(res => {
      if (res) {
        if (res.success) {
          let { is_registered, token, phone, user_id } = res;
          if (is_registered) {
            dispatch(updateUserDetails(user_id, phoneNum));
            dispatch(updateUserAuthToken(token));
            dispatch(loginUser());
            dispatch(_onVerifyOtpSuccess(true));
          } else {
            dispatch(_onVerifyOtpSuccess(false));
          }
        } else {
          res.message
            ? dispatch(_onVerifyOtpError())
            : dispatch(_onVerifyOtpFailure());
        }
      }
    });
  };
}

function _onVerifyOtp() {
  return {
    type: OTP_REQUEST
  };
}

function _onVerifyOtpSuccess(isRegisteredUser) {
  return {
    type: OTP_REQUEST_SUCCESS,
    isRegisteredUser
  };
}
function _onVerifyOtpFailure() {
  return {
    type: OTP_REQUEST_FAILURE
  };
}
function _onVerifyOtpError() {
  return {
    type: OTP_REQUEST_ERROR
  };
}
