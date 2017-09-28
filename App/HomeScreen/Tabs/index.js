import React, { Component } from "react";
import { View, Image, Button, StyleSheet, Platform } from "react-native";
import { TabNavigator, TabBarBottom } from "react-navigation";
import TodoList from "./TodoList";
import { onSearchStateChange } from "../../Store/Actions/SearchActions";
import { connect } from "react-redux";
import Profile from "./Profile";
import { ACCENT_COLOR_1, APP_COLOR } from "../../Constants";
import TabBar from "../../Components/TabBar";
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
  }
  static navigationOptions = props => {
    let { navigation, screenProps } = props;
    let { tabBarVisible } = screenProps;
    return {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={getIcon(navigation.state.key)}
          style={{
            width: 26,
            height: 26,
            tintColor
          }}
        />
      ),
      tabBarVisible
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
    All: { screen: Tab },
    Profile: { screen: Profile }
  },
  {
    animationEnabled: true,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
      style: {
        backgroundColor: isIos ? "black" : "white",
        overflow: "hidden"
      },
      activeTintColor: isIos ? "white" : ACCENT_COLOR_1,
      inactiveTintColor: isIos ? "#9d9d9d" : "black",
      showLabel: !isIos
    }
  }
);

class Tabs extends Component {
  state = { tabBarVisible: true };
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <TabBar
          navigation={navigation}
          onNavPress={() => {
            navigation.state.index === 0
              ? navigation.navigate("DrawerOpen")
              : navigation.navigate("DrawerClose");
          }}
          onChangeText={text => console.log(text)}
        />
      )
    };
  };
  render() {
    let { dispatch } = this.props;
    return (
      <MyApp
        onNavigationStateChange={(prev, current) => {
          let { routes, index } = current;
          const newRoute = routes[index];
          let tabBarVisible = newRoute.params && newRoute.params.tabBarVisible;
          this.setState({ tabBarVisible });
          //  dispatch(onSearchStateChange(false));
        }}
        screenProps={{ tabBarVisible: this.state.tabBarVisible }}
      />
    );
  }
}
export default Tabs;
