import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_USER_NUMBER,
  UPDATE_USER_DETAILS,
  UPDATE_USER_AUTH_TOKEN
} from "../StoreConstants";

const initialState = {
  id: -1,
  isLoggedIn: false,
  phoneNum: "",
  otp: "",
  authToken: ""
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
        phoneNum: action.phoneNum,
        id: action.id
      };
    case UPDATE_USER_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.authToken
      };

    default:
      return state;
  }
}
