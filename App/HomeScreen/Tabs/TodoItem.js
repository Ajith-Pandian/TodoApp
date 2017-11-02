import React, { Component, PureComponent } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import moment from "moment";
import { getTimeString } from "../../Utils";
import { TextComponent } from "../../Components/TextComponents";
const SCREEN_WIDTH = Dimensions.get("window").width;
const DIVIDER_WIDTH = 1,
  MARGIN = 10,
  CONTAINER_PADDING = 10;

class TodoItem extends PureComponent {
  state = { descriptionWidth: SCREEN_WIDTH * 0.7 };
  getTimeAndDate = date => {
    date = moment(date);
    let visibleDate = date.format("MMM DD");
    let visibleTime = date.format("hh:mm");
    let meridiem = date.format("A");
    return { visibleDate, visibleTime, meridiem };
  };
  render() {
    let { index, todo, onClick } = this.props;
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
    let { description, dueDate, id, title, createdBy } = todo;
    creatorName = createdBy || "Creator";
    let { visibleDate, visibleTime, meridiem } = this.getTimeAndDate(dueDate);
    let color = "white";
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onClick()}>
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
            <TextComponent textStyle={time}>{visibleTime}</TextComponent>
            <TextComponent textStyle={timeSuffix}>{meridiem}</TextComponent>
            <TextComponent>{visibleDate}</TextComponent>
          </View>
          <View style={divider} />
          <View style={descriptionLayout}>
            <View style={nameAndTime}>
              <TextComponent textStyle={smallFont}>{creatorName}</TextComponent>
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
              {title}
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
