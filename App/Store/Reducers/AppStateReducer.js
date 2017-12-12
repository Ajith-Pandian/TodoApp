import { OPENED_BY_NOTIFICATION } from "../StoreConstants";
import { getSortedList, removeDuplicates } from "../../Utils";

const initialState = {
  isOpenedByNotification: false
};

export default function AppStateReducer(state = initialState, action) {
  switch (action.type) {
    case OPENED_BY_NOTIFICATION: {
      const { isOpenedByNotification } = action;
      return {
        ...state,
        isOpenedByNotification
      };
    }
    default:
      return state;
  }
}
