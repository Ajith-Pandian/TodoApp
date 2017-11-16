import React, { Component } from "react";
import {
  View,
  Dimensions,
  Keyboard,
  StyleSheet,
  BackHandler,
  Platform
} from "react-native";
import { TextComponent, TextInputComponent } from "./TextComponents";
import { GRAY, TUNA, RED } from "../Constants";
import { isDigitsOnly as _isDigitsOnly } from "../Utils";

export default class InputBox extends Component {
  static MOBILE = "mobile";
  static OTP = "otp";
  constructor(props) {
    super(props);
    let { maxLength, placeholder, type } = props;
    this.state = {
      text: "",
      isError: false,
      errorMessage: "Error",
      isKeyboardShown: false,
      validated: false
    };
  }

  validateInput = type => {
    let { text } = this.state;
    let { maxLength } = this.props;
    let errorMessage = "";
    let isError = false;
    switch (type) {
      case InputBox.MOBILE:
        {
          let isDigitsOnly = _isDigitsOnly(text);
          let hasMaxDigits = text.length === maxLength;
          let isValid = hasMaxDigits && isDigitsOnly;
          isError = !isValid;
          //if (!hasMaxDigits) errorMessage = "Enter 10 digits";
          //  if (!isDigitsOnly) errorMessage = "Enter only numbers";
          //  if (text.length === 0) errorMessage = "Enter phone number";
          errorMessage = "Enter valid phone number";
        }
        break;
      case InputBox.OTP:
        {
          let isDigitsOnly = _isDigitsOnly(text);
          let hasMaxDigits = text.length === maxLength;
          let isValid = hasMaxDigits && isDigitsOnly;
          isError = !isValid;
          if (isError) errorMessage = "Enter valid OTP";
          if (text.length === 0) errorMessage = "Enter OTP";
        }
        break;
    }

    this.setState({ isError, errorMessage }, () => {
      let { isError, text, isKeyboardShown } = this.state;
      if (!isError) {
        if (isKeyboardShown) {
          this.setState({ validated: true }, () => Keyboard.dismiss());
        } else this.props.onSuccess(text);
      }
    });
  };
  componentWillMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        this.setState({ isKeyboardShown: false }, () => {
          let { validated, isError, text } = this.state;
          if (!isError && validated)
            this.setState({ validated: false }, () =>
              this.props.onSuccess(text)
            );
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
    let { isError, errorMessage, text } = this.state;
    let { placeholder, maxLength, autoFocus, style, type } = this.props;
    let { inputContainer, input, inputErrorText } = this.getStyles(isError);
    let extraStyle = getExtraStyle(isError);
    return (
      <View style={[inputContainer]}>
        <TextInputComponent
          inputStyle={[input, extraStyle, style]}
          maxLength={maxLength}
          autoFocus={autoFocus}
          multiline={false}
          placeholder={placeholder}
          placeholderTextColor={GRAY}
          keyboardType={"numeric"}
          underlineColorAndroid={"transparent"}
          returnKeyType={"done"}
          value={text}
          onChangeText={text => this.setState({ text })}
          onEndEditing={() => {
            this.validateInput(type);
          }}
          onFocus={() => this.setState({ isError: false })}
        />
        {isError ? (
          <TextComponent style={inputErrorText}>{errorMessage}</TextComponent>
        ) : null}
      </View>
    );
  }
  getStyles = isError => {
    let { widthPercentage } = this.props;
    const WIDTH = Dimensions.get("window").width;
    const FONT_SIZE = 16;
    const INPUT_WIDTH_PERCENTAGE = widthPercentage ? widthPercentage : 85;
    const INPUT_CONTAINER_HEIGHT = 40;
    const INPUT_CONTAINER_WIDTH = WIDTH * (INPUT_WIDTH_PERCENTAGE * 0.01) - 80;
    const ERROR_MARGIN = 2;
    const TOTAL_ERROR_MARGIN = 2 * ERROR_MARGIN;

    const styles = {
      inputContainer: {
        height: isError
          ? 1.5 * INPUT_CONTAINER_HEIGHT + TOTAL_ERROR_MARGIN
          : INPUT_CONTAINER_HEIGHT,
        width: INPUT_CONTAINER_WIDTH
      },
      input: {
        flex: INPUT_WIDTH_PERCENTAGE,
        height: INPUT_CONTAINER_HEIGHT,
        fontSize: FONT_SIZE,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "transparent",
        color: "black"
      },
      inputErrorText: {
        marginTop: ERROR_MARGIN,
        marginBottom: ERROR_MARGIN,
        height: INPUT_CONTAINER_HEIGHT / 2,
        textAlign: "left",
        color: RED,
        backgroundColor: "transparent"
      }
    };

    return styles;
  };
}

function getExtraStyle(isError) {
  return {
    borderBottomWidth: 0.5,
    borderBottomColor: isError ? RED : TUNA
  };
}
