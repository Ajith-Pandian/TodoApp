import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import Spinner from "react-native-spinkit";
import InputBox from "../Components/InputBox";
import RoundButton from "../Components/RoundButton";
import { TextComponent } from "../Components/TextComponents";
import { withBackExit, resetNavigationToFirst } from "../Utils";
import BackgroundContainer from "../Components/BackgroundContainer";
import ApiHelper from "../ApiHelper";
export default class LoginScreen extends Component {
  state = { isLoading: false };
  static navigationOptions = { header: null };
  render() {
    let { container, itemContainer } = styles;
    let { navigation } = this.props;
    let { isLoading } = this.state;
    return (
      <BackgroundContainer style={container}>
        <KeyboardAvoidingView
          behavior="padding"
          stlye={{ flex: 1 }}
          contentContainerStyle={container}
        >
          <View style={itemContainer}>
            <View>
              <TextComponent
                textStyle={{
                  fontSize: 20,
                  backgroundColor: "transparent"
                }}
              >
                Todo App
              </TextComponent>
            </View>
            <View style={{ alignItems: "center" }}>
              <InputBox
                ref={ref => (this.InputRef = ref)}
                placeholder={"Mobile Number"}
                maxLength={10}
                type={InputBox.MOBILE}
                onSuccess={text => {
                  this.setState({ isLoading: true });
                  ApiHelper.authenticate(text).then(res => {
                    this.setState({ isLoading: false });
                    res.success
                      ? resetNavigationToFirst("Otp", navigation)
                      : console.log("otp send failed");
                  });
                }}
              />
              {isLoading ? (
                <Spinner
                  style={{ margin: 5 }}
                  isVisible={true}
                  size={40}
                  type={"Bounce"}
                  color={"#ff2a68"}
                />
              ) : (
                <RoundButton
                  size={35}
                  icon={RoundButton.RIGHT}
                  onPress={() => {
                    this.InputRef.validateInput(InputBox.MOBILE);
                  }}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </BackgroundContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  itemContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "space-between"
  }
});
