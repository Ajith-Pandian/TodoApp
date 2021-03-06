import {
  OTP_REQUEST,
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILURE,
  OTP_REQUEST_ERROR
} from "../StoreConstants";

const initialState = {
  isLoading: false,
  isFailed: false,
  isError: false,
  isSuccess: false,
  isRegisteredUser: false
};

export default function OtpReducer(state = initialState, action) {
  switch (action.type) {
    case OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    case OTP_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        isRegisteredUser: action.isRegisteredUser
      };
    }
    case OTP_REQUEST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFailed: true
      };
    }
    case OTP_REQUEST_ERROR: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true
      };
    }

    default:
      return state;
  }
}
