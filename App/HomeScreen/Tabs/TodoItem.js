import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { getTimeString } from "../../Utils";
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
const TodoItem = ({ index, todo }) => {
  let { card, shadow, container, leftDecorator, textLayout } = styles;
  let { assignor, description, completionTime, id, title } = todo;
  let color = "white";
  return (
    <View style={[container, { marginBottom: isLast ? 2 * MARGIN : MARGIN }]}>
      <TouchableOpacity activeOpacity={0.8} style={[card]}>
        {/*<View style={[{ backgroundColor: color }, leftDecorator]} />*/}
        <View style={textLayout}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
          <Text>{description}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ color, fontSize: 12 }}>{assignor}</Text>
            <Text style={{ fontSize: 12 }}>
              {completionTime.format("hh:mm a")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const width = Dimensions.get("window").width;
const MARGIN = 7;
const CARD_WIDTH = width - 2 * MARGIN;
const styles = StyleSheet.create({
  container: {
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginTop: MARGIN,
    height: 100,
    width: CARD_WIDTH
  },
  card: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white"
  },
  shadow: {
    borderWidth: 0,
    borderRadius: 10,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    shadowColor: "#161616",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2
  },
  leftDecorator: {
    position: "absolute",
    left: 0,
    height: 100,
    width: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  textLayout: {
    height: 70,
    width: CARD_WIDTH - 30,
    marginLeft: 20,
    justifyContent: "space-between"
  }
});

export default TodoItem;
