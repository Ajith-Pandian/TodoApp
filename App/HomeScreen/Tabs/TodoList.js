import React, { Component } from "react";
import { FlatList, ToastAndroid, View } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";

import SwipeList from "../../Components/SwipeActionView";
import { TextComponent } from "../../Components/TextComponents";
import EmptyTask from "../../Components/EmptyTask";
import LoadingItem from "../../Components/LoadingItem";
import TodoItem from "./TodoItem";
import {
  onSearchTermChange,
  onSearchStateChange
} from "../../Store/Actions/SearchActions";
import { fetchTodo, fetchLaterTodo } from "../../Store/Actions/TodoActions";
import { firstToLower, todayFilter } from "../../Utils";
import { TODAY, WEEK, LATER, WILD_SAND, RADICAL_RED } from "../../Constants";

class TodoList extends Component {
  constructor() {
    super();
    this.state = { offset: 0 };
    this.isCloseToBottom = false;
  }
  onScrollList = event => {
    let { offset } = this.state;
    let { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollOffsetY = contentOffset.y;
    const isScrollingUp = scrollOffsetY < offset;
    const isGonnaReachBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;
    const shouldShowTabBar = isScrollingUp || isGonnaReachBottom;
    this.props.onTabBarVisibilityChange(shouldShowTabBar);
    offset = scrollOffsetY;
    let isCloseToBottom = this.isCloseToBottom;
    let isLater = this.props.navigation.state.key === LATER;
    if (isLater) {
      isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
      this.isCloseToBottom = isCloseToBottom;
    }
    this.setState({ offset });
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
    let isCloseToBottom = this.isCloseToBottom;
    if (isLater && isCloseToBottom && !isLoading) {
      page++;
      if (page <= totalPages) _fetchLaterTodo(page);
    }
  }
  render() {
    let {
      todos,
      laterTodos,
      searchedTodos,
      page,
      totalPages,
      isLoading,
      searchTerm,
      searchState,
      _fetchLaterTodo,
      screenProps,
      navigation
    } = this.props;
    let { navigate } = screenProps.rootNavigation;
    //Choosing search or later by state
    const type = navigation.state.key;
    let isLater = type === LATER;
    todos =
      isLater && searchState ? searchedTodos : isLater ? laterTodos : todos;

    //Filtering todos by search term - searching in TODAY & WEEK
    if (searchState && searchTerm && searchTerm.length > 0) {
      searchTerm = searchTerm.toLowerCase();
      todos = todos.filter(
        ({ title, description }) =>
          title.toLowerCase().includes(searchTerm) ||
          description.toLowerCase().includes(searchTerm) ||
          sender.toLowerCase().includes(searchTerm)
      );
    } else {
      searchTerm = "";
    }
    //Filtering todos for today
    let isToday = type === TODAY;
    todos = todos.filter(
      ({ dueDate }) => (isToday ? todayFilter(dueDate) : !todayFilter(dueDate))
    );

    todos = todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    return todos && todos.length > 0 ? (
      <FlatList
        ref={ref => (this.flatRef = ref)}
        data={todos}
        style={{ backgroundColor: WILD_SAND }}
        removeClippedSubviews={false}
        onScroll={e => this.onScrollList(e)}
        scrollEventThrottle={16}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          let isLast = todos.length - 1 === index;
          return (
            <TodoItem
              key={index}
              index={index}
              isLast={isLast}
              todo={item}
              onClick={() => {
                navigate("TaskDetails", {
                  id: item.id,
                  type
                });
              }}
            />
          );
        }}
        ListFooterComponent={() => (isLoading ? <LoadingItem /> : null)}
        onSwipeRight={() => console.log("Rejected")}
        onSwipeLeft={() => console.log("Accepted")}
      />
    ) : isLoading ? (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Spinner
          style={{ margin: 5 }}
          isVisible={true}
          size={50}
          type={"Bounce"}
          color={RADICAL_RED}
        />
      </View>
    ) : (
      <EmptyTask onCreateTaskClick={() => navigate("CreateTask")} />
    );
  }
}

const mapStateToProps = ({ TodoReducer, SearchReducer }) => {
  let {
    todos,
    laterTodos,
    searchedTodos,
    totalPages,
    page,
    isLoading
  } = TodoReducer;
  let { searchTerm, searchState } = SearchReducer;

  return {
    todos,
    page,
    isLoading,
    totalPages,
    laterTodos,
    searchTerm,
    searchState,
    searchedTodos
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _fetchTodo: (type, page) => dispatch(fetchTodo(type, page)),
  _fetchLaterTodo: page => dispatch(fetchLaterTodo(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
