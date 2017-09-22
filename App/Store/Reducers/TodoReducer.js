import { SEARCH_TERM_CHANGE, SEARCH_STATE_CHANGE } from "../StoreConstants";
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
  todos: createTodos()
};

export default function TodoReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TERM_CHANGE:
      return {
        ...state,
        searchTerm: action.searchTerm
      };
    case SEARCH_STATE_CHANGE:
      return {
        ...state,
        searchState: action.searchState
      };
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
