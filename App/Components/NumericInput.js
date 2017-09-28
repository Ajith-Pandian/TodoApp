import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Keyboard,
  StyleSheet,
  BackHandler,
  Platform
} from "react-native";
import { TextInputComponent } from "./TextComponents";
import { GRAY } from "../Constants";
export default class NumericInput extends Component {
  constructor(props) {
    super(props);
    let { isOtp } = props;
    let maxLength = isOtp ? 6 : 10;
    let placeholder = isOtp ? "OTP" : "Phone Number";

    this.state = {
      text: "",
      isError: false,
      isKeyboardShown: false,
      validated: false,
      maxLength,
      placeholder
    };
  }

  validateInput = () => {
    let { text, maxLength } = this.state;
    let isDigitsOnly = /^\d+$/.test(text);
    let has10Digits = text.length === maxLength;
    let isValid = has10Digits && isDigitsOnly;
    let isError = !isValid;
    this.setState({ isError }, () => {
      let { isError, isKeyboardShown } = this.state;
      if (!isError) {
        if (isKeyboardShown) {
          this.setState({ validated: true }, () => Keyboard.dismiss());
        } else this.props.onSuccess();
      }
    });
  };
  componentWillMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        this.setState({ isKeyboardShown: false }, () => {
          let { validated, isError } = this.state;
          if (!isError && validated)
            this.setState({ validated: false }, () => this.props.onSuccess());
        });
      }
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        this.setState({ isKeyboardShown: true });
      }
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  render() {
    let { isOtp } = this.props;
    let { inputContainer, input, inputError } = getStyles(isOtp);
    let { isError, text, placeholder, maxLength } = this.state;
    const isIos = Platform.OS === "ios";
    let extraStyle = isIos ? getIosStyle() : {};
    return (
      <View style={[inputContainer]}>
        <TextInputComponent
          style={[isError ? inputError : input, extraStyle]}
          maxLength={maxLength}
          multiline={false}
          placeholder={placeholder}
          keyboardType={"numeric"}
          underlineColorAndroid={isError ? "red" : "grey"}
          returnKeyType={"done"}
          value={text}
          onChangeText={text => this.setState({ text })}
          onEndEditing={() => {
            this.validateInput();
          }}
          onFocus={() => this.setState({ isError: false })}
        />
      </View>
    );
  }
}

function getIosStyle() {
  return {
    borderBottomWidth: 1,
    borderBottomColor: GRAY
  };
}
function getStyles(isOtp) {
  const WIDTH = Dimensions.get("window").width;
  const FONT_SIZE = 16;
  const INPUT_WIDTH_PERCENTAGE = 85;
  const PREFIX_WIDTH_PERCENTAGE = 100 - INPUT_WIDTH_PERCENTAGE;
  const INPUT_CONTAINER_HEIGHT = 40;
  const INPUT_CONTAINER_WIDTH = isOtp ? WIDTH / 2 : WIDTH - 80;

  const styles = {
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      height: INPUT_CONTAINER_HEIGHT,
      width: INPUT_CONTAINER_WIDTH
    },
    input: {
      flex: INPUT_WIDTH_PERCENTAGE,
      height: INPUT_CONTAINER_HEIGHT,
      fontSize: FONT_SIZE,
      textAlign: isOtp ? "center" : "left",
      textAlignVertical: "center",
      color: "#34495e",
      margin: 2
    },
    inputError: {
      flex: INPUT_WIDTH_PERCENTAGE,
      height: INPUT_CONTAINER_HEIGHT,
      fontSize: FONT_SIZE,
      textAlign: isOtp ? "center" : "left",
      textAlignVertical: "center",
      color: "#34495e",
      margin: 2
    }
  };

  return styles;
}
