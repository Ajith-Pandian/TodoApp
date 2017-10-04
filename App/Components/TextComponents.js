import React from "react";
import { Text, TextInput } from "react-native";
import { GRAY } from "../Constants";
export const TextComponent = props => {
  let { textStyle, isBold, children } = props;
  return (
    <Text
      style={[
        {
          fontFamily: "Montserrat",
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
