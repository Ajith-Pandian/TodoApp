import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";

import { TextComponent as Text } from "../../../Components/TextComponents";
import { Activity as ActivityIcon } from "../../../Components/Icons";
import { GRAY } from "../../../Constants";
import ActivityItem from "./ActivityItem";
import { fetchActivities } from "../../../Store/Actions/ActivityActions";
import LoadingItem from "../LoadingItem";

const ProfilePic = ({ source }) => {
  let { imageContainer, image } = styles;
  image = image
    ? image
    : "https://i.pinimg.com/736x/a1/de/0e/a1de0e9906773b64adb8646b0c60aacf--beard-logo-long-beards.jpg";
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

const Profile = ({ phoneNum, image, name, navigation }) => {
  let { profileContainer, profileDetails } = styles;

  return (
    <View style={profileContainer}>
      <View style={profileDetails}>
        <ProfilePic source={image} />
        <Text>{name}</Text>
        <Text>{phoneNum}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Register", {
              isEdit: true
            })}
        >
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
    this.state = { offset: 0 };
    this.isCloseToBottom = false;
  }
  onScrollList = event => {
    let { offset } = this.state;
    let { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollOffsetY = contentOffset.y;
    const isScrollingUp = scrollOffsetY < offset;
    const isGonnaReachBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;
    const shouldShowTabBar = isScrollingUp || isGonnaReachBottom;
    this.props.onTabBarVisibilityChange(shouldShowTabBar);
    offset = scrollOffsetY;
    let isCloseToBottom = this.isCloseToBottom;

    isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    this.isCloseToBottom = isCloseToBottom;
    this.setState({ offset });
  };
  componentWillReceiveProps(nextProps) {
    let { isLoading, totalPages, page, _fetchActivities } = nextProps;
    let isCloseToBottom = this.isCloseToBottom;
    if (isCloseToBottom && !isLoading) {
      page++;
      if (page <= totalPages) _fetchActivities(page);
    }
  }
  render() {
    let {
      activities,
      isLoading,
      phoneNum,
      name,
      image,
      screenProps
    } = this.props;

    let { container, seperator } = styles;
    const ProfileItem = (
      <Profile
        phoneNum={phoneNum}
        name={name}
        image={image}
        navigation={screenProps.rootNavigation}
      />
    );
    return (
      <View style={container}>
        {activities && activities.length > 0 ? (
          <FlatList
            data={activities}
            onScroll={e => this.onScrollList(e)}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={() => ProfileItem}
            ItemSeparatorComponent={() => <View style={seperator} />}
            ListFooterComponent={() => {
              return isLoading ? <LoadingItem /> : null;
            }}
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
            {ProfileItem}
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
  let {
    activities,
    page,
    totalPages,
    isLoading,
    isSuccess,
    isError
  } = ActivityReducer;
  let { phoneNum, name, image } = UserReducer;

  return {
    phoneNum,
    name,
    image,
    activities,
    page,
    totalPages,
    isLoading,
    isSuccess,
    isError
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _fetchActivities: page => dispatch(fetchActivities(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
