import React from "react";
import { Text, TextInput } from "react-native";
import { GRAY } from "../Constants";
export const TextComponent = props => {
  let { style, children } = props;
  return (
    <Text
      style={{
        fontFamily: "Montserrat",
        backgroundColor: "transparent",
        color: GRAY,
        ...style
      }}
    >
      {children}
    </Text>
  );
};

export const TextInputComponent = props => {
  let { inputStyle } = props;
  return (
    <TextInput style={[{ fontFamily: "Montserrat" }, inputStyle]} {...props} />
  );
};
