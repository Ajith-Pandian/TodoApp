import React from "react";
import { Text, TextInput, Platform } from "react-native";
import { GRAY } from "../Constants";
export const TextComponent = props => {
  let { textStyle, isBold, isExtraLight, isLight, children } = props;
  let isIos = Platform.OS === "ios";
  let boldFont = isIos ? "Montserrat-Bold" : "Montserrat Bold";
  let extraLightFont = isIos
    ? "Montserrat-ExtraLight"
    : "Montserrat ExtraLight";
  let lightFont = isIos ? "Montserrat-Light" : "Montserrat Light";
  let regularFont = isIos ? "Montserrat-Regular" : "Montserrat";

  let fontFamily = isBold
    ? boldFont
    : isExtraLight ? extraLightFont : isLight ? lightFont : regularFont;
  return (
    <Text
      style={[
        {
          fontFamily,
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
