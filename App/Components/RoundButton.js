import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { ACCENT_COLOR_1 } from "../Constants";
import { Right, Question, Add } from "./Icons";
class RoundButton extends Component {
  static RIGHT = "right";
  static ADD = "add";
  constructor() {
    super();
  }
  render() {
    let { onPress, size, style, icon } = this.props;
    let centerIcon;
    switch (icon) {
      case RoundButton.RIGHT:
        centerIcon = (
          <Right
            size={size - 5}
            style={{ backgroundColor: "transparent" }}
            color="white"
          />
        );
        break;
      case RoundButton.ADD:
        centerIcon = (
          <Add
            size={size - 5}
            style={{ backgroundColor: "transparent" }}
            color="white"
          />
        );
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
  }
}

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
