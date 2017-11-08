import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";

export function fetchActivities() {
  return dispatch => {
    dispatch(_fetchActivities());
    ApiHelper.getActivities().then(res => {
      if (res && res.success) {
        dispatch(_fetchActivitiesSuccess(res.data));
      } else dispatch(_fetchActivitiesFailure());
    });
  };
}

function _fetchActivities() {
  return {
    type: FETCH_ACTIVITIES
  };
}

function _fetchActivitiesSuccess(activities) {
  return {
    type: FETCH_ACTIVITIES_SUCCESS,
    activities
  };
}
function _fetchActivitiesFailure() {
  return {
    type: FETCH_ACTIVITIES_FAILURE
  };
}
