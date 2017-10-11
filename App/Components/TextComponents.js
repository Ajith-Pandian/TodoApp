import React from "react";
import { Text, TextInput, Platform } from "react-native";
import { GRAY } from "../Constants";
export const TextComponent = props => {
  let { textStyle, isBold, children } = props;
  let boldFont = Platform.OS === "ios" ? "Montserrat-Bold" : "Montserrat Bold";
  return (
    <Text
      style={[
        {
          fontFamily: isBold ? boldFont : "Montserrat",
          backgroundColor: "transparent",
          color: GRAY
        },
        textStyle
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const TextInputComponent = props => {
  let { inputStyle } = props;
  return (
    <TextInput
      style={[inputStyle, { fontFamily: "Montserrat" }]}
      {...props}
      placeholderTextColor={GRAY}
    />
  );
};
