import React, { Component } from "react";
import { View, StatusBar, Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect, Provider } from "react-redux";

import LoginScreen from "./LoginScreen";
import OtpScreen from "./OtpScreen";
import HomeScreen from "./HomeScreen";
import CreateTask from "./CreateTask";
import NewTasks from "./NewTasks";
import ContactsScreen from "./Contacts";
import DetailsScreen from "./TaskDetails";

import getStore from "./Store";
import { APP_COLOR } from "./Constants";
import Swipe from "./Swipe";
import Register from "./Register";
class StackApp extends Component {
  state = { isLoggedIn: true };
  render() {
    let { isLoggedIn } = this.state;
    let AppNavigator = StackNavigator(
      {
        Register: { screen: Register, navigationOptions: { header: null } },
        Login: { screen: LoginScreen, navigationOptions: { header: null } },
        Otp: { screen: OtpScreen, navigationOptions: { header: null } },
        Home: { screen: HomeScreen },
        CreateTask: { screen: CreateTask, navigationOptions: { header: null } },
        NewTasks: { screen: NewTasks, navigationOptions: { header: null } },
        Contacts: {
          screen: ContactsScreen,
          navigationOptions: { header: null }
        },
        TaskDetails: {
          screen: DetailsScreen,
          navigationOptions: { header: null }
        }
      },
      {
        headerMode: "screen",
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
