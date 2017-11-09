import {
  FETCH_NEW_TASKS,
  FETCH_NEW_TASKS_SUCCESS,
  FETCH_NEW_TASKS_FAILURE,
  CLEAR_NEW_TASKS
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import Todo from "../../Model/Todo";

export function fetchNewTaks(page) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_fetchNewTaks());
    ApiHelper.getNewTaks(page, authToken).then(res => {
      if (res && res.success) {
        dispatch(
          _fetchNewTaksSuccess(page, res.total_pages, getTodos(res.data))
        );
      } else dispatch(_fetchNewTaksFailure());
    });
  };
}

export function clearTasks() {
  return dispatch => dispatch(_clearTasks());
}

function _fetchNewTaks() {
  return {
    type: FETCH_NEW_TASKS
  };
}

function _clearTasks() {
  return {
    type: CLEAR_NEW_TASKS
  };
}

function _fetchNewTaksSuccess(page, totalPages, newTasks) {
  return {
    type: FETCH_NEW_TASKS_SUCCESS,
    page,
    totalPages,
    newTasks
  };
}
function _fetchNewTaksFailure() {
  return {
    type: FETCH_NEW_TASKS_FAILURE
  };
}

function getTodos(todos) {
  return todos.map(todo => {
    let {
      id,
      title,
      description,
      created_by,
      assigned_to,
      isaccepted,
      iscompleted,
      isdeleted,
      due_date,
      created_date,
      assigned_date,
      completed_date,
      attachment
    } = todo;
    return new Todo(
      id,
      title,
      description,
      created_by,
      assigned_to,
      isaccepted,
      iscompleted,
      isdeleted,
      due_date,
      created_date,
      assigned_date,
      completed_date,
      attachment
    );
  });
}
