import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import InputBox from "../Components/InputBox";
import RoundButton from "../Components/RoundButton";
import { TextComponent } from "../Components/TextComponents";
import { withBackExit, resetNavigationToFirst } from "../Utils";
import BackgroundContainer from "../Components/BackgroundContainer";
export default class LoginScreen extends Component {
  static navigationOptions = { header: null };
  render() {
    let { container, itemContainer } = styles;
    let { navigation } = this.props;
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
                style={{
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
                onSuccess={() => {
                  resetNavigationToFirst("Otp", navigation);
                }}
              />
              <RoundButton
                size={35}
                icon={"right"}
                onPress={() => {
                  this.InputRef.validateInput(InputBox.MOBILE);
                }}
              />
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
