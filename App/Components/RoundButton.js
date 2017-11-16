import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { RADICAL_RED } from "../Constants";
import { Right, Question, Add, Close, CheckMark } from "./Icons";
class RoundButton extends Component {
  static RIGHT = "right";
  static ADD = "add";
  static CLOSE = "close";
  static CHECKMARK = "checkmark";
  constructor() {
    super();
  }
  render() {
    let { onPress, size, style, icon, padding } = this.props;
    let centerIcon;
    padding = padding ? padding : 5;
    switch (icon) {
      case RoundButton.RIGHT:
        centerIcon = (
          <Right
            size={size - padding}
            style={{ backgroundColor: "transparent" }}
            color="white"
          />
        );
        break;
      case RoundButton.ADD:
        centerIcon = (
          <Add
            size={size - padding}
            style={{ backgroundColor: "transparent" }}
            color="white"
          />
        );
        break;
      case RoundButton.CLOSE:
        centerIcon = (
          <Close
            size={size - padding}
            style={{ backgroundColor: "transparent" }}
            color="white"
          />
        );
        break;
      case RoundButton.CHECKMARK:
        centerIcon = (
          <CheckMark
            size={size - padding}
            style={{ backgroundColor: "transparent" }}
            color="white"
          />
        );
        break;
      default:
        centerIcon = <Question size={size - padding} color="white" />;
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
  }
}

const styles = {
  roundButton: {
    margin: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: RADICAL_RED,
    borderRadius: 100
  }
};

export default RoundButton;
