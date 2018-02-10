import React, { Component, PureComponent } from "react";
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
class Activity extends PureComponent {
  onEndReached = () => {
    let { isLoading, totalPages, page, _fetchActivities } = this.props;
    if (!this.onEndReachedCalledDuringMomentum) {
      page++;
      console.log("called");
      _fetchActivities(page);
      // if (page <= totalPages) {
      //   isLoading
      //     ? this.flatList.scrollToEnd({
      //         animated: true
      //       })
      //     : _fetchActivities(page);
      // }
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  render() {
    let {
      activities,
      isLoading,
      userId,
      phoneNum,
      name,
      image,
      screenProps
    } = this.props;

    let { container, seperator } = styles;

    //Filter by send ||receive
    const userIdStr = userId.toString();
    // const filteredActivities = activities.filter(
    //   ({ isSelf, sender_id, receiver_id, choice }) =>
    //     isSelf ||
    //     (receiver_id === userIdStr && choice === "Assigned to") ||
    //     (sender_id === userIdStr && choice === "Assigned by")
    // );
    // activities = filteredActivities;
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
            ref={ref => (this.flatList = ref)}
            data={activities}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={() => ProfileItem}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            onEndReached={() => this.onEndReached()}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={seperator} />}
            ListFooterComponent={() => {
              return isLoading ? <LoadingItem /> : null;
            }}
            renderItem={(activity, index) => {
              let { sender_id, receiver_id, isSelf } = activity.item;
              const isSent = userIdStr === sender_id;
              const isReceived = userIdStr === receiver_id;
              return (
                <ActivityItem
                  key={index}
                  isSent={isSent}
                  isReceived={isReceived}
                  activity={activity}
                />
              );
            }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>{ProfileItem}</View>
            <View
              style={{
                flex: 1,
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
  let { phoneNum, name, image, id: userId } = UserReducer;

  return {
    userId,
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
