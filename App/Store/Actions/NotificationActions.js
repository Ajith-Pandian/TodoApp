//@flow
import {
  MODIFY_FCM,
  UPDATE_FCM_TOKEN,
  PRESENT_NOTIFICATION,
  CREATE_NOTIFICATION,
  MODIFY_NOTIFICATION,
  DELETE_NOTIFICATION
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import FCM from "react-native-fcm";

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
export function presentNotification(todo) {
  return dispatch => {
    let { id, title, description } = todo;
    FCM.presentLocalNotification({
      id: "UNIQ_ID_STRING",
      title,
      body: description,
      ticker: title,
      show_in_foreground: true
    });
    dispatch(_presentNotification());
  };
}

function _presentNotification() {
  return {
    type: PRESENT_NOTIFICATION
  };
}
