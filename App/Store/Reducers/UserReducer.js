import {
  UPDATE_USER,
  UPDATE_USER_NUMBER,
  UPDATE_USER_AUTH_TOKEN
} from "../StoreConstants";

const initialState = {
  user: {}
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: true
      };
    case UPDATE_USER_NUMBER:
      return {
        ...state,
        user: { phoneNum: action.phoneNum, otp: action.otp }
      };
    case UPDATE_USER_AUTH_TOKEN:
      return {
        ...state,
        user: { authToken: action.authToken }
      };

    default:
      return state;
  }
}
