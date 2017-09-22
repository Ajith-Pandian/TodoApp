import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import TodoList from "./TodoList";
import {
  onSearchTermChange,
  onSearchStateChange
} from "../../Store/Actions/SearchActions";
class TabList extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={IC_TODAY}
        style={{
          width: 26,
          height: 26,
          tintColor
        }}
      />
    )
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TodoList />
      </View>
    );
  }
}

export default TabList;
