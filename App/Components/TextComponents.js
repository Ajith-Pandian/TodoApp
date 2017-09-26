import React from "react";
import { Text, TextInput } from "react-native";

export const TextComponent = props => {
  let { style, children } = props;
  return (
    <Text style={[{ fontFamily: "Montserrat" }, { ...style }]} {...props} />
  );
};

export const TextInputComponent = props => {
  let { style, children } = props;
  return <TextInput style={[{ fontFamily: "Montserrat" }, style]} {...props} />;
};
