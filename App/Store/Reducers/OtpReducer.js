import {
  OTP_REQUEST,
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILURE
} from "../StoreConstants";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false
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
        isSuccess: true,
        isError: false
      };
    }
    case OTP_REQUEST_FAILURE: {
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
