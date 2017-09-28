import React, { Component } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { getTimeString } from "../../Utils";
import { TextComponent } from "../../Components/TextComponents";
const SCREEN_WIDTH = Dimensions.get("window").width;
const DIVIDER_WIDTH = 1,
  MARGIN = 10,
  CONTAINER_PADDING = 10;

class TodoItem extends Component {
  state = { descriptionWidth: SCREEN_WIDTH * 0.7 };

  render() {
    let { index, todo } = this.props;
    let {
      container,
      dateLayout,
      time,
      timeSuffix,
      divider,
      descriptionLayout,
      nameAndTime,
      smallFont,
      descriptionText
    } = styles;
    let { assignor, description, completionTime, id, title } = todo;
    let color = "white";
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <View style={container}>
          <View
            style={dateLayout}
            onLayout={event => {
              const { width } = event.nativeEvent.layout;
              let descriptionWidth =
                SCREEN_WIDTH -
                (4 * MARGIN + 2 * CONTAINER_PADDING + DIVIDER_WIDTH + width);
              this.setState({ descriptionWidth });
            }}
          >
            <TextComponent textStyle={time}>9:25</TextComponent>
            <TextComponent textStyle={timeSuffix}>AM</TextComponent>
            <TextComponent>Aug 07</TextComponent>
          </View>
          <View style={divider} />
          <View style={descriptionLayout}>
            <View style={nameAndTime}>
              <TextComponent textStyle={smallFont}>John</TextComponent>
              <TextComponent textStyle={smallFont}>15 mins</TextComponent>
            </View>
            <TextComponent
              numberOfLines={3}
              textStyle={[
                descriptionText,
                {
                  width: this.state.descriptionWidth
                }
              ]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </TextComponent>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

function getRandomColor() {
  return (
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")"
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: SCREEN_WIDTH,
    marginBottom: 2,
    padding: CONTAINER_PADDING,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  dateLayout: {
    alignItems: "flex-end",
    marginRight: MARGIN,
    marginLeft: MARGIN
  },
  time: { fontSize: 20, fontWeight: "500" },
  timeSuffix: {},
  divider: {
    backgroundColor: "#c2c2c2",
    width: DIVIDER_WIDTH,
    height: 70
  },
  descriptionLayout: { marginRight: MARGIN, marginLeft: MARGIN },
  nameAndTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  smallFont: { fontSize: 12 },
  descriptionText: { fontWeight: "bold" }
});

export default TodoItem;
