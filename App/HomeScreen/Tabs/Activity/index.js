import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { TextComponent as Text } from "../../../Components/TextComponents";
import { Activity as ActivityIcon } from "../../../Components/Icons";
import { GRAY } from "../../../Constants";
import ActivityItem from "./ActivityItem";
import { connect } from "react-redux";

const ProfilePic = ({ source }) => {
  let { imageContainer, image } = styles;
  return (
    <View style={imageContainer}>
      <Image style={image} source={{ uri: source }} />
    </View>
  );
};
const TaskDetails = () => {
  let { taskDetailsContainer, taskDetails, taskSeperator } = styles;
  return (
    <View style={taskDetailsContainer}>
      <View style={taskDetails}>
        <Text>12</Text>
        <Text>Tasks</Text>
      </View>
      <View style={taskSeperator} />
      <View style={taskDetails}>
        <Text>12</Text>
        <Text>Tasks</Text>
      </View>
      <View style={taskSeperator} />

      <View style={taskDetails}>
        <Text>12</Text>
        <Text>Tasks</Text>
      </View>
    </View>
  );
};

const Profile = () => {
  let { profileContainer, profileDetails } = styles;

  return (
    <View style={profileContainer}>
      <View style={profileDetails}>
        <ProfilePic source="https://i.pinimg.com/736x/a1/de/0e/a1de0e9906773b64adb8646b0c60aacf--beard-logo-long-beards.jpg" />
        <Text>Natasha</Text>
        <Text>123456789</Text>
        <TouchableOpacity>
          <Text textStyle={{ fontWeight: "bold" }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <TaskDetails />
    </View>
  );
};
class Activity extends Component {
  constructor() {
    super();
  }
  render() {
    let { todos, searchTerm, searchState } = this.props;
    let { container, seperator } = styles;
    return (
      <View style={container}>
        <FlatList
          data={todos}
          keyExtractor={(item, index) => index}
          ListHeaderComponent={() => <Profile />}
          ItemSeparatorComponent={() => <View style={seperator} />}
          renderItem={(item, index) => (
            <ActivityItem
              key={index}
              index={index}
              isLast={isLast}
              todo={item}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE"
  },
  profileContainer: {
    height: 250,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY
  },
  profileDetails: {
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    height: 101,
    width: 101,
    borderRadius: 50,
    backgroundColor: GRAY
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  taskDetailsContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  taskDetails: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center"
  },
  taskSeperator: {
    height: 30,
    width: 1,
    backgroundColor: GRAY
  }
});

Activity.navigationOptions = props => {
  let { navigation, screenProps } = props;
  let { tabBarVisible } = screenProps;
  return {
    tabBarIcon: ({ tintColor }) => (
      <ActivityIcon
        size={25}
        style={{ backgroundColor: "transparent" }}
        color={tintColor}
      />
    ),
    tabBarVisible
  };
};

const mapStateToProps = ({ TodoReducer, SearchReducer }) => {
  let { todos } = TodoReducer;
  let { searchTerm, searchState } = SearchReducer;

  return {
    todos,
    searchTerm,
    searchState
  };
};

export default connect(mapStateToProps)(Activity);
