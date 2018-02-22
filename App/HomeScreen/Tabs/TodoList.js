import React, { Component } from "react";
import {
  FlatList,
  ToastAndroid,
  View,
  ScrollView,
  RefreshControl
} from "react-native";
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
    this.state = { offset: 0, isRefreshed: false };
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
    this.fetchData(false);
  }

  refreshData = () => {
    this.setState({ isRefreshed: true }, () => this.fetchData(true));
  };

  fetchData = isRefreshed => {
    let { navigation, _fetchTodo, _fetchLaterTodo } = this.props;
    let isLater = navigation.state.key === LATER;
    isLater ? _fetchLaterTodo(1, isRefreshed) : _fetchTodo(isRefreshed);
  };

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
      isRefreshed,
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
                navigate("TaskDetails", { id: item.id, type });
              }}
            />
          );
        }}
        ListFooterComponent={() =>
          isLoading && !isRefreshed ? <LoadingItem /> : null
        }
        onSwipeRight={() => console.log("Rejected")}
        onSwipeLeft={() => console.log("Accepted")}
        onRefresh={() => this.refreshData()}
        refreshing={isRefreshed && isLoading}
      />
    ) : (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshed && isLoading}
            onRefresh={() => this.refreshData()}
          />
        }
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {isLoading && !isRefreshed ? (
          <Spinner
            style={{ margin: 5 }}
            isVisible={true}
            size={50}
            type={"Bounce"}
            color={RADICAL_RED}
          />
        ) : (
          <EmptyTask onCreateTaskClick={() => navigate("CreateTask")} />
        )}
      </ScrollView>
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
    isLoading,
    isRefreshed
  } = TodoReducer;
  let { searchTerm, searchState } = SearchReducer;

  return {
    todos,
    page,
    isLoading,
    isRefreshed,
    totalPages,
    laterTodos,
    searchTerm,
    searchState,
    searchedTodos
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _fetchTodo: isRefreshed => dispatch(fetchTodo(isRefreshed)),
  _fetchLaterTodo: (page, isRefreshed) =>
    dispatch(fetchLaterTodo(page, isRefreshed))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
