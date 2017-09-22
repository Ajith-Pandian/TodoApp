import React, { Component } from "react";
import { View, Image, Button, Text, StyleSheet } from "react-native";
export default class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Notifications",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("../Resources/notification.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No notifications</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});
