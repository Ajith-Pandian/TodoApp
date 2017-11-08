import { REHYDRATE } from "redux-persist/constants";

const initialState = { rehydrated: false };
export default function PersistReducer(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        rehydrated: true
      };
    default:
      return state;
  }
}
