import { UPDATE_USER, UPDATE_USER_NUMBER } from "../StoreConstants";

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

    default:
      return state;
  }
}
