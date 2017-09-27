import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import NumericInput from "../Components/NumericInput";
import RoundButton from "../Components/RoundButton";
import { withBackExit, resetNavigationToFirst } from "../Utils";
import BackgroundContainer from "../Components/BackgroundContainer";
export default class LoginScreen extends Component {
  static navigationOptions = { header: null };
  render() {
    let { container, input, prefixText, inputContainer } = styles;
    let { navigation } = this.props;
    return (
      <BackgroundContainer style={container}>
        <NumericInput
          ref={ref => (this.InputRef = ref)}
          isOtp={false}
          onSuccess={() => {
            //console.log("called");
            resetNavigationToFirst("Otp", navigation);
          }}
        />
        <RoundButton
          size={35}
          icon={"right"}
          onPress={() => {
            this.InputRef.validateInput();
          }}
        />
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
  }
});
