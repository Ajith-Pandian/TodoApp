import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import { Close, RadioOn, RadioOff } from "../Components/Icons";
import { GRAY, RED, ACCENT_COLOR_1 } from "../Constants";
import BackgroundContainer from "../Components/BackgroundContainer";
import DisplayMessage from "../Components/DisplayMessage";
import {
  TextComponent,
  TextInputComponent
} from "../Components/TextComponents";
import { incompleteTodo } from "../Store/Actions/TodoActions";
import { isDigitsOnly, objectEquals } from "../Utils";

class Option extends Component {
  constructor() {
    super();
  }
  render() {
    let { onPress, unit, selectedUnit } = this.props;
    let { options, icon, radioText } = styles;
    let { text } = unit;
    let isSelected = objectEquals(unit, selectedUnit);
    return (
      <TouchableOpacity onPress={() => onPress(unit)} style={options}>
        {isSelected ? (
          <RadioOn size={18} style={icon} color={GRAY} />
        ) : (
          <RadioOff size={18} style={icon} color={GRAY} />
        )}
        <TextComponent isLight={!isSelected} textStyle={radioText}>
          {text}
        </TextComponent>
      </TouchableOpacity>
    );
  }
}
const Units = {
  MINUTES: { text: "Minutes", maxValue: 900, minText: "mins" },
  HOURS: { text: "Hours", maxValue: 600, minText: "hrs" },
  DAYS: { text: "Days", maxValue: 120, minText: "days" }
};
const getUnitFromMinText = minText => {
  return minText === Units.MINUTES.minText
    ? Units.MINUTES
    : minText === Units.HOURS.minText
      ? Units.HOURS
      : Units.DAYS.minText === minText ? Units.DAYS : Units.MINUTES;
};
class DurationPicker extends Component {
  constructor(props) {
    super(props);
    let { time } = props.navigation.state.params;
    let value = time.split(" ")[0];
    let minText = time.split(" ")[1];
    let unit = getUnitFromMinText(minText);
    this.state = {
      isError: false,
      errorMessage: "Enter valid time",
      value,
      unit
    };
  }
  validate = isSubmitted => {
    let { navigation } = this.props;
    let { value, unit } = this.state;
    let { onTimePick } = navigation.state.params;

    const isValid = value && isDigitsOnly(value);
    this.setState({ isError: !isValid });

    const isGreaterThanMax = value && value > unit.maxValue;
    isGreaterThanMax ? this.setState({ value: unit.maxValue }) : "";

    if (isValid && !isGreaterThanMax && isSubmitted) {
      let text = value + " " + unit.minText;
      onTimePick({ text, value, unit: unit.minText.charAt(0) });
      navigation.goBack();
    }
  };

  render() {
    let { isError, errorMessage, value, unit } = this.state;
    let { goBack } = this.props.navigation;
    let {
      closeIcon,
      headerText,
      horizontalLine,
      inputComp,
      inputErrorText,
      optionsLayout,
      button
    } = styles;
    return (
      <BackgroundContainer style={{ flex: 1 }} isTop={true}>
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
        >
          <TouchableOpacity onPress={() => goBack()} style={closeIcon}>
            <Close
              size={30}
              style={{ backgroundColor: "transparent" }}
              color={GRAY}
            />
          </TouchableOpacity>
          <TextComponent isLight textStyle={headerText}>
            Reminder Time
          </TextComponent>
          <View style={horizontalLine} />
          <View style={{ alignItems: "center" }}>
            <TextInputComponent
              isLight
              inputStyle={[
                inputComp,
                {
                  borderBottomColor: isError ? RED : GRAY,
                  fontSize: 16
                }
              ]}
              value={value.toString()}
              multiline={false}
              maxLength={3}
              numberOfLines={1}
              placeholder={"Enter time"}
              keyboardType={"numeric"}
              underlineColorAndroid={"transparent"}
              returnKeyType={"done"}
              onChangeText={value => this.setState({ value })}
              onEndEditing={() => {
                this.validate(false);
              }}
              onFocus={() => this.setState({ isError: false })}
            />
            {isError ? (
              <TextComponent textStyle={inputErrorText}>
                {errorMessage}
              </TextComponent>
            ) : null}

            <View style={optionsLayout}>
              <Option
                selectedUnit={unit}
                unit={Units.MINUTES}
                onPress={unit => {
                  this.setState({ unit }, () => this.validate(false));
                }}
              />
              <Option
                selectedUnit={unit}
                unit={Units.HOURS}
                onPress={unit => {
                  this.setState({ unit }, () => this.validate(false));
                }}
              />
              <Option
                selectedUnit={unit}
                unit={Units.DAYS}
                onPress={unit => {
                  this.setState({ unit }, () => this.validate(false));
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={button}
            onPress={() => {
              this.validate(true);
            }}
          >
            <TextComponent textStyle={{ color: "white" }}>Done</TextComponent>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </BackgroundContainer>
    );
  }
}
const { width: WIDTH } = Dimensions.get("window");
const V_BUTTON_PADDING = 7;
const H_BUTTON_PADDING = 5 * V_BUTTON_PADDING;
const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: "flex-end",
    margin: 10,
    padding: 10
  },
  headerText: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 22,
    textAlign: "left"
  },
  horizontalLine: {
    width: "100%",
    height: 0.5,
    backgroundColor: GRAY,
    marginTop: 20,
    marginBottom: 15
  },
  inputComp: {
    borderBottomWidth: 1,
    width: WIDTH - 50,
    marginTop: 5,
    marginBottom: 5
  },
  optionsLayout: {
    marginTop: 5,
    marginBottom: 5,
    width: WIDTH - 50
  },
  button: {
    alignSelf: "center",
    backgroundColor: ACCENT_COLOR_1,
    borderRadius: 2,
    margin: 20,
    paddingLeft: H_BUTTON_PADDING,
    paddingRight: H_BUTTON_PADDING,
    paddingTop: V_BUTTON_PADDING,
    paddingBottom: V_BUTTON_PADDING
  },
  inputErrorText: {
    marginTop: 2,
    marginBottom: 2,
    height: 20,
    textAlign: "left",
    color: RED,
    backgroundColor: "transparent"
  },
  options: {
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginLeft: 5,
    marginRight: 10,
    backgroundColor: "transparent"
  },
  radioText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16
  }
});

const mapStateToProps = ({ TodoReducer }) => {
  let { isLoading, isError, isSuccess } = TodoReducer;
  return {
    isLoading,
    isError,
    isSuccess
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _incompleteTodo: id => dispatch(incompleteTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DurationPicker);
