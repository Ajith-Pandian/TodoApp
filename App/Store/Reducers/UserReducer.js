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

const initialState = {
  id: -1,
  isLoggedIn: false,
  phoneNum: "",
  email: "",
  name: "",
  authToken: "",
  otp: "",
  isLoading: false,
  isError: false,
  isSuccess: false
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };
    case UPDATE_USER_NUMBER:
      return {
        ...state,
        phoneNum: action.phoneNum,
        otp: action.otp
      };
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        ...action.userDetails
      };
    case UPDATE_USER_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.authToken
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true
      };
    }
    case UPDATE_PROFILE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFailed: true
      };
    }
    default:
      return state;
  }
}
