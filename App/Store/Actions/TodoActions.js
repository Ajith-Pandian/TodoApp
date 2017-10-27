import {
  FETCH_TODO,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
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
  INCOMPLETE_TODO_FAILURE
} from "../StoreConstants";

import ApiHelper from "../../ApiHelper";

export function fetchTodo(type, page) {
  return dispatch => {
    dispatch(_fetchTodo());
    ApiHelper.getDashboard(type, page).then(res => {
      if (res && res.success) dispatch(_fetchTodoSuccess());
      else dispatch(_fetchTodoFailure());
    });
  };
}

function _fetchTodo() {
  return {
    type: FETCH_TODO
  };
}
function _fetchTodoSuccess() {
  return {
    type: FETCH_TODO_SUCCESS
  };
}
function _fetchTodoFailure() {
  return {
    type: FETCH_TODO_FAILURE
  };
}

export function createTodo(todo) {
  return dispatch => {
    dispatch(_createTodo());
    ApiHelper.createTask(todo).then(res => {
      if (res && res.success) dispatch(_createTodoSuccess());
      else dispatch(_createTodoFailure());
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

export function acceptTodo(taskId) {
  return dispatch => {
    dispatch(_acceptTodo());
    ApiHelper.acceptTask({
      todo_id: taskId,
      is_accepted: true
    }).then(res => {
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
  return dispatch => {
    dispatch(_rejectTodo());
    ApiHelper.acceptTask({
      todo_id: taskId,
      is_accepted: false
    }).then(res => {
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
