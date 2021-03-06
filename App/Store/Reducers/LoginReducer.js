import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from "../StoreConstants";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case LOGIN_REQUEST_FAILURE: {
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
