import React, { Component } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { firstToLower } from "../../../Utils";
import { TextComponent } from "../../../Components/TextComponents";
import { GRAY } from "../../../Constants";
const SCREEN_WIDTH = Dimensions.get("window").width;
const DIVIDER_WIDTH = 1,
  MARGIN = 10,
  CONTAINER_PADDING = 10;

const Message = ({ sender, type, title }) => {
  return (
    <TextComponent textStyle={{ color: GRAY }} numberOfLines={3}>
      <TextComponent textStyle={{ color: GRAY }}>{sender + " "}</TextComponent>
      <TextComponent textStyle={{ color: "green" }}>
        {firstToLower(type) + " "}
      </TextComponent>
      <TextComponent textStyle={{ color: "black" }} numberOfLines={3}>
        Lorem ipsum dolor sit amet, quo velit graece impetus cu. Vim ea iudico
        ridens omnium, numquam dissentias te vel. Movet labore albucius has no,
        sea agam aliquam referrentur te, an eum gloriatur tincidunt. Eu duo
        impetus assueverit repudiandae, dicam fierent dignissim sed te. Omnis
        dicta eos te.
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
    console.log(activity.item);
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
  imageLayout: {
    alignItems: "flex-end",
    marginRight: MARGIN,
    marginLeft: MARGIN
  },
  image: {
    width: 70,
    height: 70,
    backgroundColor: "powderblue",
    borderRadius: 35
  },
  descriptionLayout: {
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default TodoItem;
