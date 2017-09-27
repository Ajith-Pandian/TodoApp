import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { ACCENT_COLOR_1 } from "../Constants";
import { Right, Question } from "./Icons";
const RoundButton = props => {
  let { onPress, size, style, icon } = props;
  let centerIcon;
  switch (icon) {
    case "right":
      centerIcon = <Right size={size - 5} color="white" />;
      break;
    default:
      centerIcon = <Question size={size - 5} color="white" />;
      break;
  }
  return (
    <TouchableOpacity
      style={[
        styles.roundButton,
        {
          width: size,
          height: size
        },
        style
      ]}
      onPress={() => onPress()}
    >
      {centerIcon}
    </TouchableOpacity>
  );
};

const styles = {
  roundButton: {
    margin: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT_COLOR_1,
    borderRadius: 100
  }
};

export default RoundButton;
