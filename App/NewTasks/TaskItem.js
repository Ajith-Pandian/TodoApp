import React, { Component } from "react";
import { View, Dimensions, StyleSheet, Animated } from "react-native";
import moment from "moment";
import { TextComponent } from "../Components/TextComponents";
import { GRAY } from "../Constants";

const WIDTH = Dimensions.get("window").width;

export class Card extends Component {
  render() {
    let {
      animatedCardContainerStyles,
      animatedCardStyles,
      panResponder,
      task
    } = this.props;
    let {
      id,
      title,
      description,
      createdBy,
      assignedTo,
      isAccepted,
      isCompleted,
      isDeleted,
      dueDate,
      createdDate,
      assignedDate,
      completedDate,
      attachment
    } = task;
    dueDate = moment(dueDate);
    let visibleDate = dueDate.format("MMM DD");
    let visibleTime = dueDate.format("hh:mm A");
    let {
      cardResizeContainer,
      cardContainer,
      card,
      contentContainer,
      titleText,
      horizontalLine,
      descriptionText,
      authorText
    } = styles;
    return (
      <View style={cardResizeContainer}>
        <Animated.View style={[cardContainer, animatedCardContainerStyles]}>
          <Animated.View style={[card, animatedCardStyles]} {...panResponder}>
            <View style={contentContainer}>
              <View style={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <TextComponent textStyle={{ margin: 2 }}>
                    {visibleDate}
                  </TextComponent>
                  <TextComponent textStyle={{ margin: 2 }}>
                    {visibleTime}
                  </TextComponent>
                </View>
              </View>
              <TextComponent textStyle={titleText} numberOfLines={1}>
                {title}
              </TextComponent>
              <View style={horizontalLine} />
              <TextComponent numberOfLines={7} textStyle={descriptionText}>
                {description}
              </TextComponent>
              <TextComponent textStyle={authorText}>
                {`-${createdBy}`}
              </TextComponent>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}
const MARGIN = 20;
const styles = StyleSheet.create({
  cardResizeContainer: {
    flex: 1,
    position: "absolute",
    top: 200,
    left: 40,
    bottom: 40,
    right: 40
  },
  cardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "flex-end"
  },
  card: {
    position: "relative",
    flex: 1,
    overflow: "hidden",
    shadowRadius: 2,
    shadowColor: "#BBB",
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  contentContainer: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#e3e3e3",
    backgroundColor: "#efefef",
    alignItems: "center",
    paddingTop: MARGIN,
    paddingBottom: MARGIN
  },
  titleText: {
    margin: 2,
    marginLeft: MARGIN,
    marginRight: MARGIN,
    fontSize: 18,
    textAlign: "center"
  },
  horizontalLine: {
    width: "100%",
    height: 0.8,
    backgroundColor: "#bababa",
    marginTop: MARGIN,
    marginBottom: MARGIN
  },
  descriptionText: { marginLeft: MARGIN, marginRight: MARGIN },
  authorText: {
    position: "absolute",
    right: MARGIN,
    bottom: MARGIN,
    borderBottomWidth: 0.3,
    padding: 2
  }
});
