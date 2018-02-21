import {
  FETCH_TASKS_COUNT,
  FETCH_TASKS_COUNT_SUCCESS,
  FETCH_TASKS_COUNT_FAILURE
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";

export function fetchTasksCount() {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_fetchTasksCount());
    ApiHelper.getTasksCount(authToken).then(res => {
      if (res && res.success) {
        let { total, completed, assigned } = res.data;
        let counts = { total, completed, assigned };
        dispatch(_fetchTasksCountSuccess(counts));
      } else dispatch(_fetchTasksCountFailure());
    });
  };
}

function _fetchTasksCount() {
  return {
    type: FETCH_TASKS_COUNT
  };
}

function _fetchTasksCountSuccess(counts) {
  return { type: FETCH_TASKS_COUNT_SUCCESS, counts };
}

function _fetchTasksCountFailure() {
  return {
    type: FETCH_TASKS_COUNT_FAILURE
  };
}
