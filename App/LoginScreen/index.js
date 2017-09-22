import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import NumericInput from "../Components/NumericInput";
import GetInButton from "../Components/GetInButton";
import { withBackExit, resetNavigationToFirst } from "../Utils";

export default class LoginScreen extends Component {
  static navigationOptions = { header: null };
  render() {
    let { container, input, prefixText, inputContainer } = styles;
    let { navigation } = this.props;
    return (
      <View style={container}>
        <NumericInput
          ref={ref => (this.InputRef = ref)}
          isOtp={false}
          onSuccess={() => {
            //console.log("called");
            resetNavigationToFirst("Otp", navigation);
          }}
        />
        <GetInButton
          onPress={() => {
            this.InputRef.validateInput();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "powderblue"
  }
});
