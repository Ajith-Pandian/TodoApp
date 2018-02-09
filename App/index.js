import React, { Component } from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect, Provider } from "react-redux";
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from "react-native-fcm";
import Spinner from "react-native-spinkit";

import LoginScreen from "./LoginScreen";
import OtpScreen from "./OtpScreen";
import HomeScreen from "./HomeScreen";
import CreateTask from "./CreateTask";
import NewTasks from "./NewTasks";
import ContactsScreen from "./Contacts";
import DetailsScreen from "./TaskDetails";
import PdfViewer from "./PdfViewer";
import Feedback from "./Feedback";
import DurationPicker from "./DurationPicker";

import store from "./Store";
import { APP_COLOR, RADICAL_RED, WILD_SAND, WEEK } from "./Constants";
import Swipe from "./Swipe";
import Register from "./Register";
import DisplayMessage from "./Components/DisplayMessage";
import {
  modifyFcm,
  updateFcmToken,
  createLocalNotification
} from "./Store/Actions/NotificationActions";
import { setOpenedByNotification } from "./Store/Actions/AppStateActions";
import { fetchTodo } from "./Store/Actions/TodoActions";

class StackApp extends Component {
  constructor(props) {
    super(props);
    this.state = { opened_from_tray: false, taskId: "" };
  }
  componentWillReceiveProps(nextProps) {
    let {
      isLoggedIn,
      hasPermission,
      fcmToken,
      _modifyFcm,
      _updateFcmToken,
      _createLocalNotification,
      _setOpenedByNotification,
      _fetchTodo
    } = nextProps;
    //If don't have notification permission request for permissions
    if (!hasPermission)
      FCM.requestPermissions()
        .then(() => {
          console.log("granted");
          _modifyFcm(true);
        })
        .catch(() => {
          console.log("notification permission rejected");
          _modifyFcm(false);
        });
    if (!fcmToken)
      FCM.getFCMToken().then(token => {
        console.log("GetFCMToken");
        console.log(token);
        token && isLoggedIn
          ? _updateFcmToken(token)
          : console.log("Empty token");
      });
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
      console.log("RefreshToken");
      console.log(token);
      token && isLoggedIn ? _updateFcmToken(token) : console.log("Empty token");
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async notif => {
      console.log("notificationListener");
      console.log(notif);
      let { id, title, description } = notif;
      if (notif.local_notification) {
        //this is a local notification
        console.log("local Notification");
      } else {
        _createLocalNotification({ id, title, description });
      }
      if (notif.opened_from_tray && notif.opened_from_tray === 1) {
        //iOS: app is open/resumed because user clicked banner
        //Android: app is open/resumed because user clicked banner or tapped app icon
      }
      // await someAsyncCall();
      _fetchTodo();
      if (Platform.OS === "ios") {
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData);
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All);
            break;
        }
      }
    });
    FCM.getScheduledLocalNotifications().then(notif => console.log(notif));
    //This will be called when app opened by clicking notification
    FCM.getInitialNotification().then(notif => {
      console.log("Initial Notification");
      console.log(notif);
      if (notif && notif.title) {
        _setOpenedByNotification(true);
        this.setState({ opened_from_tray: true });
      }
    });
  }

  componentWillUnmount() {
    this.notificationListener ? this.notificationListener.remove() : null;
    this.refreshTokenListener ? this.refreshTokenListener.remove() : null;
  }

  getNavigator = isLoggedIn => {
    let { opened_from_tray, taskId } = this.state;
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
        },
        Feedback: {
          screen: Feedback,
          navigationOptions: { header: null }
        },
        DurationPicker: {
          screen: DurationPicker,
          navigationOptions: { header: null }
        }
      },
      {
        headerMode: "screen",
        title: "App",
        initialRouteName: opened_from_tray
          ? "NewTasks"
          : isLoggedIn ? "Home" : "Login"
      }
    );
    return <AppNavigator />;
  };
  render() {
    let { isLoggedIn, rehydrated } = this.props;
    return rehydrated ? (
      this.getNavigator(isLoggedIn)
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: WILD_SAND
        }}
      >
        <Spinner
          style={{ margin: 5 }}
          isVisible={true}
          size={50}
          type={"Bounce"}
          color={RADICAL_RED}
        />
      </View>
    );
  }
}
const mapStateToProps = ({
  UserReducer,
  PersistReducer,
  NotificationReducer
}) => {
  let { isLoggedIn } = UserReducer;
  let { rehydrated } = PersistReducer;
  let { hasPermission, fcmToken } = NotificationReducer;
  return {
    isLoggedIn,
    rehydrated,
    hasPermission,
    fcmToken
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _modifyFcm: hasPermission => {
    dispatch(modifyFcm(hasPermission));
  },
  _updateFcmToken: fcmToken => {
    dispatch(updateFcmToken(fcmToken));
  },
  _createLocalNotification: todo => {
    dispatch(createLocalNotification(todo));
  },
  _setOpenedByNotification: fcmToken => {
    dispatch(setOpenedByNotification(fcmToken));
  },
  _fetchTodo: todo => {
    dispatch(fetchTodo(todo));
  }
});

const ConnectedStackApp = connect(mapStateToProps, mapDispatchToProps)(
  StackApp
);

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

// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async notif => {
  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if (notif.local_notification) {
    //this is a local notification
  }
  if (notif.opened_from_tray) {
    //iOS: app is open/resumed because user clicked banner
    //Android: app is open/resumed because user clicked banner or tapped app icon
  }
  // await someAsyncCall();

  if (Platform.OS === "ios") {
    switch (notif._notificationType) {
      case NotificationType.Remote:
        notif.finish(RemoteNotificationResult.NewData);
        break;
      case NotificationType.NotificationResponse:
        notif.finish();
        break;
      case NotificationType.WillPresent:
        notif.finish(WillPresentNotificationResult.All);
        break;
    }
  }
});

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;
