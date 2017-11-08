import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import Activity from "../../Model/Activity";

export function fetchActivities(page) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    dispatch(_fetchActivities());
    ApiHelper.getActivities(page, authToken).then(res => {
      if (res && res.success) {
        dispatch(
          _fetchActivitiesSuccess(
            page,
            res.total_pages,
            getActivities(res.data)
          )
        );
      } else dispatch(_fetchActivitiesFailure());
    });
  };
}

function _fetchActivities() {
  return {
    type: FETCH_ACTIVITIES
  };
}

function _fetchActivitiesSuccess(page, totalPages, activities) {
  return {
    type: FETCH_ACTIVITIES_SUCCESS,
    page,
    totalPages,
    activities
  };
}
function _fetchActivitiesFailure() {
  return {
    type: FETCH_ACTIVITIES_FAILURE
  };
}

function getActivities(activities) {
  return activities.map(activity => {
    let {
      id,
      sender_id,
      sender_name,
      receiver_id,
      receiver_name,
      choice,
      task_id,
      task_title,
      message
    } = activity;
    return new Activity(
      id,
      sender_id,
      sender_name,
      receiver_id,
      receiver_name,
      choice,
      task_id,
      task_title,
      message
    );
  });
}
