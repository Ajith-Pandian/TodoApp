import {
  MODIFY_FCM,
  UPDATE_FCM_TOKEN,
  CREATE_NOTIFICATION,
  MODIFY_NOTIFICATION,
  DELETE_NOTIFICATION
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
    case CREATE_NOTIFICATION: {
      return {
        ...state
      };
    }
    case MODIFY_NOTIFICATION: {
      return {
        ...state
      };
    }
    case DELETE_NOTIFICATION: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
}
