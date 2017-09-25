import React from "react";
import { View, Text, Image } from "react-native";

const Profile = () => {
  return (
    <View>
      <Text>Im profile</Text>
    </View>
  );
};

Profile.navigationOptions = props => {
  let { navigation, screenProps } = props;
  let { tabBarVisible } = screenProps;
  return {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../Resources/profile.png")}
        style={{
          width: 26,
          height: 26,
          tintColor
        }}
      />
    ),
    tabBarVisible
  };
};
export default Profile;
