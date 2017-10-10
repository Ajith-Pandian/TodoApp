import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from "../StoreConstants";

const initialState = {
  isLoading: false,
  isError: false
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    case LOGIN_REQUEST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    }
    default:
      return state;
  }
}
