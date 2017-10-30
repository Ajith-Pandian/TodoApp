import React, { Component } from "react";
import { View, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import InputBox from "../Components/InputBox";
import RoundButton from "../Components/RoundButton";
import { TextComponent } from "../Components/TextComponents";
import DisplayMessage from "../Components/DisplayMessage";
import { withBackExit, resetNavigationToFirst } from "../Utils";
import BackgroundContainer from "../Components/BackgroundContainer";
import { verifyOtp } from "../Store/Actions/OtpActions";
import { onLogin } from "../Store/Actions/LoginActions";

class OtpScreen extends Component {
  componentWillReceiveProps(nextProps) {
    let {
      isSuccess,
      isError,
      isFailed,
      navigation,
      isRegisteredUser
    } = nextProps;

    if (isSuccess) {
      if (isRegisteredUser) {
        resetNavigationToFirst("Home", navigation);
      } else {
        resetNavigationToFirst("Register", navigation);
      }
    } else if (isError) DisplayMessage("OTP is not valid");
    else if (isFailed) DisplayMessage("Failed. Retry");
  }
  render() {
    let {
      container,
      itemsContainer,
      inputContainer,
      titleText,
      phoneText,
      centerText
    } = styles;
    let {
      phoneNum,
      otp, //FIXME: REMOVE ME ON PRODUCTION
      isLoading,
      _verifyOtp,
      _onLogin,
      navigation
    } = this.props;
    return (
      <BackgroundContainer style={container}>
        <View style={itemsContainer}>
          <View>
            <TextComponent textStyle={titleText}>
              One Time Password
            </TextComponent>
            <TextComponent textStyle={phoneText}>
              Please enter the code sent to {phoneNum}
            </TextComponent>
            {/* FIXME: REMOVE it on production*/}
            <TextComponent
              textStyle={{ textAlign: "center", fontSize: 16, color: "red" }}
            >
              Sent otp {otp}
            </TextComponent>
          </View>
          <View style={inputContainer}>
            <InputBox
              ref={ref => (this.InputRef = ref)}
              placeholder={"Enter Otp"}
              autoFocus={true}
              maxLength={6}
              widthPercentage={60}
              type={InputBox.OTP}
              onSuccess={enteredOtp => {
                _verifyOtp(phoneNum, enteredOtp);
              }}
            />
            {isLoading ? (
              <Spinner
                style={{ margin: 5 }}
                isVisible={true}
                size={45}
                type={"Bounce"}
                color={"#ff2a68"}
              />
            ) : (
              <RoundButton
                size={45}
                padding={15}
                style={{ marginTop: 30 }}
                icon={RoundButton.RIGHT}
                onPress={() => {
                  this.InputRef.validateInput(InputBox.OTP);
                }}
              />
            )}
          </View>
          <View>
            <TextComponent textStyle={centerText}>
              {"Didn't get OTP?"}
            </TextComponent>
            <TouchableOpacity onPress={() => _onLogin(phoneNum)}>
              <TextComponent isBold textStyle={centerText}>
                Request again
              </TextComponent>
            </TouchableOpacity>
          </View>
        </View>
      </BackgroundContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight
  },
  itemsContainer: {
    marginTop: 20,
    marginBottom: 20,
    height: 400,
    position: "absolute",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  titleText: {
    textAlign: "center",
    fontSize: 25
  },
  phoneText: { textAlign: "center", fontSize: 16 },
  centerText: { textAlign: "center" },
  inputContainer: {
    alignItems: "center"
  }
});
OtpScreen.navigationOptions = {
  header: null
};

const mapStateToProps = ({ UserReducer, OtpReducer }) => {
  let { phoneNum, otp } = UserReducer;
  let {
    isLoading,
    isError,
    isSuccess,
    isFailed,
    isRegisteredUser
  } = OtpReducer;
  return {
    phoneNum,
    isRegisteredUser,
    otp,
    isLoading,
    isError,
    isSuccess,
    isFailed
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _verifyOtp: (phoneNum, otp) => {
    dispatch(verifyOtp(phoneNum, otp));
  },
  _onLogin: phoneNum => {
    dispatch(onLogin(phoneNum));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);
//export default withBackExit(OtpScreen, { header: null });
