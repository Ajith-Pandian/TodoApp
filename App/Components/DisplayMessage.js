import React from "react";
import { AlertIOS, Platform, ToastAndroid } from "react-native";

const DisplayMessage = (message, title) => {
  Platform.OS === "ios"
    ? AlertIOS.alert(title, message)
    : ToastAndroid.show(message, ToastAndroid.SHORT);
};
export default DisplayMessage;
