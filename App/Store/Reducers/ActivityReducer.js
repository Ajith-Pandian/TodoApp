import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE
} from "../StoreConstants";
import { getSortedList, removeDuplicates } from "../../Utils";

const initialState = {
  activities: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export default function ActivityReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    }
    case FETCH_ACTIVITIES_SUCCESS: {
      let { page, totalPages, activities } = action;
      return {
        ...state,
        activities:
          page === 1 ? activities : [...state.activities, ...activities],
        page,
        totalPages,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case FETCH_ACTIVITIES_FAILURE: {
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
