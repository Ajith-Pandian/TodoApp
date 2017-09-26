import React from "react";
import { View, ImageBackground } from "react-native";
const BACKGROUND_FULL_IMAGE = require("../Resources/background_full.jpg");
const BACKGROUND_TOP_IMAGE = require("../Resources/background_top.jpg");
const BackgroundContainer = props => {
  let { style, children, isTop } = props;
  let backgroundImage = isTop ? BACKGROUND_TOP_IMAGE : BACKGROUND_FULL_IMAGE;
  return (
    <View style={[style]}>
      <ImageBackground
        style={{
          position: "absolute",
          width: undefined,
          height: undefined,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
        source={backgroundImage}
      />
      {children}
    </View>
  );
};
export default BackgroundContainer;
