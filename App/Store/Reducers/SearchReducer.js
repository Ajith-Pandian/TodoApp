import { SEARCH_TERM_CHANGE, SEARCH_STATE_CHANGE } from "../StoreConstants";

const initialState = {
  searchTerm: "",
  searchState: false
};

export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TERM_CHANGE:
      return {
        ...state,
        searchTerm: action.searchTerm
      };
    case SEARCH_STATE_CHANGE: {
      let { searchState, searchTerm } = action;
      searchTerm = searchState ? searchTerm : "";
      return {
        ...state,
        searchState,
        searchTerm
      };
    }
    default:
      return state;
  }
}
