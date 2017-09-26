import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import NumericInput from "../Components/NumericInput";
import GetInButton from "../Components/GetInButton";
import { withBackExit, resetNavigationToFirst } from "../Utils";
import BackgroundContainer from "../Components/BackgroundContainer";

class OtpScreen extends Component {
  render() {
    let { container, input, prefixText, inputContainer } = styles;
    let { navigation } = this.props;
    return (
      <BackgroundContainer style={container}>
        <NumericInput
          ref={ref => (this.InputRef = ref)}
          isOtp={true}
          onSuccess={() => {
            //console.log("called");
            resetNavigationToFirst("Home", navigation);
          }}
        />
        <GetInButton
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
    paddingTop: StatusBar.currentHeight,
  }
});

export default withBackExit(OtpScreen, { header: null });
