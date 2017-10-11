import {
  OTP_REQUEST,
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILURE
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import { updateUserNumber } from "./UserActions";
export function verifyOtp(phoneNum, otp) {
  return dispatch => {
    dispatch(_onVerifyOtp());
    ApiHelper.checkOtp(phoneNum, otp).then(res => {
      if (res && res.success) {
        dispatch(_onVerifyOtpSuccess());
      } else dispatch(_onVerifyOtpFailure());
    });
  };
}

function _onVerifyOtp() {
  return {
    type: OTP_REQUEST
  };
}

function _onVerifyOtpSuccess() {
  return {
    type: OTP_REQUEST_SUCCESS
  };
}
function _onVerifyOtpFailure() {
  return {
    type: OTP_REQUEST_FAILURE
  };
}
