import React, { Component } from "react";
import { View, Image, Button, StyleSheet, Platform } from "react-native";
import { TabNavigator, TabBarBottom } from "react-navigation";
import TodoList from "./TodoList";
import { onSearchStateChange } from "../../Store/Actions/SearchActions";
import { connect } from "react-redux";
import { ACCENT_COLOR_1 } from "../../Constants";
let IC_TODAY = require("../../Resources/today.png");
let IC_WEEK = require("../../Resources/week.png");
let IC_ALL = require("../../Resources/all.png");
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

getIcon = name => {
  switch (name) {
    case "Today":
      return IC_TODAY;
    case "Week":
      return IC_WEEK;
    case "All":
      return IC_ALL;
    default:
      return IC_TODAY;
  }
};
class Tab extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => {
        return (
          <Image
            source={getIcon(navigation.state.key)}
            style={{
              width: 26,
              height: 26,
              tintColor
            }}
          />
        );
      }
    };
  };
  render() {
    return <TodoList {...this.props} />;
  }
}
const isIos = Platform.OS === "ios";
const MyApp = TabNavigator(
  {
    Today: { screen: Tab },
    Week: { screen: Tab },
    All: { screen: Tab }
  },
  {
    animationEnabled: true,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
      style: {
        backgroundColor: isIos ? "rgba(28, 28, 28, 0.75)" : "white"
      },
      activeTintColor: isIos ? "white" : ACCENT_COLOR_1,
      inactiveTintColor: isIos ? "#9d9d9d" : "black"
    }
  }
);
class Tabs extends Component {
  render() {
    let { dispatch } = this.props;
    return (
      <MyApp
        onNavigationStateChange={(prev, current) => {
          let { routes, index } = current;
          console.log(routes[index].key);
          dispatch(onSearchStateChange(false));
        }}
      />
    );
  }
}
Tabs.navigationOptions = {
  drawerLabel: "Home",
  drawerIcon: ({ tintColor }) => (
    <Image
      source={require("../../Resources/home.png")}
      style={[styles.icon, { tintColor: tintColor }]}
    />
  )
};

export default connect()(Tabs);
