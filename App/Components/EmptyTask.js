import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { TextComponent } from "./TextComponents";
import { RADICAL_RED, WILD_SAND } from "../Constants";

export default class EmptyTask extends Component {
  constructor() {
    super();
  }
  render() {
    let { onCreateTaskClick } = this.props;
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: WILD_SAND
        }}
      >
        <View
          style={{
            borderRadius: 40,
            width: 80,
            height: 80,
            padding: 5,
            backgroundColor: "#FFF",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={require("../Resources/empty_tasks_icon.png")}
            style={{
              alignSelf: "center",
              width: 40,
              height: 30
            }}
            resizeMode="cover"
          />
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <TextComponent
            isLight
            textStyle={{
              fontSize: 22,
              margin: 10
            }}
          >{`You've got no tasks !!`}</TextComponent>
          <TextComponent
            isLight
            textStyle={{
              fontSize: 16,
              textAlign: "center",
              width: "70%"
            }}
          >
            So sit back and relax, or {"\n"}give yourself some more todo
          </TextComponent>
        </View>
        <TouchableOpacity
          onPress={() => onCreateTaskClick()}
          activeOpacity={0.7}
          style={{
            backgroundColor: RADICAL_RED,
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 25,
            paddingLeft: 25,
            margin: 10,
            borderRadius: 2,
            overflow: "hidden"
          }}
        >
          <TextComponent textStyle={{ color: "#FFF" }}>
            Create Task
          </TextComponent>
        </TouchableOpacity>
      </View>
    );
  }
}
