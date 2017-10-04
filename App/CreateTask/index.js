import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import { Close, Calendar, Time, Attach } from "../Components/Icons";
import { GRAY, ACCENT_COLOR_1 } from "../Constants";
import BackgroundContainer from "../Components/BackgroundContainer";
import {
  TextComponent,
  TextInputComponent
} from "../Components/TextComponents";

const TO = "To";
const DATE = "date";
const TIME = "time";
const ATTACH = "attach";
const getIcons = name => {
  let icon;

  switch (name) {
    case DATE:
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

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {icon}
    </View>
  );
};
export default class CreateTask extends Component {
  constructor() {
    super();
    this.state = { pickerVisible: false, mode: "date" };
  }
  getInputComponent = type => {
    return (
      <TextInputComponent
        inputStyle={styles.inputComp}
        multiline={false}
        placeholder={type}
        underlineColorAndroid={"transparent"}
        returnKeyType={"done"}
        onChangeText={text =>
          this.setState({ [type]: text }, () => console.log(this.state))}
        onEndEditing={() => {}}
        onFocus={() => this.setState({ isError: false })}
      />
    );
  };
  _handleClick = type => {
    switch (type) {
      case TO:
        this.props.navigation.navigate("Contacts", {
          onContactSelected: item => {
            console.log("Contact with back nav");
            console.log(item);
          }
        });
        break;
      case DATE:
      case TIME:
        this.setState({ pickerVisible: true, mode: type });
        break;
      case ATTACH:
        console.log("Attach clicked");
        break;
      default:
        console.log(`Item ${type} clicked`);
    }
  };
  getClickableComponent = (text, type) => {
    return (
      <TouchableOpacity
        style={styles.clickableComp}
        onPress={() => this._handleClick(type ? type : text)}
      >
        {type ? getIcons(type) : null}
        <TextComponent
          textStyle={{
            marginLeft: type ? 10 : 0,
            textAlign: "left",
            textAlignVertical: "center"
          }}
        >
          {text}
        </TextComponent>
      </TouchableOpacity>
    );
  };
  render() {
    let { goBack } = this.props.navigation;
    let { pickerVisible, mode } = this.state;
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
            {this.getClickableComponent(TO)}
            {this.getInputComponent("Title")}
            {this.getInputComponent("Description")}
            {this.getClickableComponent("Date", DATE)}
            {this.getClickableComponent("Time", TIME)}
            {this.getClickableComponent("Attachment", ATTACH)}
          </View>
          <TouchableOpacity style={styles.button}>
            <TextComponent textStyle={{ color: "white" }}>Done</TextComponent>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={pickerVisible}
          onConfirm={selectedDate => {
            console.log(selectedDate);
          }}
          onCancel={() => this.setState({ pickerVisible: false })}
          mode={mode}
          date={new Date()}
          titleIOS={"Pick Time"}
        />
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
    marginTop: 5,
    marginBottom: 5,
    height: 40,
    borderBottomColor: GRAY,
    borderBottomWidth: 0.5,
    width: WIDTH - 100
  },
  inputComp: {
    height: 40,
    borderBottomColor: GRAY,
    borderBottomWidth: 0.5,
    width: WIDTH - 100,
    marginTop: 5,
    marginBottom: 5
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
