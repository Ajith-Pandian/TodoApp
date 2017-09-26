import React, { Component } from "react";
import { View, StatusBar, Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect, Provider } from "react-redux";

import LoginScreen from "./LoginScreen";
import OtpScreen from "./OtpScreen";
import HomeScreen from "./HomeScreen";

import getStore from "./Store";
import { APP_COLOR } from "./Constants";
import Swipe from "./Swipe";
class StackApp extends Component {
  state = { isLoggedIn: false };
  render() {
    let { isLoggedIn } = this.state;
    let AppNavigator = StackNavigator(
      {
        Login: { screen: LoginScreen },
        Otp: { screen: OtpScreen },
        Home: { screen: HomeScreen }
      },
      {
        headerMode: "none",
        title: "App",
        initialRouteName: isLoggedIn ? "Home" : "Login"
      }
    );
    return <AppNavigator />;
  }
}
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View
    style={{
      height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
      backgroundColor
    }}
  >
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const App = () => (
  <View style={{ flex: 1 }}>
    <MyStatusBar backgroundColor={APP_COLOR} barStyle="light-content" />
    <StackApp />
  </View>
);

const ReduxApp = () => (
  <Provider store={getStore()}>
    <App />
  </Provider>
);

export default ReduxApp;
