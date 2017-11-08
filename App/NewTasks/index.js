import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Close } from "../Components/Icons";
import { GRAY, ACCENT_COLOR_1 } from "../Constants";
import BackgroundContainer from "../Components/BackgroundContainer";
import {
  TextComponent,
  TextInputComponent
} from "../Components/TextComponents";
import SwipeDeck from "./SwipeDeck";
import TinderSwiper from "./TinderSwiper";
const WIDTH = Dimensions.get("window").width;

export default TinderSwiper;
class NewTasks extends Component {
  constructor() {
    super();
  }

  render() {
    let { goBack } = this.props.navigation;
    return (
      <BackgroundContainer style={{ flex: 1 }} isTop={true}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={{ alignSelf: "flex-end", margin: 10, padding: 10 }}
          >
            <Close
              size={30}
              style={{ backgroundColor: "transparent" }}
              color={GRAY}
            />
          </TouchableOpacity>
          <View>
            <TextComponent
              textStyle={{
                fontSize: 20,
                textAlign: "left",
                margin: 10,
                marginLeft: 20
              }}
            >
              NewTasks!
            </TextComponent>
            <View
              style={{ width: WIDTH, height: 0.5, backgroundColor: GRAY }}
            />
            <SwipeDeck />
          </View>
        </View>
      </BackgroundContainer>
    );
  }
}
