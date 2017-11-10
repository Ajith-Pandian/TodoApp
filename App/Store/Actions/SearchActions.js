import { SEARCH_TERM_CHANGE, SEARCH_STATE_CHANGE } from "../StoreConstants";
import { searchTodo } from "./TodoActions";
export function onSearchTermChange(currentIndex, text) {
  return dispatch => {
    currentIndex === 2
      ? dispatch(searchTodo(text))
      : dispatch(_searchTermChange(text));
  };
}
export function onSearchStateChange(state) {
  return dispatch => {
    dispatch(_searchStateChange(state));
  };
}

function _searchTermChange(text) {
  return {
    type: SEARCH_TERM_CHANGE,
    searchTerm: text
  };
}
function _searchStateChange(state) {
  return {
    type: SEARCH_STATE_CHANGE,
    searchState: state
  };
}
