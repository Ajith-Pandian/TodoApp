import {
  MODIFY_FCM,
  UPDATE_FCM_TOKEN,
  CREATE_LOCAL_NOTIFICATION,
  CREATE_FUTURE_NOTIFICATION,
  MODIFY_FUTURE_NOTIFICATION,
  DELETE_FUTURE_NOTIFICATION
} from "../StoreConstants";
import { getSortedList, removeDuplicates } from "../../Utils";

const initialState = {
  hasPermission: false,
  fcmToken: "",
  notifications: []
};

export default function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    case MODIFY_FCM: {
      const { hasPermission } = action;
      return {
        ...state,
        hasPermission
      };
    }
    case UPDATE_FCM_TOKEN: {
      const { fcmToken } = action;
      return {
        ...state,
        fcmToken
      };
    }
    case CREATE_LOCAL_NOTIFICATION: {
      return {
        ...state
      };
    }
    case CREATE_FUTURE_NOTIFICATION: {
      return {
        ...state,
        notifications: [...state.notifications, action.notification]
      };
    }
    case MODIFY_FUTURE_NOTIFICATION: {
      return {
        ...state
      };
    }
    case DELETE_FUTURE_NOTIFICATION: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
}
