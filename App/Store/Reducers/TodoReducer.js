import {
  FETCH_TODO,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
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
import { getSortedList } from "../../Utils";
var moment = require("moment");
let names = [
  "Waylon Dalton",
  "Justine Henderson",
  "Abdullah Lang",
  "Marcus Cruz",
  "Thalia Cobb",
  "Mathias Little",
  "Eddie Randolph",
  "Angela Walker",
  "Lia Shelton",
  "Hadassah Hartman",
  "Joanna Shaffer",
  "Jonathon Sheppard"
];
let title = [
  "Book Flight",
  "Complete Assignment",
  "Buy Veggies",
  "Buy Coffee",
  "Meeting",
  "Call Friend",
  "Attend Marriage",
  "Goto Bar",
  "Drink Whisky",
  "Cook food",
  "Sleep"
];
const initialState = {
  todos: createTodos(),
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

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function createTodos() {
  let data = [];

  for (var i = 0; i < 20; i++) {
    let randomName = getRandom(names);
    let randomTitle = getRandom(title);
    let randomDescription = getRandom(title);
    let date = moment().add(i, "h");
    //date.setHours(date.getHours() + i);
    //if (i >= 10) date.setDate(date.getDate() + i - 10);
    data.push(new Todo(i, randomTitle, randomDescription, randomName, date));
  }
  getSortedList(data);
  return data;
}
