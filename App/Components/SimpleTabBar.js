import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
import {
  onSearchTermChange,
  onSearchStateChange
} from "../Store/Actions/SearchActions";
import { TextComponent, TextInputComponent } from "./TextComponents";
import { Back } from "./Icons";
import { APP_COLOR, ACCENT_COLOR } from "../Constants";
import { NavigationActions } from "react-navigation";

const BACK_ICON = (
  <Back size={25} style={{ backgroundColor: "transparent" }} color="white" />
);

const WIDTH = Dimensions.get("window").width;

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{ margin: 10, padding: 5 }}
    >
      {BACK_ICON}
    </TouchableOpacity>
  );
};
export default class SimpleTabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { onBackPress } = this.props;
    let { container } = styles;
    return (
      <View style={container}>
        {onBackPress ? <BackButton onPress={() => onBackPress()} /> : null}
        <TextComponent
          textStyle={{
            marginLeft: onBackPress ? 10 : 20,
            marginRight: onBackPress ? 10 : 20,
            fontSize: 16,
            color: "white"
          }}
        >
          Todo App
        </TextComponent>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: Platform.OS !== "ios" ? 56 : 48,
    width: Dimensions.get("window").width,
    backgroundColor: APP_COLOR,
    flexDirection: "row",
    alignItems: "center"
  }
});
