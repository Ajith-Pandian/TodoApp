//@flow
import {
  MODIFY_FCM,
  UPDATE_FCM_TOKEN,
  CREATE_LOCAL_NOTIFICATION,
  CREATE_FUTURE_NOTIFICATION,
  MODIFY_FUTURE_NOTIFICATION,
  DELETE_FUTURE_NOTIFICATION
} from "../StoreConstants";
import ApiHelper from "../../ApiHelper";
import FCM from "react-native-fcm";
import moment from "moment";

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
export function createLocalNotification(todo) {
  return dispatch => {
    let { id, title, description } = todo;
    FCM.presentLocalNotification({
      id: String(id),
      title,
      body: description,
      ticker: title,
      show_in_foreground: true
    });
    dispatch(_createLocalNotification());
  };
}

function _createLocalNotification() {
  return {
    type: CREATE_LOCAL_NOTIFICATION
  };
}
export function createFutureNotifications(todos) {
  return (dispatch, getState) => {
    let { notifications } = getState().NotificationReducer;
    todos
      .filter(
        todo => notifications.findIndex(item => item.id === todo.id) === -1
      )
      .map(todo => createFutureNotification(dispatch, todo));
  };
}

function createFutureNotification(dispatch, todo) {
  let { id, title, description, dueDate, reminderTime } = todo;
  reminderTime = reminderTime.split(" ")[0];
  var date = moment(dueDate);
  var time = moment.duration(`00:${reminderTime}:00`);
  date.subtract(time);
  let fire_date = date.toDate().getTime();

  FCM.scheduleLocalNotification({
    fire_date,
    id: String(id),
    title,
    body: description,
    show_in_foreground: true
  });

  //  FCM.getScheduledLocalNotifications().then(notif => console.log(notif));

  dispatch(_createFutureNotification(todo));
}

function _createFutureNotification(todo) {
  return {
    type: CREATE_FUTURE_NOTIFICATION,
    notification: todo
  };
}

export function modifyNotification(todo) {
  return dispatch => {
    let { id, title, description } = todo;
    FCM.presentLocalNotification({
      id,
      title,
      body: description,
      ticker: title,
      show_in_foreground: true
    });
    dispatch(_modifyNotification(todo));
  };
}

function _modifyNotification(todo) {
  return {
    type: MODIFY_NOTIFICATION,
    notification: todo
  };
}
