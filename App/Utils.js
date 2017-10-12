import React, { Component } from "react";
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";

export function isEmail(email) {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export function isDigitsOnly(number) {
  let digitsOnlyRegex = /^\d+$/;
  return digitsOnlyRegex.test(number);
}

export const resetNavigationToFirst = (targetRoute, navigation) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: targetRoute })]
  });
  navigation.dispatch(resetAction);
};

export const withBackExit = WrappedComponent => {
  return class extends Component {
    componentWillMount() {
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        function() {
          BackHandler.exitApp();
          return true;
        }
      );
    }
    componentWillUnmount() {
      this.backHandler.remove();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
export function getId() {
  let dateString = new Date().getTime().toString();
  let length = dateString.length;
  let id = parseInt(dateString.substr(length - 6));
  return id;
}

export function getTimeString(date) {
  let hours = date.getHours(),
    minutes = date.getMinutes();
  let isPM = hours >= 12;
  let isMidday = hours == 12;
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  hours = hours - (isPM && !isMidday ? 12 : 0);
  hours = hours >= 10 ? hours : "0" + hours;
  let time = [hours, minutes].join(":") + (isPM ? " PM" : " AM");
  return time;
}

export function getSortedList(array) {
  return array.sort((a, b) => a.completionTime - b.completionTime);
}
