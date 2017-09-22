import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from "react-native";

const MenuButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <Image
        style={{ margin: 10, width: 30, height: 30 }}
        source={require("../Resources/menu.png")}
      />
    </TouchableOpacity>
  );
};

export default MenuButton;
