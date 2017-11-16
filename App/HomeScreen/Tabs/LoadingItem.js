import React, { Component } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Spinner from "react-native-spinkit";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DIVIDER_WIDTH = 1,
  MARGIN = 10,
  CONTAINER_PADDING = 10;

export default class LoadingItem extends Component {
  render() {
    let { container } = styles;
    return (
      <View style={container}>
        <Spinner
          style={{ margin: 5 }}
          isVisible={true}
          size={45}
          type={"Circle"}
          color={"#ff2a68"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: SCREEN_WIDTH,
    marginBottom: 2,
    padding: CONTAINER_PADDING,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
