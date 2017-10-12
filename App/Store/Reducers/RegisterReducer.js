import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILURE
} from "../StoreConstants";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false
};

export default function RegisterReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    case REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case REGISTER_REQUEST_FAILURE: {
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
