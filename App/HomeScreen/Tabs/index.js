import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import { TabNavigator } from "react-navigation";
import TodoList from "./TodoList";
import { onSearchStateChange } from "../../Store/Actions/SearchActions";
import { connect } from "react-redux";
let IC_TODAY = require("../../Resources/today.png");
let IC_WEEK = require("../../Resources/week.png");
let IC_ALL = require("../../Resources/all.png");
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});
const BLUE = "#00baff";

class Tab extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  getIcon = () => {
    console.log(this.navigation.state.key);
  };
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      getIcon();
      return (
        <Image
          source={IC_TODAY}
          style={{
            width: 26,
            height: 26,
            tintColor
          }}
        />
      );
    }
  };
  render() {
    return <TodoList {...this.props} />;
  }
}
const MyApp = TabNavigator(
  {
    Today: { screen: Tab },
    Week: { screen: props => <TodoList {...props} screen={"week"} /> },
    All: { screen: props => <TodoList {...props} screen={"all"} /> }
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: "white"
      },
      indicatorStyle: { backgroundColor: BLUE },
      activeTintColor: BLUE,
      inactiveTintColor: "black"
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
