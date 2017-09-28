import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Close, Calendar, Time, Attach } from "../Components/Icons";
import { GRAY, ACCENT_COLOR_1 } from "../Constants";
import BackgroundContainer from "../Components/BackgroundContainer";
import {
  TextComponent,
  TextInputComponent
} from "../Components/TextComponents";

const CALENDAR = "calendar";
const TIME = "time";
const ATTACH = "attach";
const getIcons = name => {
  let icon;

  switch (name) {
    case CALENDAR:
      icon = (
        <Calendar
          size={25}
          style={{ backgroundColor: "transparent" }}
          color={GRAY}
        />
      );
      break;
    case TIME:
      icon = (
        <Time
          size={25}
          style={{ backgroundColor: "transparent" }}
          color={GRAY}
        />
      );
      break;

    case ATTACH:
      icon = (
        <Attach
          size={25}
          style={{ backgroundColor: "transparent" }}
          color={GRAY}
        />
      );
      break;

    default:
      icon = <TextComponent>No Item</TextComponent>;
      break;
  }

  return icon;
};
export default class CreateTask extends Component {
  constructor() {
    super();
  }
  getInputComponent = () => {
    return (
      <TextInputComponent
        multiline={false}
        placeholder={"To"}
        underlineColorAndroid={"transparent"}
        returnKeyType={"done"}
        onChangeText={text => this.setState({ text })}
        onEndEditing={() => {}}
        onFocus={() => this.setState({ isError: false })}
      />
    );
  };
  getClickableComponent = (text, icon) => {
    return (
      <TouchableOpacity style={styles.clickableComp}>
        {icon ? getIcons(icon) : null}
        <View style={{ justifyContent: "center" }}>
          <TextComponent
            textStyle={{
              marginLeft: icon ? 10 : 0,
              textAlign: "left",
              textAlignVertical: "center"
            }}
          >
            {text}
          </TextComponent>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    let { goBack } = this.props.navigation;
    return (
      <BackgroundContainer style={{ flex: 1 }} isTop={true}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={{ alignSelf: "flex-end", margin: 10, padding: 10 }}
          >
            <Close
              size={30}
              style={{ backgroundColor: "transparent" }}
              color={GRAY}
            />
          </TouchableOpacity>
          <View>
            <TextComponent textStyle={{ fontSize: 26, textAlign: "left" }}>
              New Task!
            </TextComponent>
          </View>
          <View style={{ marginTop: 30 }}>
            {this.getClickableComponent("To")}
            {this.getClickableComponent("Title")}
            {this.getClickableComponent("Description")}
            {this.getClickableComponent("Date", CALENDAR)}
            {this.getClickableComponent("Time", TIME)}
            {this.getClickableComponent("Attachment", ATTACH)}
          </View>
          <TouchableOpacity style={styles.button}>
            <TextComponent textStyle={{ color: "white" }}>Done</TextComponent>
          </TouchableOpacity>
        </View>
      </BackgroundContainer>
    );
  }
}
const WIDTH = Dimensions.get("window").width;
const V_BUTTON_PADDING = 7;
const H_BUTTON_PADDING = 3 * V_BUTTON_PADDING;
const styles = StyleSheet.create({
  clickableComp: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    height: 30,
    borderBottomColor: GRAY,
    borderBottomWidth: 0.5,
    width: WIDTH - 100
  },
  button: {
    backgroundColor: ACCENT_COLOR_1,
    borderRadius: 2,
    margin: 20,
    paddingLeft: H_BUTTON_PADDING,
    paddingRight: H_BUTTON_PADDING,
    paddingTop: V_BUTTON_PADDING,
    paddingBottom: V_BUTTON_PADDING
  }
});
