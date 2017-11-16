import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import InputBox from "../Components/InputBox";
import DisplayMessage from "../Components/DisplayMessage";
import RoundButton from "../Components/RoundButton";
import { TextComponent } from "../Components/TextComponents";
import { withBackExit, resetNavigationToFirst } from "../Utils";
import BackgroundContainer from "../Components/BackgroundContainer";
import { onLogin } from "../Store/Actions/LoginActions";

import { CHARADE, GRAY } from "../Constants";

class LoginScreen extends Component {
  static navigationOptions = { header: null };

  componentWillReceiveProps(nextProps) {
    let { isSuccess, isError, navigation } = nextProps;
    isSuccess ? resetNavigationToFirst("Otp", navigation) : "";
    isError ? DisplayMessage("Connection failed. Retry") : "";
  }

  render() {
    let { container, itemContainer } = styles;
    let { navigation, _onLogin, isLoading, isError } = this.props;
    return (
      <BackgroundContainer style={container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={itemContainer}>
            <View>
              <TextComponent
                textStyle={{
                  fontSize: 20,
                  backgroundColor: "transparent",
                  color: CHARADE
                }}
              >
                Todo App
              </TextComponent>
            </View>
            <View style={{ alignItems: "center" }}>
              <InputBox
                ref={ref => (this.InputRef = ref)}
                placeholder={"Enter Mobile Number"}
                maxLength={10}
                type={InputBox.MOBILE}
                onSuccess={text => {
                  _onLogin(text);
                }}
              />
              {isLoading ? (
                <Spinner
                  style={{ marginTop: 30 }}
                  isVisible={true}
                  size={50}
                  type={"Bounce"}
                  color={"#ff2a68"}
                />
              ) : (
                <RoundButton
                  size={50}
                  padding={20}
                  style={{ marginTop: 30 }}
                  icon={RoundButton.RIGHT}
                  onPress={() => {
                    this.InputRef.validateInput(InputBox.MOBILE);
                  }}
                />
              )}
            </View>
          </View>
          <TextComponent
            textStyle={{
              margin: 10,
              fontSize: 18,
              backgroundColor: "transparent",
              textAlign: "center",
              textAlignVertical: "center",
              position: "absolute",
              bottom: 40,
              color: GRAY
            }}
          >
            Login / Sign up
          </TextComponent>
        </KeyboardAvoidingView>
      </BackgroundContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  itemContainer: {
    height: 250,
    alignItems: "center",
    justifyContent: "space-between"
  }
});

const mapStateToProps = ({ LoginReducer }) => {
  let { isLoading, isError, isSuccess } = LoginReducer;
  return {
    isLoading,
    isError,
    isSuccess
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _onLogin: phoneNum => {
    dispatch(onLogin(phoneNum));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
