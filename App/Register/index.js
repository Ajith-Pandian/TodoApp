import React, { Component } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import RoundButton from "../Components/RoundButton";
import DisplayMessage from "../Components/DisplayMessage";
import BackgroundContainer from "../Components/BackgroundContainer";
import {
  TextComponent,
  TextInputComponent
} from "../Components/TextComponents";
import { Person, Email, Phone } from "../Components/Icons";
import { GRAY, RED } from "../Constants";
import {
  isEmail,
  isDigitsOnly,
  withBackExit,
  resetNavigationToFirst
} from "../Utils";
import { registerUser } from "../Store/Actions/RegisterActions";

const WIDTH = Dimensions.get("window").width;
const UserIcon = ({ color = GRAY }) => (
  <Person size={25} style={{ backgroundColor: "transparent" }} color={color} />
);
const EmailIcon = ({ color = GRAY }) => (
  <Email size={25} style={{ backgroundColor: "transparent" }} color={color} />
);
const PhoneIcon = ({ color = GRAY }) => (
  <Phone size={25} style={{ backgroundColor: "transparent" }} color={color} />
);

class ProfileInput extends Component {
  static USER_NAME = "user_name";
  static PHONE = "phone";
  static EMAIL = "mail";
  constructor() {
    super();
    this.state = { text: "", isError: false, errorMessage: "" };
  }
  setError = errorMessage => {
    this.setState({ isError: true, errorMessage });
  };
  clearError = () => {
    this.setState({ isError: false, errorMessage: "" });
    this.props.onSuccess(this.state.text);
  };
  validateInput = type => {
    let { text } = this.state;
    switch (type) {
      case ProfileInput.USER_NAME:
        if (!(text && text.length > 0)) this.setError("Enter name");
        else this.clearError();
        break;
      case ProfileInput.EMAIL:
        if (!(text && text.length > 0)) this.setError("Enter email");
        else if (!isEmail(text)) this.setError("Enter valid email");
        else this.clearError();
        break;
      case ProfileInput.PHONE:
        if (!(text && text.length > 0)) this.setError("Enter phone number");
        else if (text.length < 10) this.setError("Enter 10 numbers");
        else if (!isDigitsOnly(text)) this.setError("Enter valid phone number");
        else this.clearError();
        break;
    }
  };
  render() {
    let { isError, errorMessage } = this.state;
    let { placeholder, type, onSuccess } = this.props;
    let {
      profileInputContainer,
      iconContainer,
      input,
      extraStyle,
      inputErrorText
    } = styles;
    let icon = <UserIcon color={iconColor} />;
    let keyboardType = "default";
    let autoCapitalize = "none";
    let maxLength = 128;
    let iconColor = isError ? RED : GRAY;
    switch (type) {
      case ProfileInput.USER_NAME:
        icon = <UserIcon color={iconColor} />;
        keyboardType = "default";
        autoCapitalize = "words";
        break;
      case ProfileInput.EMAIL:
        icon = <EmailIcon color={iconColor} />;
        keyboardType = "email-address";
        autoCapitalize = "none";
        break;
      case ProfileInput.PHONE:
        icon = <PhoneIcon color={iconColor} />;
        keyboardType = "numeric";
        autoCapitalize = "none";
        maxLength = 10;
        break;
    }
    return (
      <View
        style={{
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <View
          style={[
            profileInputContainer,
            {
              borderBottomColor: iconColor,
              borderBottomWidth: 0.5
            }
          ]}
        >
          <View style={iconContainer}>{icon}</View>
          <TextInputComponent
            inputStyle={input}
            maxLength={maxLength}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            multiline={false}
            placeholder={placeholder}
            underlineColorAndroid={"transparent"}
            returnKeyType={"done"}
            onChangeText={text => {
              this.setState({ text });
            }}
            onEndEditing={() => this.validateInput(type)}
          />
        </View>
        {isError ? (
          <TextComponent textStyle={inputErrorText}>
            {errorMessage}
          </TextComponent>
        ) : null}
      </View>
    );
  }
}
// FIXME: configure me with Back To Exit
class Register extends Component {
  state = { name: "", number: "", email: "" };
  register = user => {
    this.props._registerUser(user);
  };
  componentWillReceiveProps(nextProps) {
    let { isSuccess, isError, navigation } = nextProps;
    isSuccess ? resetNavigationToFirst("Home", navigation) : "";
    isError ? DisplayMessage("Connection failed. Retry") : "";
  }
  render() {
    let {
      container,
      imageContainer,
      clickableImageContainer,
      inputContainer
    } = styles;
    let { isLoading } = this.props;
    return (
      <BackgroundContainer style={container}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          scrollEnabled={false}
        >
          <View style={imageContainer}>
            <TouchableOpacity
              pointerEvents="none"
              style={clickableImageContainer}
            />
          </View>
          <View style={inputContainer}>
            <ProfileInput
              ref={ref => (this.nameRef = ref)}
              type={ProfileInput.USER_NAME}
              placeholder={"Fullname"}
              onSuccess={name => this.setState({ name })}
            />
            <ProfileInput
              ref={ref => (this.emailRef = ref)}
              type={ProfileInput.EMAIL}
              placeholder={"Email"}
              onSuccess={email => this.setState({ email })}
            />
            <ProfileInput
              type={ProfileInput.PHONE}
              ref={ref => (this.phoneNumRef = ref)}
              placeholder={"Number"}
              onSuccess={number => this.setState({ number })}
            />
            {isLoading ? (
              <Spinner
                style={{ margin: 20 }}
                isVisible={true}
                size={40}
                type={"Bounce"}
                color={"#ff2a68"}
              />
            ) : (
              <RoundButton
                style={{ margin: 20 }}
                size={40}
                icon={RoundButton.RIGHT}
                onPress={() => {
                  this.nameRef.validateInput(ProfileInput.USER_NAME);
                  this.emailRef.validateInput(ProfileInput.EMAIL);
                  this.phoneNumRef.validateInput(ProfileInput.PHONE);
                  let { name, number, email } = this.state;
                  if (name && number && email)
                    this.register({ name, phone: number, email });
                }}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </BackgroundContainer>
    );
  }
}
const IMAGE_CONTAINER_FLEX = 40;
const INPUT_CONTAINER_FLEX = 100 - IMAGE_CONTAINER_FLEX;
const ICON_FLEX = 15;
const INPUT_FLEX = 100 - ICON_FLEX;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    flex: IMAGE_CONTAINER_FLEX,
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  clickableImageContainer: {
    margin: 30,
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "powderblue"
  },
  inputContainer: {
    flex: INPUT_CONTAINER_FLEX,
    alignItems: "center",
    padding: 30,
    height: 230
  },
  profileInputContainer: {
    flexDirection: "row",
    height: 40,
    borderBottomColor: GRAY,
    borderBottomWidth: 0.5,
    width: WIDTH - 100,
    alignItems: "center"
  },
  iconContainer: {
    flex: ICON_FLEX,
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    flex: INPUT_FLEX,
    height: 40
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
const mapStateToProps = ({ RegisterReducer }) => {
  let { isLoading, isError, isSuccess } = RegisterReducer;
  return {
    isLoading,
    isError,
    isSuccess
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _registerUser: user => {
    dispatch(registerUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
