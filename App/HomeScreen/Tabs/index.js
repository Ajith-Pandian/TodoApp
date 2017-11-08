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
import TodoList from "./TodoList";
import { onSearchStateChange } from "../../Store/Actions/SearchActions";
import { fetchLaterTodo } from "../../Store/Actions/TodoActions";
import { fetchActivities } from "../../Store/Actions/ActivityActions";
import { connect } from "react-redux";
import Activity from "./Activity";
import {
  ACCENT_COLOR_1,
  APP_COLOR,
  TODAY,
  WEEK,
  LATER,
  GRAY
} from "../../Constants";
import TabBar from "../../Components/TabBar";
import { TextComponent } from "../../Components/TextComponents";

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
  let tabWidth = Dimensions.get("window").width / numberOfTabs;
  let currentTabIndex = navigationState.index;
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        height: 50
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
              isBold={isCurrentTab}
              textStyle={{
                fontSize: 16,
                color: isCurrentTab ? activeTintColor : inactiveTintColor
              }}
            >
              {route.routeName}
            </TextComponent>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
class Tab extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = props => {
    let { navigation } = props;
    let tabBarVisible =
      navigation.state.params && navigation.state.params.tabBarVisible;
    return {
      tabBarVisible
    };
  };

  render() {
    return (
      <TodoList
        {...this.props}
        onTabBarVisibilityChange={tabBarVisible =>
          this.props.navigation.setParams({ tabBarVisible })}
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
    Activity: { screen: Activity }
  },
  {
    animationEnabled: true,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: {
      style: {
        backgroundColor: isIos ? "black" : "white",
        overflow: "hidden"
      },
      activeTintColor: isIos ? "white" : ACCENT_COLOR_1,
      inactiveTintColor: isIos ? "#9d9d9d" : GRAY,
      showLabel: true,
      showIcon: false,
      labelStyle: {
        fontSize: 16
      }
    }
  }
);

class Tabs extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <TabBar
          navigation={navigation}
          onChangeText={text => console.log(text)}
        />
      )
    };
  };

  render() {
    let {
      navigation,
      _fetchLaterTodo,
      laterTodos,
      _fetchActivities,
      activities
    } = this.props;
    return (
      <MyApp
        onNavigationStateChange={(prevState, newState) => {
          let { routes, index } = newState;
          if (index == 2 && laterTodos.length === 0) _fetchLaterTodo(1);
          if (index == 3 && activities.length === 0) _fetchActivities(1);
        }}
        screenProps={{
          rootNavigation: navigation
        }}
      />
    );
  }
}
const mapStateToProps = ({ TodoReducer, ActivityReducer }) => {
  let { laterTodos } = TodoReducer;
  let { activities } = ActivityReducer;
  return {
    laterTodos,
    activities
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _fetchLaterTodo: page => dispatch(fetchLaterTodo(page)),
  _fetchActivities: page => dispatch(fetchActivities(page))
});
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
