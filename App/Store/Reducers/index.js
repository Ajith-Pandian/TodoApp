import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import TodoReducer from "./TodoReducer";
import LoginReducer from "./LoginReducer";
import OtpReducer from "./OtpReducer";
import UserReducer from "./UserReducer";
import RegisterReducer from "./RegisterReducer";
import ActivityReducer from "./ActivityReducer";
import PersistReducer from "./PersistReducer";
import NewTasksReducer from "./NewTasksReducer";
import NotificationReducer from "./NotificationReducer";
import AppStateReducer from "./AppStateReducer";
import TaskCountReducer from "./TaskCountReducer";

const getRootReducer = () =>
  combineReducers({
    UserReducer,
    LoginReducer,
    OtpReducer,
    RegisterReducer,
    SearchReducer,
    TodoReducer,
    ActivityReducer,
    PersistReducer,
    NewTasksReducer,
    NotificationReducer,
    AppStateReducer,
    TaskCountReducer
  });

export default getRootReducer;
