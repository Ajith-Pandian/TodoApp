import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import TodoReducer from "./TodoReducer";
import LoginReducer from "./LoginReducer";

const getRootReducer = () =>
  combineReducers({
    LoginReducer,
    SearchReducer,
    TodoReducer
  });

export default getRootReducer;
