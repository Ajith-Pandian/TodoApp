import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from "react-native";
import { ACCENT_COLOR } from "../Constants";

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <Image
        style={{ margin: 10, width: 30, height: 30, tintColor: ACCENT_COLOR }}
        source={require("../Resources/add.png")}
      />
    </TouchableOpacity>
  );
};

export default AddButton;
