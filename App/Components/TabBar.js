import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
import MenuButton from "./MenuButton";
import RoundButton from "./RoundButton";
import {
  onSearchTermChange,
  onSearchStateChange
} from "../Store/Actions/SearchActions";
import { connect } from "react-redux";
import { TextComponent, TextInputComponent } from "./TextComponents";
import { Search, Close, Bell } from "./Icons";
import { APP_COLOR, ACCENT_COLOR_1 } from "../Constants";
import { NavigationActions } from "react-navigation";

const SEARCH_ICON = (
  <Search size={25} style={{ backgroundColor: "transparent" }} color="white" />
);
const CLOSE_ICON = (
  <Close size={25} style={{ backgroundColor: "transparent" }} color="white" />
);

const WIDTH = Dimensions.get("window").width;

class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      //onNavPress,
      currentIndex,
      onChangeText,
      _onSearchStateChange,
      _onSearchTermChange,
      searchState,
      navigation
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
        {/*<MenuButton onPress={() => onNavPress()} />*/}
        <TextComponent
          textStyle={{
            marginLeft: 20,
            marginRight: 20,
            fontSize: 16,
            color: "white"
          }}
        >
          Todo App
        </TextComponent>
      </View>
    );
    let searchComp = (
      <View style={{ margin: 10 }}>
        <TextInputComponent
          multiline={false}
          placeholder={"Search"}
          autoFocus={true}
          underlineColorAndroid={ACCENT_COLOR_1}
          selectionColor={ACCENT_COLOR_1}
          inputStyle={{
            width: WIDTH - 65,
            color: "#FFF",
            paddingRight: 5,
            paddingLeft: 5
          }}
          onBlur={() => {
            /*this.setState({ isSearch: !isSearch })*/
          }}
          onChangeText={text => {
            if (text && text.length > 0) {
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                _onSearchTermChange(currentIndex, text);
              }, 200);
            } else {
              clearTimeout(this.timeout);
              _onSearchTermChange(currentIndex, text);
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
          style={{
            marginLeft: 10,
            marginRight: searchState ? 20 : 10
          }}
        >
          {searchState ? CLOSE_ICON : SEARCH_ICON}
        </TouchableOpacity>
        {!searchState ? (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => {
              navigation.navigate("NewTasks");
            }}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <Bell
              size={25}
              style={{
                backgroundColor: "transparent"
              }}
              color="white"
            />
          </TouchableOpacity>
        ) : null}
        {!searchState ? (
          <RoundButton
            size={30}
            icon={RoundButton.ADD}
            style={{ marginLeft: 10, marginRight: 10 }}
            onPress={() => {
              navigation.navigate("CreateTask");
            }}
          />
        ) : null}
      </View>
    );
    return (
      <View
        style={[
          container,
          {
            justifyContent: searchState ? null : "space-between"
          }
        ]}
      >
        {searchState ? searchComp : titleComp}
        {optionsComp}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: Platform.OS !== "ios" ? 56 : 48,
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
  _onSearchTermChange: (currentIndex, term) => {
    dispatch(onSearchTermChange(currentIndex, term));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
