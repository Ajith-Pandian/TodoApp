import {
  FETCH_NEW_TASKS,
  FETCH_NEW_TASKS_SUCCESS,
  FETCH_NEW_TASKS_FAILURE,
  CLEAR_NEW_TASKS
} from "../StoreConstants";
import { getSortedList, removeDuplicates } from "../../Utils";

const initialState = {
  newTasks: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export default function ActivityReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEW_TASKS: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    }
    case FETCH_NEW_TASKS_SUCCESS: {
      const { newTasks, page, totalPages } = action;
      return {
        ...state,
        newTasks,
        page,
        totalPages,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case FETCH_NEW_TASKS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true
      };
    }
    case CLEAR_NEW_TASKS:
      return initialState;
    default:
      return state;
  }
}
