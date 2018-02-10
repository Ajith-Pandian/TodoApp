import React, { Component } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { firstToLower } from "../../../Utils";
import { TextComponent } from "../../../Components/TextComponents";
import { GRAY, BLACK, GREEN, RADICAL_RED } from "../../../Constants";
const SCREEN_WIDTH = Dimensions.get("window").width;
const DIVIDER_WIDTH = 1,
  MARGIN = 20,
  CONTAINER_PADDING = 10;
const types = [
  "Accepted",
  "Rejected",
  "Assigned",
  "Assigned by",
  "Assigned to",
  "Completed",
  "Not completed"
];
const visibleTaskTypes = [
  "accepted",
  "rejected",
  "assigned",
  "assigned by",
  "assigned to",
  "completed",
  "not completed"
];
const selfVisibleTaskTypes = ["assigned", "completed by", "not completed by"];
const getTypeAndColor = type => {
  let color = type === "Accepted" || type === "Completed" ? GREEN : RADICAL_RED;
  type = visibleTaskTypes[types.findIndex(taskType => taskType === type)];
  return { type, color };
};
const Message = ({
  sender,
  receiver,
  type,
  title,
  isSelf,
  isSent,
  isReceived
}) => {
  let typeAndColor = getTypeAndColor(type);
  type = typeAndColor.type;
  let color = typeAndColor.color;
  const isAssign =
    type.split(" ").length != 1 && type.split(" ")[0] === "assigned";
  return (
    <TextComponent isLight numberOfLines={3}>
      <TextComponent isLight textStyle={{ color: BLACK }} numberOfLines={3}>
        {title + " "}
      </TextComponent>
      <TextComponent isLight textStyle={{ color }}>
        {type + " "}
      </TextComponent>
      <TextComponent isLight textStyle={{ color: GRAY }}>
        {`${!isAssign ? "by" : ""} ${
          isSelf ? "you" : isSent ? receiver : "you"
        }`}
      </TextComponent>
    </TextComponent>
  );
};
class ActivityItem extends Component {
  state = { descriptionWidth: SCREEN_WIDTH * 0.71 };

  render() {
    let { activity, isSent, isReceived } = this.props;
    let {
      container,
      imageLayout,
      image,
      time,
      timeSuffix,
      divider,
      descriptionLayout,
      nameAndTime,
      smallFont,
      descriptionText
    } = styles;
    let {
      id,
      sender_name,
      receiver_name,
      task_title,
      choice,
      message,
      isSelf
    } = activity.item;
    let { descriptionWidth } = this.state;
    let color = "white";
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <View style={container}>
          <View
            style={imageLayout}
            onLayout={event => {
              const { width } = event.nativeEvent.layout;
              let descriptionWidth =
                SCREEN_WIDTH -
                (4 * MARGIN + 2 * CONTAINER_PADDING + DIVIDER_WIDTH + width);
              this.setState({ descriptionWidth });
            }}
          >
            <View style={image} />
          </View>
          <View style={[descriptionLayout, { width: descriptionWidth }]}>
            <Message
              sender={sender_name}
              receiver={receiver_name}
              isSent={isSent}
              isReceived={isReceived}
              title={task_title}
              type={choice}
              isSelf={isSelf}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const IMAGE_SIZE = 50;
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: SCREEN_WIDTH,
    marginBottom: 2,
    padding: CONTAINER_PADDING,
    flexDirection: "row",
    alignItems: "center"
  },
  imageLayout: {
    marginRight: MARGIN,
    marginLeft: MARGIN
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: "powderblue",
    borderRadius: IMAGE_SIZE / 2
  },
  descriptionLayout: {
    height: 70,
    justifyContent: "center"
  }
});

export default ActivityItem;
