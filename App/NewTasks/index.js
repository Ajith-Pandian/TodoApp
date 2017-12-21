import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchNewTaks, clearTasks } from "../Store/Actions/NewTasksActions";
import { acceptTodo, rejectTodo } from "../Store/Actions/TodoActions";
import { resetNavigationToFirst } from "../Utils";
import TinderSwiper from "./TinderSwiper";

class NewTasks extends Component {
  componentDidMount() {
    this.props._fetchNewTaks();
  }
  render() {
    let {
      newTasks,
      isLoggedIn,
      _acceptTodo,
      _rejectTodo,
      isOpenedByNotification,
      navigation
    } = this.props;
    return (
      <TinderSwiper
        {...this.props}
        onSwipeRight={position => _acceptTodo(newTasks[position].id)}
        onSwipeLeft={position => _rejectTodo(newTasks[position].id)}
        onClose={() =>
          isOpenedByNotification
            ? resetNavigationToFirst(isLoggedIn ? "Home" : "Login", navigation)
            : navigation.goBack(null)
        }
      />
    );
  }
}

const mapStateToProps = ({ NewTasksReducer, AppStateReducer, UserReducer }) => {
  let { isLoading, isError, isSuccess, newTasks } = NewTasksReducer;
  let { isOpenedByNotification } = AppStateReducer;
  let { isLoggedIn } = UserReducer;

  return {
    isLoggedIn,
    isLoading,
    isError,
    isSuccess,
    isOpenedByNotification,
    newTasks
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _fetchNewTaks: page => dispatch(fetchNewTaks(page)),
  _clearTasks: () => dispatch(clearTasks()),
  _acceptTodo: id => dispatch(acceptTodo(id)),
  _rejectTodo: id => dispatch(rejectTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTasks);
