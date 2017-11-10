import {
  FETCH_TODO,
  FETCH_TODO_SUCCESS,
  FETCH_LATER_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  SEARCH_TODO,
  SEARCH_TODO_SUCCESS,
  SEARCH_TODO_FAILURE,
  REJECT_TODO,
  REJECT_TODO_SUCCESS,
  REJECT_TODO_FAILURE,
  COMPLETE_TODO,
  COMPLETE_TODO_SUCCESS,
  COMPLETE_TODO_FAILURE,
  INCOMPLETE_TODO,
  INCOMPLETE_TODO_SUCCESS,
  INCOMPLETE_TODO_FAILURE
} from "../StoreConstants";
import Todo from "../../Model/Todo";
import { getSortedList, removeDuplicates } from "../../Utils";

const initialState = {
  todos: [],
  laterTodos: [],
  searchedTodos: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export default function TodoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODO: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    }
    case FETCH_TODO_SUCCESS: {
      return {
        ...state,
        todos: removeDuplicates([...state.todos, ...action.todos]),
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case FETCH_LATER_TODO_SUCCESS: {
      return {
        ...state,
        laterTodos: removeDuplicates([
          ...state.laterTodos,
          ...action.laterTodos
        ]),
        page: action.page,
        totalPages: action.totalPages,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case FETCH_TODO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true
      };
    }
    case SEARCH_TODO: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    }
    case SEARCH_TODO_SUCCESS: {
      return {
        ...state,
        searchedTodos: action.searchedTodos,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case SEARCH_TODO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true
      };
    }
    case CREATE_TODO: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    }
    case CREATE_TODO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case CREATE_TODO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true
      };
    }
    case REJECT_TODO: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    }
    case REJECT_TODO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case REJECT_TODO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true
      };
    }
    case COMPLETE_TODO: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    }
    case COMPLETE_TODO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case COMPLETE_TODO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true
      };
    }
    case INCOMPLETE_TODO: {
      return {
        isLoading: true,
        isSuccess: false,
        isError: false
      };
    }
    case INCOMPLETE_TODO_SUCCESS: {
      return {
        isLoading: false,
        isSuccess: true,
        isError: false
      };
    }
    case INCOMPLETE_TODO_FAILURE: {
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
