import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text
} from "react-native";
import {
  TabNavigator,
  TabBarBottom,
  NavigationActions
} from "react-navigation";
import { connect } from "react-redux";

import TabBar from "../../Components/TabBar";
import { TextComponent } from "../../Components/TextComponents";
import TodoList from "./TodoList";
import Activity from "./Activity";
import {
  RADICAL_RED,
  APP_COLOR,
  WILD_SAND,
  TODAY,
  WEEK,
  LATER,
  GRAY
} from "../../Constants";
import { onSearchStateChange } from "../../Store/Actions/SearchActions";
import { fetchLaterTodo } from "../../Store/Actions/TodoActions";
import { fetchActivities } from "../../Store/Actions/ActivityActions";

const shadowOpt = {
  height: 50,
  color: "#000",
  border: 2,
  radius: 3,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 },
  side: "top"
};

const TabBarComponent = props => {
  let {
    navigation,
    navigationState,
    jumpToIndex,
    activeTintColor,
    inactiveTintColor
  } = props;
  let routes = navigation.state.routes;
  let numberOfTabs = routes.length;
  const screenWidth = Dimensions.get("window").width;
  let tabWidth = screenWidth / numberOfTabs;
  let currentTabIndex = navigationState.index;
  return (
    <View
      style={{
        height: 52,
        backgroundColor: WILD_SAND,
        alignItems: "center"
      }}
    >
      <View
        style={{
          marginTop: 2,
          flexDirection: "row",
          backgroundColor: "white",
          height: 50,
          elevation: 8
        }}
      >
        {routes.map((route, index) => {
          let isCurrentTab = currentTabIndex === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => jumpToIndex(index)}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: tabWidth
              }}
              activeOpacity={1}
            >
              <TextComponent
                isLight={!isCurrentTab}
                textStyle={{
                  fontSize: 18,
                  color: isCurrentTab ? activeTintColor : inactiveTintColor
                }}
              >
                {route.routeName}
              </TextComponent>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
class Tab extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = props => {
    let { navigation, screenProps } = props;
    let { searchState } = screenProps;
    let tabBarVisible =
      navigation.state.params && navigation.state.params.tabBarVisible;
    tabBarVisible = searchState ? false : tabBarVisible;
    return {
      tabBarVisible
    };
  };
  componentWillMount(nextProps) {
    let { searchState } = this.props;
    this.props.navigation.setParams({ tabBarVisible: !searchState });
  }
  render() {
    let { searchState } = this.props;
    return (
      <TodoList
        {...this.props}
        onTabBarVisibilityChange={tabBarVisible =>
          this.props.navigation.setParams({ tabBarVisible })
        }
      />
    );
  }
}
class AllActivities extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = props => {
    let { navigation, screenProps } = props;
    let { searchState } = screenProps;
    let tabBarVisible =
      navigation.state.params && navigation.state.params.tabBarVisible;
    tabBarVisible = searchState ? false : tabBarVisible;
    return {
      tabBarVisible
    };
  };

  render() {
    let { searchState } = this.props;
    return (
      <Activity
        {...this.props}
        onTabBarVisibilityChange={tabBarVisible =>
          this.props.navigation.setParams({ tabBarVisible })
        }
      />
    );
  }
}
const isIos = Platform.OS === "ios";
const MyApp = TabNavigator(
  {
    [TODAY]: { screen: Tab },
    [WEEK]: { screen: Tab },
    [LATER]: { screen: Tab },
    Activity: { screen: AllActivities }
  },
  {
    animationEnabled: true,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: {
      style: {
        backgroundColor: "white",
        overflow: "hidden"
      },
      activeTintColor: RADICAL_RED,
      inactiveTintColor: GRAY,
      showLabel: true,
      showIcon: false,
      labelStyle: {
        fontSize: 16
      }
    }
  }
);

class Tabs extends Component {
  static navigationOptions = props => {
    let { navigation } = props;

    return {
      header: (
        <TabBar
          navigation={navigation}
          currentIndex={
            navigation.state.params && navigation.state.params.currentIndex
          }
        />
      )
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ currentIndex: 0 });
  }
  render() {
    let {
      navigation,
      _fetchLaterTodo,
      laterTodos,
      _fetchActivities,
      activities,
      searchState
    } = this.props;
    return (
      <MyApp
        onNavigationStateChange={(prevState, newState) => {
          let { routes, index } = newState;
          if (index == 2 && laterTodos.length === 0) _fetchLaterTodo(1);
          if (index == 3) _fetchActivities(1);
          navigation.setParams({ currentIndex: index });
        }}
        screenProps={{
          rootNavigation: navigation,
          searchState
        }}
      />
    );
  }
}
const mapStateToProps = ({ TodoReducer, ActivityReducer, SearchReducer }) => {
  let { laterTodos } = TodoReducer;
  let { activities } = ActivityReducer;
  let { searchState } = SearchReducer;
  return {
    laterTodos,
    activities,
    searchState
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _fetchLaterTodo: page => dispatch(fetchLaterTodo(page)),
  _fetchActivities: page => dispatch(fetchActivities(page))
});
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
