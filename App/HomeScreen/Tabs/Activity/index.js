import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";

import { TextComponent } from "../../../Components/TextComponents";
import { Activity as ActivityIcon } from "../../../Components/Icons";
import { RADICAL_RED, GRAY, BLACK, WILD_SAND } from "../../../Constants";
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
const Task = ({ count, name }) => {
  let { taskDetails } = styles;
  return (
    <View style={taskDetails}>
      <TextComponent textStyle={{ fontSize: 17 }}>{count}</TextComponent>
      <TextComponent isLight>{name}</TextComponent>
    </View>
  );
};
const TaskDetails = () => {
  let { taskDetailsContainer, taskDetails, taskSeperator } = styles;
  return (
    <View style={taskDetailsContainer}>
      <Task count={220} name={"Tasks"} />
      <View style={taskSeperator} />
      <Task count={101} name={"Completed"} />
      <View style={taskSeperator} />
      <Task count={101} name={"Assigned"} />
    </View>
  );
};

const Profile = ({ phoneNum, image, name, navigation }) => {
  let { profileContainer, profileDetails } = styles;
  return (
    <View style={profileContainer}>
      <View style={profileDetails}>
        <ProfilePic source={image} />
        <View
          style={{
            margin: 5,
            alignItems: "center"
          }}
        >
          <TextComponent
            isLight
            textStyle={{
              color: GRAY
            }}
          >
            {name}
          </TextComponent>
          <TextComponent
            isLight
            textStyle={{
              color: GRAY
            }}
          >
            {phoneNum}
          </TextComponent>
        </View>
        <TouchableOpacity
          style={{ marginTop: 2, marginBottom: 2 }}
          onPress={() =>
            navigation.navigate("Register", {
              isEdit: true
            })
          }
        >
          <TextComponent isLight textStyle={{ color: BLACK }}>
            Edit Profile
          </TextComponent>
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
              {isLoading ? (
                <Spinner
                  style={{ margin: 5 }}
                  isVisible={true}
                  size={50}
                  type={"Bounce"}
                  color={RADICAL_RED}
                />
              ) : (
                <TextComponent>No Activities</TextComponent>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WILD_SAND
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE"
  },
  profileContainer: {
    height: 270,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY
  },
  profileDetails: {
    marginTop: 10,
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
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  taskDetails: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center"
  },
  taskSeperator: {
    height: 45,
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
