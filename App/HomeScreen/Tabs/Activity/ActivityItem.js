import React, { Component } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { firstToLower } from "../../../Utils";
import { TextComponent } from "../../../Components/TextComponents";
import { GRAY, ACCENT_COLOR_1 } from "../../../Constants";
const SCREEN_WIDTH = Dimensions.get("window").width;
const DIVIDER_WIDTH = 1,
  MARGIN = 20,
  CONTAINER_PADDING = 10;

const getTypeAndColor = type => {
  let color =
    type === "Accepted" || type === "Completed" ? "green" : ACCENT_COLOR_1;
  type = firstToLower(type);
  return { type, color };
};
const Message = ({ sender, type, title }) => {
  let typeAndColor = getTypeAndColor(type);
  type = typeAndColor.type;
  let color = typeAndColor.color;
  return (
    <TextComponent isLight extStyle={{ color: GRAY }} numberOfLines={3}>
      <TextComponent isLight textStyle={{ color: GRAY }}>
        {sender + " "}
      </TextComponent>
      <TextComponent isLight textStyle={{ color }}>
        {firstToLower(type) + " "}
      </TextComponent>
      <TextComponent isLight textStyle={{ color: "black" }} numberOfLines={3}>
        {title}
      </TextComponent>
    </TextComponent>
  );
};
class TodoItem extends Component {
  state = { descriptionWidth: SCREEN_WIDTH * 0.71 };

  render() {
    let { index, activity } = this.props;
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
    let { sender_name, task_title, choice, message, id } = activity.item;

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
            <Message sender={sender_name} title={task_title} type={choice} />
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

export default TodoItem;
