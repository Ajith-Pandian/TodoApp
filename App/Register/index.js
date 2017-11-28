import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import ImagePicker from "react-native-image-picker";

import SimpleTabBar from "../Components/SimpleTabBar";
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
import { updateProfile } from "../Store/Actions/UserActions";

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
  constructor(props) {
    super(props);
    this.state = {
      text: props.text ? props.text : "",
      isError: false,
      errorMessage: ""
    };
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
    let { isError, errorMessage, text } = this.state;
    let { placeholder, type, onSuccess } = this.props;
    const editable = type === ProfileInput.PHONE ? !text : true;
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
        maxLength = 60;
        break;
      case ProfileInput.EMAIL:
        icon = <EmailIcon color={iconColor} />;
        keyboardType = "email-address";
        autoCapitalize = "none";
        maxLength = 40;
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
            value={text}
            editable={editable}
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
  constructor(props) {
    super(props);
    let { phoneNum, email, name, image, navigation } = props;
    let isEdit = navigation.state.params && navigation.state.params.isEdit;
    let emptyState = {
      name: "",
      number: phoneNum,
      email: "",
      image: "",
      isEdit,
      isImageChanged: false
    };
    let editState = {
      name,
      number: phoneNum.toString(),
      email,
      image: { uri: image, name: Math.round(new Date().getTime() / 1000) },
      isEdit,
      isImageChanged: false
    };
    this.state = isEdit ? editState : emptyState;
  }

  register = user => {
    let { isEdit, isImageChanged } = this.state;
    let { _updateProfile, _registerUser } = this.props;
    if (isEdit) {
      user.image = isImageChanged ? user.image : undefined;
      _updateProfile(user);
    } else {
      _registerUser(user);
    }
  };
  componentWillReceiveProps(nextProps) {
    let {
      isSuccess,
      isError,
      updateIsError,
      updateIsSuccess,
      navigation
    } = nextProps;
    let { isEdit } = this.state;
    if (isEdit) {
      updateIsSuccess ? navigation.goBack() : "";
      updateIsError ? DisplayMessage("Connection failed. Retry") : "";
    } else {
      isSuccess ? resetNavigationToFirst("Home", navigation) : "";
      isError ? DisplayMessage("Connection failed. Retry") : "";
    }
  }

  getImage = () => {
    let options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let { uri, fileName: name } = response;
        let image = {
          name,
          uri
        };
        isImageChanged = true;
        this.setState({ image, isImageChanged });
      }
    });
  };

  validateAndRegister = () => {
    let { name, number, email, image } = this.state;
    if (name && number && email) {
      let user = { name, phone: number, email };
      if (image) {
        let { uri, name } = image;
        user.image = {
          uri,
          type: "image/jpeg",
          name
        };
      }
      this.register(user);
    } else {
      this.nameRef.validateInput(ProfileInput.USER_NAME);
      this.emailRef.validateInput(ProfileInput.EMAIL);
      this.phoneNumRef.validateInput(ProfileInput.PHONE);
    }
  };

  render() {
    let {
      container,
      imageContainer,
      clickableImageContainer,
      inputContainer
    } = styles;
    let { isLoading, updateIsLoading, navigation } = this.props;
    let { image, number, name, email, isEdit } = this.state;
    let shouldShowLoader = isEdit ? updateIsLoading : isLoading;
    const tabBar = isEdit ? (
      <SimpleTabBar onBackPress={() => navigation.goBack()} />
    ) : (
      <SimpleTabBar />
    );

    return (
      <BackgroundContainer style={container}>
        {tabBar}
        <KeyboardAwareScrollView
          extraHeight={50}
          enableResetScrollToCoords={false}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
        >
          <View style={imageContainer}>
            <TouchableOpacity
              pointerEvents="none"
              style={[
                clickableImageContainer,
                { margin: 30, backgroundColor: "powderblue" }
              ]}
              onPress={() => this.getImage()}
            >
              {image ? (
                <Image
                  source={{
                    uri: image.uri
                  }}
                  style={styles.clickableImageContainer}
                />
              ) : null}
            </TouchableOpacity>
          </View>
          <View style={inputContainer}>
            <ProfileInput
              ref={ref => (this.nameRef = ref)}
              text={name}
              type={ProfileInput.USER_NAME}
              placeholder={"Fullname"}
              onSuccess={name => this.setState({ name })}
            />
            <ProfileInput
              ref={ref => (this.emailRef = ref)}
              text={email}
              type={ProfileInput.EMAIL}
              placeholder={"Email"}
              onSuccess={email => this.setState({ email })}
            />
            <ProfileInput
              type={ProfileInput.PHONE}
              text={number}
              ref={ref => (this.phoneNumRef = ref)}
              placeholder={"Number"}
              onSuccess={number => this.setState({ number })}
            />
            {shouldShowLoader ? (
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
                size={50}
                padding={20}
                icon={RoundButton.RIGHT}
                onPress={() => this.validateAndRegister()}
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
const IMAGE_SIZE = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    flex: IMAGE_CONTAINER_FLEX,
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  clickableImageContainer: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2
  },
  inputContainer: {
    flex: INPUT_CONTAINER_FLEX,
    alignItems: "center",
    height: 230
  },
  profileInputContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
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
const mapStateToProps = ({ RegisterReducer, UserReducer }) => {
  let { isLoading, isError, isSuccess } = RegisterReducer;
  let {
    phoneNum,
    email,
    name,
    image,
    isLoading: updateIsLoading,
    isError: updateIsError,
    isSuccess: updateIsSuccess
  } = UserReducer;
  return {
    phoneNum,
    email,
    name,
    image,
    isLoading,
    isError,
    isSuccess,
    updateIsLoading,
    updateIsError,
    updateIsSuccess
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _registerUser: user => {
    dispatch(registerUser(user));
  },
  _updateProfile: user => {
    dispatch(updateProfile(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
