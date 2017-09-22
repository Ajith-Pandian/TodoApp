import React, { Component } from "react";
import { FlatList } from "react-native";
import TodoItem from "./TodoItem";
import {
  onSearchTermChange,
  onSearchStateChange
} from "../../Store/Actions/SearchActions";
import { connect } from "react-redux";

class TodoList extends Component {
  render() {
    let { todos, searchTerm, searchState } = this.props;
    if (searchState && searchTerm && searchTerm.length > 0) {
      searchTerm = searchTerm.toLowerCase();
      todos = todos.filter(
        ({ title, description }) =>
          title.toLowerCase().includes(searchTerm) ||
          description.toLowerCase().includes(searchTerm)
      );
    } else {
      searchTerm = "";
    }
    return (
      <FlatList
        data={todos}
        style={{ margin: 1 }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          isLast = todos.length - 1 === index;
          return (
            <TodoItem key={index} index={index} isLast={isLast} todo={item} />
          );
        }}
      />
    );
  }
}

const mapStateToProps = ({ TodoReducer, SearchReducer }) => {
  let { todos } = TodoReducer;
  let { searchTerm, searchState } = SearchReducer;

  return {
    todos,
    searchTerm,
    searchState
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _onSearchStateChange: state => {
    dispatch(onSearchStateChange(state));
  },
  _onSearchTermChange: term => {
    dispatch(onSearchTermChange(term));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
