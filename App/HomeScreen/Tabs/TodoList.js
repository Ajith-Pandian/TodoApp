import React, { Component } from "react";
import { FlatList } from "react-native";
import TodoItem from "./TodoItem";
import {
  onSearchTermChange,
  onSearchStateChange
} from "../../Store/Actions/SearchActions";
import { connect } from "react-redux";

class TodoList extends Component {
  state = { offset: 0 };
  onScrollList = event => {
    let { offset } = this.state;
    let { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollOffsetY = contentOffset.y;
    const isScrollingUp = scrollOffsetY < offset;
    const isReachedBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 200 ;
    const shouldShowTabBar = isScrollingUp || isReachedBottom;
    this.props.navigation.setParams({ tabBarVisible: shouldShowTabBar });
    offset = scrollOffsetY;
    this.setState({ offset });
  };
  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.offset != this.state.offset) return false;
    else return true;
  }
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
        onScroll={e => this.onScrollList(e)}
        scrollEventThrottle={16}
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

const mapDispatchToProps = (dispatch, props) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
