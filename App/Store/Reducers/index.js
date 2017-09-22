import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import TodoReducer from "./TodoReducer";

const getRootReducer = () =>
  combineReducers({
    SearchReducer,
    TodoReducer
  });

export default getRootReducer;
