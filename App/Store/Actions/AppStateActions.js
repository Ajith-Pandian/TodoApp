import { OPENED_BY_NOTIFICATION } from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import FCM from "react-native-fcm";

export function setOpenedByNotification(isOpenedByNotification) {
  return dispatch => {
    dispatch(_setOpenedByNotification(isOpenedByNotification));
  };
}

function _setOpenedByNotification(isOpenedByNotification) {
  return {
    type: OPENED_BY_NOTIFICATION,
    isOpenedByNotification
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
