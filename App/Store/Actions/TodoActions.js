import {
  FETCH_TODO,
  FETCH_TODO_SUCCESS,
  FETCH_LATER_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
  SEARCH_TODO,
  SEARCH_TODO_SUCCESS,
  SEARCH_TODO_FAILURE,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  ACCEPT_TODO,
  ACCEPT_TODO_SUCCESS,
  ACCEPT_TODO_FAILURE,
  REJECT_TODO,
  REJECT_TODO_SUCCESS,
  REJECT_TODO_FAILURE,
  COMPLETE_TODO,
  COMPLETE_TODO_SUCCESS,
  COMPLETE_TODO_FAILURE,
  INCOMPLETE_TODO,
  INCOMPLETE_TODO_SUCCESS,
  INCOMPLETE_TODO_FAILURE,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_REMINDER_TIME
} from "../StoreConstants";

import ApiHelper from "../../ApiHelper";
import Todo from "../../Model/Todo";
import { LATER } from "../../Constants";
import { todayFilter } from "../../Utils";
import { createFutureNotifications } from "./NotificationActions";

export function fetchTodo(isRefreshed) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_fetchTodo(isRefreshed));
    ApiHelper.getWeeklyTasks(authToken).then(res => {
      if (res && res.success) {
        let todos = getTodos(res.data);
        dispatch(_fetchTodoSuccess(todos));
        dispatch(
          createFutureNotifications(
            todos.filter(({ dueDate }) => todayFilter(dueDate))
          )
        );
      } else dispatch(_fetchTodoFailure());
    });
  };
}

export function fetchLaterTodo(page, isRefreshed) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_fetchTodo(isRefreshed));
    ApiHelper.getLaterTasks(page, authToken).then(res => {
      if (res && res.success)
        dispatch(
          _fetchLaterTodoSuccess(page, res.total_pages, getTodos(res.data))
        );
      else dispatch(_fetchTodoFailure());
    });
  };
}

function _fetchTodo(isRefreshed) {
  return { type: FETCH_TODO, isRefreshed };
}
function _fetchTodoSuccess(todos) {
  return {
    type: FETCH_TODO_SUCCESS,
    todos
  };
}
function _fetchLaterTodoSuccess(page, totalPages, laterTodos) {
  return {
    type: FETCH_LATER_TODO_SUCCESS,
    page,
    totalPages,
    laterTodos
  };
}
function _fetchTodoFailure() {
  return {
    type: FETCH_TODO_FAILURE
  };
}

export function createTodo(todo) {
  return (dispatch, getState) => {
    let { authToken, phoneNum } = getState().UserReducer;
    dispatch(_createTodo());
    let isSelf = phoneNum === todo.receiver;
    ApiHelper.createTask(todo, authToken).then(res => {
      if (res && res.success) {
        dispatch(_createTodoSuccess());
        isSelf ? dispatch(fetchTodo()) : null;
      } else dispatch(_createTodoFailure());
    });
  };
}
function _createTodo() {
  return {
    type: CREATE_TODO
  };
}
function _createTodoSuccess() {
  return {
    type: CREATE_TODO_SUCCESS
  };
}
function _createTodoFailure() {
  return {
    type: CREATE_TODO_FAILURE
  };
}
export function searchTodo(term) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_searchTodo());
    ApiHelper.searchTask(term, authToken).then(res => {
      if (res && res.success) dispatch(_searchTodoSuccess(getTodos(res.data)));
      else dispatch(_searchTodoFailure());
    });
  };
}
function _searchTodo() {
  return {
    type: SEARCH_TODO
  };
}
function _searchTodoSuccess(searchedTodos) {
  return {
    type: SEARCH_TODO_SUCCESS,
    searchedTodos
  };
}
function _searchTodoFailure() {
  return {
    type: SEARCH_TODO_FAILURE
  };
}

export function acceptTodo(taskId) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_acceptTodo());
    ApiHelper.acceptTask(
      {
        todo_id: taskId,
        is_accepted: true
      },
      authToken
    ).then(res => {
      if (res && res.success) dispatch(_acceptTodoSuccess());
      else dispatch(_acceptTodoFailure());
    });
  };
}

function _acceptTodo() {
  return {
    type: ACCEPT_TODO
  };
}
function _acceptTodoSuccess() {
  return {
    type: ACCEPT_TODO_SUCCESS
  };
}
function _acceptTodoFailure() {
  return {
    type: ACCEPT_TODO_FAILURE
  };
}

export function rejectTodo(taskId) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_rejectTodo());
    ApiHelper.acceptTask(
      {
        todo_id: taskId,
        is_accepted: false
      },
      authToken
    ).then(res => {
      if (res && res.success) dispatch(_rejectTodoSuccess());
      else dispatch(_rejectTodoFailure());
    });
  };
}

function _rejectTodo() {
  return {
    type: REJECT_TODO
  };
}
function _rejectTodoSuccess() {
  return {
    type: REJECT_TODO_SUCCESS
  };
}
function _rejectTodoFailure() {
  return {
    type: REJECT_TODO_FAILURE
  };
}

export function completeTodo(taskId) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_completeTodo());
    ApiHelper.completeTask(
      {
        todo_id: taskId,
        is_completed: true
      },
      authToken
    ).then(res => {
      if (res && res.success) {
        dispatch(_completeTodoSuccess());
        dispatch(removeTodo(taskId));
      } else dispatch(_completeTodoFailure());
    });
  };
}
function _completeTodo() {
  return {
    type: COMPLETE_TODO
  };
}
function _completeTodoSuccess() {
  return {
    type: COMPLETE_TODO_SUCCESS
  };
}
function _completeTodoFailure() {
  return {
    type: COMPLETE_TODO_FAILURE
  };
}

export function incompleteTodo(taskId) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_incompleteTodo());
    ApiHelper.completeTask(
      {
        todo_id: taskId,
        is_completed: false
      },
      authToken
    ).then(res => {
      if (res && res.success) {
        dispatch(_incompleteTodoSuccess());
        dispatch(removeTodo(taskId));
      } else dispatch(_incompleteTodoFailure());
    });
  };
}

function _incompleteTodo() {
  return {
    type: INCOMPLETE_TODO
  };
}
function _incompleteTodoSuccess() {
  return {
    type: INCOMPLETE_TODO_SUCCESS
  };
}
function _incompleteTodoFailure() {
  return {
    type: INCOMPLETE_TODO_FAILURE
  };
}

export function addTodo(todo) {
  return dispatch => {
    dispatch(_addTodo(parseTodo(todo)));
  };
}

function _addTodo(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

export function removeTodo(todoId) {
  return dispatch => {
    dispatch(_removeTodo(todoId));
  };
}

function _removeTodo(todoId) {
  return {
    type: REMOVE_TODO,
    todoId
  };
}
export function updateReminderTime(todoId, reminderTime) {
  return dispatch => {
    dispatch(_updateReminderTime(todoId, reminderTime));
  };
}

function _updateReminderTime(todoId, reminderTime) {
  return {
    type: UPDATE_REMINDER_TIME,
    todoId,
    reminderTime
  };
}

function getTodos(todos) {
  return todos.map(todo => parseTodo(todo));
}
function parseTodo(todo) {
  let {
    id,
    title,
    description,
    attachment,
    sender,
    receiver,
    is_accepted,
    is_completed,
    due_date,
    created_date,
    assigned_date,
    completed_date
  } = todo;
  return new Todo(
    id,
    title,
    description,
    attachment,
    sender,
    created_date,
    receiver,
    assigned_date,
    due_date,
    is_accepted,
    is_completed,
    completed_date
  );
}
