import React, { Component, PureComponent } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import moment from "moment";

import { getTimeString } from "../../Utils";
import { TextComponent } from "../../Components/TextComponents";
import { GRAY, SILVER } from "../../Constants";
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
    let { index, todo, onClick, name } = this.props;
    let {
      clickableContainer,
      container,
      dateLayout,
      time,
      timeSuffix,
      divider,
      descriptionLayout,
      nameAndTime,
      smallFont,
      ownBadge,
      ownBadgeText,
      blackFont,
      descriptionText
    } = styles;
    let { description, dueDate, id, title, sender, reminderTime } = todo;
    const isOwn = sender === name;
    creatorName = isOwn ? "Myself" : sender;
    let { visibleDate, visibleTime, meridiem } = this.getTimeAndDate(dueDate);
    let color = "white";
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onClick()}
        style={clickableContainer}
      >
        <View style={container}>
          <View
            style={dateLayout}
            onLayout={event => {
              const { width } = event.nativeEvent.layout;
              let descriptionWidth =
                SCREEN_WIDTH -
                (4 * MARGIN + 2 * CONTAINER_PADDING + DIVIDER_WIDTH + width);
              //  this.setState({ descriptionWidth });
            }}
          >
            <TextComponent textStyle={time}>{visibleTime}</TextComponent>
            <TextComponent isExtraLight textStyle={blackFont}>
              {meridiem}
            </TextComponent>
            <TextComponent isExtraLight textStyle={blackFont}>
              {visibleDate}
            </TextComponent>
          </View>
          <View style={divider} />
          <View style={descriptionLayout}>
            <View style={nameAndTime}>
              <View style={isOwn ? ownBadge : null}>
                <TextComponent
                  isExtraLight
                  textStyle={isOwn ? ownBadgeText : smallFont}
                >
                  {creatorName}
                </TextComponent>
              </View>
              <TextComponent isExtraLight textStyle={smallFont}>
                {reminderTime}
              </TextComponent>
            </View>
            <TextComponent
              numberOfLines={3}
              isLight
              textStyle={[
                descriptionText,
                { width: this.state.descriptionWidth }
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

const styles = StyleSheet.create({
  clickableContainer: {
    height: 100,
    width: SCREEN_WIDTH,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    justifyContent: "center"
  },
  container: {
    margin: CONTAINER_PADDING,
    flexDirection: "row"
  },
  dateLayout: {
    alignItems: "flex-end",
    marginRight: MARGIN,
    marginLeft: MARGIN
  },
  time: {
    fontSize: 18,
    color: "black"
  },
  blackFont: {
    color: "black"
  },
  divider: {
    backgroundColor: "#cccccc",
    width: DIVIDER_WIDTH,
    height: "100%"
  },
  descriptionLayout: {
    marginRight: MARGIN,
    marginLeft: MARGIN
  },
  nameAndTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  smallFont: {
    fontSize: 12,
    color: GRAY
  },
  ownBadge: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: SILVER,
    borderRadius: 10
  },
  ownBadgeText: {
    fontSize: 12,
    color: "black"
  },
  descriptionText: {
    marginVertical: 5,
    color: "black"
  }
});

const mapStateToProps = ({ UserReducer }) => {
  let { name } = UserReducer;
  return {
    name
  };
};

export default connect(mapStateToProps)(TodoItem);
