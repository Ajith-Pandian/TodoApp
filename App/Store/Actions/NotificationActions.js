import {
  MODIFY_FCM,
  UPDATE_FCM_TOKEN,
  CREATE_NOTIFICATION,
  MODIFY_NOTIFICATION,
  DELETE_NOTIFICATION
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";

export function modifyFcm(hasPermission) {
  return dispatch => {
    dispatch(_modifyFcm(hasPermission));
  };
}

function _modifyFcm(hasPermission) {
  return {
    type: MODIFY_FCM,
    hasPermission
  };
}

export function updateFcmToken(fcmToken) {
  return (dispatch, getState) => {
    let { authToken } = getState().UserReducer;
    ApiHelper.updateDeviceId(fcmToken, authToken).then(result => {
      if (result && result.success) dispatch(_updateFcmToken(fcmToken));
    });
  };
}

function _updateFcmToken(fcmToken) {
  return {
    type: UPDATE_FCM_TOKEN,
    fcmToken
  };
}
