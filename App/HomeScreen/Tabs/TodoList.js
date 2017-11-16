import React, { Component } from "react";
import { FlatList, ToastAndroid, View } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import moment from "moment";
import SwipeList from "../../Components/SwipeActionView";
import { TextComponent } from "../../Components/TextComponents";
import TodoItem from "./TodoItem";
import LoadingItem from "./LoadingItem";
import {
  onSearchTermChange,
  onSearchStateChange
} from "../../Store/Actions/SearchActions";
import { fetchTodo, fetchLaterTodo } from "../../Store/Actions/TodoActions";
import { firstToLower } from "../../Utils";
import { TODAY, WEEK, LATER, WILD_SAND } from "../../Constants";

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

    //Choosing search or later by state
    let isLater = navigation.state.key === LATER;
    todos =
      isLater && searchState ? searchedTodos : isLater ? laterTodos : todos;

    //Filtering todos by search term-searching in TODAY & WEEK
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
    //Filtering todos for today
    let isToday = navigation.state.key === TODAY;
    todos = isToday
      ? todos.filter(({ dueDate }) => moment().isSame(dueDate, "d"))
      : todos;

    return todos && todos.length > 0 ? (
      <FlatList
        ref={ref => (this.flatRef = ref)}
        data={todos}
        style={{ margin: 1, backgroundColor: WILD_SAND }}
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
                let { navigate } = screenProps.rootNavigation;
                navigate("TaskDetails", { id: item.id });
              }}
            />
          );
        }}
        ListFooterComponent={() => {
          //if (this.flatRef && isLoading) this.flatRef.scrolltoEnd();
          return isLoading ? <LoadingItem /> : null;
        }}
        onSwipeRight={() => console.log("Rejected")}
        onSwipeLeft={() => console.log("Accepted")}
      />
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: WILD_SAND
        }}
      >
        <TextComponent>No tasks</TextComponent>
      </View>
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
