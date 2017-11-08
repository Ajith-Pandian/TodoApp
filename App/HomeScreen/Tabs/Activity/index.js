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

const Profile = ({ phoneNum }) => {
  let { profileContainer, profileDetails } = styles;

  return (
    <View style={profileContainer}>
      <View style={profileDetails}>
        <ProfilePic source="https://i.pinimg.com/736x/a1/de/0e/a1de0e9906773b64adb8646b0c60aacf--beard-logo-long-beards.jpg" />
        <Text>Natasha</Text>
        <Text>{phoneNum}</Text>
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
    let { activities, phoneNum } = this.props;
    let { container, seperator } = styles;
    return (
      <View style={container}>
        {activities && activities.length > 0 ? (
          <FlatList
            data={activities}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={() => <Profile phoneNum={phoneNum} />}
            ItemSeparatorComponent={() => <View style={seperator} />}
            renderItem={(item, index) => {
              let isLast = activities.length - 1 === index;
              return (
                <ActivityItem
                  key={index}
                  index={index}
                  isLast={isLast}
                  activity={item}
                />
              );
            }}
          />
        ) : (
          <View>
            <Profile phoneNum={phoneNum} />
            <View
              style={{
                height: 250,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>No Activities</Text>
            </View>
          </View>
        )}
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

const mapStateToProps = ({ ActivityReducer, UserReducer }) => {
  let { activities, isLoading, isSuccess, isError } = ActivityReducer;
  let { phoneNum } = UserReducer;

  return {
    phoneNum,
    activities,
    isLoading,
    isSuccess,
    isError
  };
};

export default connect(mapStateToProps)(Activity);
