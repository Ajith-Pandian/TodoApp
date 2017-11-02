import React, { Component } from "react";
import { FlatList, ToastAndroid, View } from "react-native";
import { NavigationActions } from "react-navigation";
import TodoItem from "./TodoItem";
import LoadingItem from "./LoadingItem";
import {
  onSearchTermChange,
  onSearchStateChange
} from "../../Store/Actions/SearchActions";
import { connect } from "react-redux";
import SwipeList from "../../Components/SwipeActionView";
import { TextComponent } from "../../Components/TextComponents";
import { fetchTodo, fetchLaterTodo } from "../../Store/Actions/TodoActions";
import { TODAY, WEEK, LATER } from "../../Constants";
import { firstToLower } from "../../Utils";
class TodoList extends Component {
  constructor() {
    super();
    this.state = { offset: 0, isCloseToBottom: false };
  }
  onScrollList = event => {
    let { offset, isCloseToBottom } = this.state;
    let { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollOffsetY = contentOffset.y;
    const isScrollingUp = scrollOffsetY < offset;
    const isGonnaReachBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;
    const shouldShowTabBar = isScrollingUp || isGonnaReachBottom;
    this.props.onTabBarVisibilityChange(shouldShowTabBar);
    offset = scrollOffsetY;
    let isLater = this.props.navigation.state.key === LATER;
    if (isLater)
      isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    this.setState({ offset, isCloseToBottom });
  };

  componentDidMount() {
    let { _fetchTodo, navigation } = this.props;
    let type = navigation.state.key;
    if (type === TODAY) {
      //download Week tasks once for Today and Week
      type = firstToLower(WEEK);
      _fetchTodo(type, this.page);
    }
  }
  componentWillReceiveProps(nextProps) {
    let {
      navigation,
      isLoading,
      totalPages,
      page,
      _fetchLaterTodo
    } = nextProps;
    let isLater = navigation.state.key === LATER;
    let { isCloseToBottom } = this.state;
    if (isLater && isCloseToBottom && !isLoading) {
      page++;
      if (page <= totalPages) _fetchLaterTodo(page);
    }
  }
  render() {
    let {
      todos,
      laterTodos,
      page,
      totalPages,
      isLoading,
      searchTerm,
      searchState,
      _fetchLaterTodo,
      screenProps,
      navigation
    } = this.props;
    let { isCloseToBottom } = this.state;

    let isLater = navigation.state.key === LATER;
    todos = isLater ? laterTodos : todos;
    let isLoadingItemAdded = false;
    if (isLater && isLoading) {
      todos = [...todos, "Loading Item"];
      isLoadingItemAdded = true;
    }
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

    return todos && todos.length > 0 ? (
      <SwipeList
        data={todos}
        style={{ margin: 1 }}
        removeClippedSubviews={false}
        onScroll={e => this.onScrollList(e)}
        scrollEventThrottle={16}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(item, index) => {
          let isLast = todos.length - 1 === index;
          return (
            <TodoItem
              key={index}
              index={index}
              isLast={isLast}
              todo={item}
              onClick={() => {
                let { navigate } = screenProps.rootNavigation;
                navigate("TaskDetails");
              }}
            />
          );
        }}
        onSwipeRight={() => console.log("Rejected")}
        onSwipeLeft={() => console.log("Accepted")}
      />
    ) : (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TextComponent>No tasks</TextComponent>
      </View>
    );
  }
}

const mapStateToProps = ({ TodoReducer, SearchReducer }) => {
  let { todos, laterTodos, totalPages, page, isLoading } = TodoReducer;
  let { searchTerm, searchState } = SearchReducer;

  return {
    todos,
    page,
    totalPages,
    laterTodos,
    searchTerm,
    searchState
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _fetchTodo: (type, page) => dispatch(fetchTodo(type, page)),
  _fetchLaterTodo: page => dispatch(fetchLaterTodo(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
