import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TextInputComponent } from "./TextComponents";
const SearchBar = ({ onChangeText, onDone }) => {
  return (
    <View style={styles.container}>
      <TextInputComponent
        multiline={false}
        placeholder={"Search"}
        underlineColorAndroid={"transparent"}
        returnKeyType={"done"}
        onChangeText={text => onChangeText(text)}
        onEndEditing={() => onDone()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 4,
    height: 40,
    margin: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 2,
    borderWidth: 0.5,
    justifyContent: "center"
  }
});

export default SearchBar;
