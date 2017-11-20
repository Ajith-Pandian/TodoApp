import React from "react";
import { Text, TextInput, Platform } from "react-native";
import { GRAY } from "../Constants";

const getFontFamily = (isBold, isExtraLight, isLight, isThin) => {
  let isIos = Platform.OS === "ios";
  let boldFont = isIos ? "Montserrat Bold" : "Montserrat Bold";
  let thinFont = isIos ? "Montserrat Thin" : "Montserrat Thin";
  let extraLightFont = isIos
    ? "Montserrat ExtraLight"
    : "Montserrat ExtraLight";
  let lightFont = isIos ? "Montserrat Light" : "Montserrat Light";
  let regularFont = isIos ? "Montserrat Regular" : "Montserrat Regular";

  let fontFamily = isThin
    ? thinFont
    : isExtraLight
      ? extraLightFont
      : isLight ? lightFont : isBold ? boldFont : regularFont;

  return fontFamily;
};

export const TextComponent = props => {
  let { textStyle, isBold, isExtraLight, isLight, isThin, children } = props;
  let fontFamily = getFontFamily(isBold, isExtraLight, isLight, isThin);
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
  let { inputStyle, isBold, isExtraLight, isLight, isThin } = props;
  let fontFamily = getFontFamily(isBold, isExtraLight, isLight, isThin);
  return (
    <TextInput
      style={[inputStyle, { fontFamily }]}
      placeholderTextColor={GRAY}
      {...props}
    />
  );
};
