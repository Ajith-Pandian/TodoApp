import React, { Component } from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect, Provider } from "react-redux";

import LoginScreen from "./LoginScreen";
import OtpScreen from "./OtpScreen";
import HomeScreen from "./HomeScreen";
import CreateTask from "./CreateTask";
import NewTasks from "./NewTasks";
import ContactsScreen from "./Contacts";
import DetailsScreen from "./TaskDetails";
import PdfViewer from "./PdfViewer";

import store from "./Store";
import { APP_COLOR } from "./Constants";
import Swipe from "./Swipe";
import Register from "./Register";
class StackApp extends Component {
  getNavigator = isLoggedIn => {
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
        },
        PdfViewer: {
          screen: PdfViewer,
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
  };
  render() {
    let { isLoggedIn, rehydrated } = this.props;
    return rehydrated ? (
      this.getNavigator(isLoggedIn)
    ) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>loading...</Text>
      </View>
    );
  }
}
const mapStateToProps = ({ UserReducer, PersistReducer }) => {
  let { isLoggedIn } = UserReducer;
  let { rehydrated } = PersistReducer;
  return {
    isLoggedIn,
    rehydrated
  };
};

const ConnectedStackApp = connect(mapStateToProps)(StackApp);

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
    <ConnectedStackApp />
  </View>
);

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;
