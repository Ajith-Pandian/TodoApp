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

import { Close, Calendar, Time, Attach } from "../Components/Icons";
import { GRAY, RED, ACCENT_COLOR_1 } from "../Constants";
import BackgroundContainer from "../Components/BackgroundContainer";
import DisplayMessage from "../Components/DisplayMessage";
import {
  TextComponent,
  TextInputComponent
} from "../Components/TextComponents";
import { incompleteTodo } from "../Store/Actions/TodoActions";

class Feedback extends Component {
  constructor() {
    super();
    this.state = { isError: false, errorMessage: "Enter feedback" };
  }
  validate = () => {
    let { navigation, _incompleteTodo } = this.props;
    let { message } = this.state;
    const { id } = navigation.state.params;

    const isValid = message && message.length > 0;
    this.setState({ isError: !isValid });
    isValid && id ? _incompleteTodo(id) : null;
  };

  render() {
    let { isError, errorMessage } = this.state;
    let { goBack } = this.props.navigation;
    return (
      <BackgroundContainer style={{ flex: 1 }} isTop={true}>
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
        >
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
          <TextComponent
            textStyle={{
              marginTop: 20,
              marginLeft: 25,
              fontSize: 22,
              textAlign: "left"
            }}
          >
            What went wrong ?
          </TextComponent>
          <View
            style={{
              width: "100%",
              height: 0.5,
              backgroundColor: GRAY,
              marginTop: 20,
              marginBottom: 15
            }}
          />
          <View style={{ alignItems: "center" }}>
            <TextInputComponent
              isLight
              inputStyle={[
                styles.inputComp,
                {
                  borderBottomColor: isError ? RED : GRAY,
                  fontSize: 16
                }
              ]}
              multiline={true}
              numberOfLines={20}
              placeholder={"Write your message here"}
              underlineColorAndroid={"transparent"}
              returnKeyType={"done"}
              onChangeText={text => this.setState({ message: text })}
              onEndEditing={() => {
                this.validate();
              }}
              onFocus={() => this.setState({ isError: false })}
            />
            {isError ? (
              <TextComponent textStyle={styles.inputErrorText}>
                {errorMessage}
              </TextComponent>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.validate();
            }}
          >
            <TextComponent textStyle={{ color: "white" }}>Submit</TextComponent>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </BackgroundContainer>
    );
  }
}
const WIDTH = Dimensions.get("window").width;
const V_BUTTON_PADDING = 7;
const H_BUTTON_PADDING = 5 * V_BUTTON_PADDING;
const styles = StyleSheet.create({
  inputComp: {
    textAlign: "auto",
    textAlignVertical: "top",
    width: WIDTH - 50,
    marginTop: 5,
    marginBottom: 5
  },
  button: {
    alignSelf: "center",
    backgroundColor: ACCENT_COLOR_1,
    borderRadius: 2,
    margin: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
