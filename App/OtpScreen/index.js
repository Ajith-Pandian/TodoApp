import React, { Component } from "react";
import { View, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import InputBox from "../Components/InputBox";
import RoundButton from "../Components/RoundButton";
import { TextComponent } from "../Components/TextComponents";
import { withBackExit, resetNavigationToFirst } from "../Utils";
import BackgroundContainer from "../Components/BackgroundContainer";

class OtpScreen extends Component {
  render() {
    let { container, input, prefixText, inputContainer } = styles;
    let { navigation } = this.props;
    return (
      <BackgroundContainer style={container}>
        <View
          style={{
            height: 400,
            position: "absolute",
            width: "80%",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View>
            <TextComponent
              textStyle={{
                textAlign: "center",
                fontSize: 25
              }}
            >
              One Time Password
            </TextComponent>
            <TextComponent textStyle={{ textAlign: "center", fontSize: 16 }}>
              Please enter the code sent to 123456789
            </TextComponent>
          </View>
          <View
            style={{
              alignItems: "center"
            }}
          >
            <InputBox
              ref={ref => (this.InputRef = ref)}
              placeholder={"Enter Otp"}
              autoFocus={true}
              maxLength={6}
              widthPercentage={60}
              type={InputBox.OTP}
              onSuccess={() => {
                resetNavigationToFirst("Home", navigation);
              }}
            />
            <RoundButton
              size={35}
              icon={RoundButton.RIGHT}
              onPress={() => {
                this.InputRef.validateInput(InputBox.OTP);
              }}
            />
          </View>
          <View>
            <TextComponent textStyle={{ textAlign: "center" }}>
              {"Didn't get OTP?"}
            </TextComponent>
            <TouchableOpacity>
              <TextComponent textStyle={{ textAlign: "center" }}>
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
  }
});

export default withBackExit(OtpScreen, { header: null });
