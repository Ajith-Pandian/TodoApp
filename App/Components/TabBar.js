import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
import MenuButton from "./MenuButton";
import AddButton from "./AddButton";
import {
  onSearchTermChange,
  onSearchStateChange
} from "../Store/Actions/SearchActions";
import { connect } from "react-redux";
import { APP_COLOR, ACCENT_COLOR } from "../Constants";
const SEARCH_ICON = require("../Resources/search.png");
const CLOSE_ICON = require("../Resources/close.png");
const WIDTH = Dimensions.get("window").width;

class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      onNavPress,
      onChangeText,
      _onSearchStateChange,
      _onSearchTermChange,
      searchState
    } = this.props;
    let { container } = styles;
    this.timeout = null;
    let titleComp = (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <MenuButton onPress={() => onNavPress()} />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: "500",
            color: "white"
          }}
        >
          Todo App
        </Text>
      </View>
    );
    let searchComp = (
      <View style={{ margin: 10 }}>
        <TextInput
          multiline={false}
          placeholder={"Search"}
          autoFocus={true}
          style={{ width: WIDTH - 65 }}
          onBlur={() => {
            /*this.setState({ isSearch: !isSearch })*/
          }}
          onChangeText={text => {
            if (text && text.length > 0) {
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                _onSearchTermChange(text);
              }, 700);
            } else {
              clearTimeout(this.timeout);
              _onSearchTermChange(text);
            }

            //onChangeText(text);
          }}
        />
      </View>
    );
    let optionsComp = (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            let newSearchState = !searchState;
            _onSearchStateChange(newSearchState);
          }}
        >
          <Image
            style={{
              margin: 10,
              width: 25,
              height: 25,
              tintColor: ACCENT_COLOR
            }}
            source={searchState ? CLOSE_ICON : SEARCH_ICON}
          />
        </TouchableOpacity>
        {!searchState ? <AddButton onPress={() => console.log()} /> : null}
      </View>
    );
    return (
      <View style={container}>
        {searchState ? searchComp : titleComp}
        {optionsComp}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: Platform.OS !== "ios" ? 56 : 48,
    marginBottom: 1,
    backgroundColor: APP_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
const mapStateToProps = ({ SearchReducer }) => {
  let { searchState } = SearchReducer;
  return {
    searchState
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _onSearchStateChange: state => {
    dispatch(onSearchStateChange(state));
  },
  _onSearchTermChange: term => {
    dispatch(onSearchTermChange(term));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
