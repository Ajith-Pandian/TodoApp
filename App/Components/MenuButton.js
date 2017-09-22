import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from "react-native";
import { ACCENT_COLOR } from "../Constants";
const MenuButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <Image
        style={{ margin: 10, width: 30, height: 30, tintColor: ACCENT_COLOR }}
        source={require("../Resources/menu.png")}
      />
    </TouchableOpacity>
  );
};

export default MenuButton;
