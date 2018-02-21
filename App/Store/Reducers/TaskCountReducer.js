import {
  FETCH_TASKS_COUNT,
  FETCH_TASKS_COUNT_SUCCESS,
  FETCH_TASKS_COUNT_FAILURE
} from "../StoreConstants";
import { getSortedList, removeDuplicates } from "../../Utils";

const initialState = {
  total: 0,
  completed: 0,
  assigned: 0
};

export default function TaskCounterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS_COUNT: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    }
    case FETCH_TASKS_COUNT_SUCCESS: {
      let { total, completed, assigned } = action.counts;
      return {
        ...state,
        total,
        completed,
        assigned,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case FETCH_TASKS_COUNT_FAILURE: {
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
