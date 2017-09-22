import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const GetInButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.getInButton} onPress={() => onPress()}>
      <Text style={styles.text}>GET IN</Text>
    </TouchableOpacity>
  );
};

const styles = {
  getInButton: {
    margin: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a3ff"
  },
  text: {
    color: "white",
    marginLeft: 10,
    marginRight: 10
  }
};

export default GetInButton;
