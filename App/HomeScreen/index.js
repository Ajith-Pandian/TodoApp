import React, { Component } from "react";
import { View, Image, Button, Dimensions, StyleSheet } from "react-native";
import { DrawerNavigator, StackNavigator } from "react-navigation";

import MenuButton from "../Components/MenuButton";
import TabBar from "../Components/TabBar";
import Tabs from "./Tabs";
import Notifications from "./Notifications";

const DrawerNav = DrawerNavigator(
  {
    Home: {
      screen: Tabs
    },
    Notifications: {
      screen: Notifications
    }
  },
  {
    initialRouteName: "Home",
    drawerWidth: Dimensions.get("window").width * 0.75
  }
);

const DrawerNavigation = new StackNavigator(
  {
    DrawerStack: {
      screen: DrawerNav
    }
  },
  {
    initialRouteName: "DrawerStack",
    headerMode: "screen",
    navigationOptions: ({navigation}) => {
      return {
        title: "App",
        header: (
          <TabBar
            onNavPress={() => {
              navigation.state.index === 0
                ? navigation.navigate("DrawerOpen")
                : navigation.navigate("DrawerClose");
            }}
            onChangeText={text => console.log(text)}
          />
        )
      };
    }
  }
);
class Nav extends Component {
  render() {
    return <DrawerNavigation />;
  }
}

export default Nav;
