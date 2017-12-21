import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";
import * as Mime from "react-native-mime-types";
import Spinner from "react-native-spinkit";

import SimpleTabBar from "../Components/SimpleTabBar";
import { Alarm, Bell } from "../Components/Icons";
import { TextComponent } from "../Components/TextComponents";
import DisplayMessage from "../Components/DisplayMessage";
import HoursPicker from "../Components/HoursPicker";

import {
  GRAY,
  RADICAL_RED,
  GREEN,
  WILD_SAND,
  BLACK,
  TODAY,
  WEEK,
  LATER,
  PICKER_OPTIONS
} from "../Constants";
import { getFileNameFromPath } from "../Utils";
import {
  completeTodo,
  incompleteTodo,
  updateReminderTime
} from "../Store/Actions/TodoActions";

class ActionButton extends Component {
  constructor() {
    super();
  }
  render() {
    let { color, text, onPress } = this.props;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: color,
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          width: "50%"
        }}
        activeOpacity={0.8}
        onPress={() => onPress()}
      >
        <TextComponent isLight textStyle={{ color: "#FFF", fontSize: 18 }}>
          {text}
        </TextComponent>
      </TouchableOpacity>
    );
  }
}
const PDFComponent = ({ uri, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        margin: 10,
        height: 50,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: "blue"
      }}
      onPress={() => navigation.navigate("PdfViewer", { uri })}
      activeOpacity={0.8}
    >
      <TextComponent
        textStyle={{
          fontSize: 18
        }}
      >
        {getFileNameFromPath(uri)}
      </TextComponent>
      <View
        style={{
          position: "absolute",
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          left: 0,
          top: 0,
          bottom: 0,
          width: 30,
          backgroundColor: "blue"
        }}
      />
    </TouchableOpacity>
  );
};
const ImageComponent = ({ uri }) => {
  uri = uri ? "http://10.0.2.2:8000/" + uri : undefined;
  return (
    <View style={{ margin: 10 }}>
      <Image style={{ width: 200, height: 200 }} source={{ uri }} />
    </View>
  );
};
const InvalidComponent = () => {
  return (
    <View>
      <TextComponent>Invalid Attachment</TextComponent>
    </View>
  );
};
const PDF = "pdf";
const IMAGE = "image";
const INVALID = "invalid";

class TaskDetails extends Component {
  constructor(props) {
    super(props);
    let options = PICKER_OPTIONS;
    let defaultIndex = 0;
    this.state = {
      pickerVisible: false,
      submitted: false,
      isCompleted: false,
      options,
      defaultIndex
    };
  }
  getTimeAndDate = date => {
    date = moment(date);
    let visibleDate = date.format("MMM DD");
    let visibleTime = date.format("hh:mm");
    let meridiem = date.format("A");
    return { visibleDate, visibleTime, meridiem };
  };

  completeTask = isCompleted => {
    let {
      navigation,
      _completeTodo,
      _incompleteTodo,
      isLoading,
      isError,
      isSuccess
    } = this.props;
    const { id } = navigation.state.params;
    id
      ? isCompleted
        ? _completeTodo(id)
        : navigation.navigate("Feedback", { id })
      : "";
    this.setState({ submitted: true });
  };
  componentWillReceiveProps(nextProps) {
    let { submitted } = this.state;
    if (submitted) {
      let { isSuccess, isError, navigation } = nextProps;
      if (isSuccess) {
        DisplayMessage("Submitted");
        navigation.goBack(null);
      }
      isError ? DisplayMessage("Connection failed. Retry") : "";
    }
  }
  getType = file => {
    let fileName = getFileNameFromPath(file);
    let fileType = Mime.lookup(fileName);
    return fileType.includes("pdf")
      ? PDF
      : fileType.includes("image") ? IMAGE : INVALID;
  };
  renderAttachment = attachment => {
    let { navigation } = this.props;
    const type = this.getType(attachment);
    return type === PDF ? (
      <PDFComponent uri={attachment} navigation={navigation} />
    ) : type === IMAGE ? (
      <ImageComponent uri={attachment} />
    ) : (
      <InvalidComponent />
    );
  };
  render() {
    let {
      navigation,
      todos,
      laterTodos,
      _compeleteTodo,
      _incompleteTodo,
      _updateReminderTime
    } = this.props;
    const { id: todoId, type: listType } = navigation.state.params;
    todos = listType === LATER ? laterTodos : todos;
    const itemIndex = todos.findIndex(item => item.id === todoId);
    let item = todos[itemIndex];
    if (item) {
      let {
        title,
        description,
        sender,
        dueDate,
        attachment,
        reminderTime
      } = item;
      let {
        container,
        contentContainer,
        eachRow,
        headerText,
        contentText
      } = styles;
      let { visibleDate, visibleTime, meridiem } = this.getTimeAndDate(dueDate);
      const { height: heightOfDeviceScreen } = Dimensions.get("window");
      let { pickerVisible, options } = this.state;
      const defaultIndex = options.findIndex(item => item === reminderTime);
      return (
        <View style={container}>
          <SimpleTabBar onBackPress={() => navigation.goBack(null)} />
          <ScrollView
            contentContainerStyle={[
              contentContainer,
              {
                minHeight: this.height || heightOfDeviceScreen
              }
            ]}
            onLayout={e => {
              const { nativeEvent: { layout: { height } } } = e;
              this.height = height;
              this.forceUpdate();
            }}
          >
            <View style={eachRow}>
              <TextComponent isExtraLight style={headerText}>
                Title
              </TextComponent>
              <TextComponent isLight textStyle={contentText}>
                {title}
              </TextComponent>
            </View>
            <View style={eachRow}>
              <TextComponent isExtraLight style={headerText}>
                By
              </TextComponent>
              <TextComponent isLight textStyle={contentText}>
                {sender}
              </TextComponent>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <View style={eachRow}>
                <TextComponent isExtraLight style={headerText}>
                  Due date
                </TextComponent>
                <TextComponent isLight textStyle={contentText}>
                  {`${visibleDate} | ${visibleTime} ${meridiem}`}
                </TextComponent>
              </View>
              {listType !== LATER ? (
                <View>
                  <TextComponent isExtraLight style={headerText}>
                    Reminder
                  </TextComponent>
                  <ModalDropdown
                    defaultValue={options[defaultIndex]}
                    defaultIndex={defaultIndex}
                    showsVerticalScrollIndicator={false}
                    options={options}
                    onSelect={(index, value) => {
                      _updateReminderTime(item.id, value);
                    }}
                    style={{
                      justifyContent: "center"
                    }}
                    dropdownTextStyle={{
                      padding: 10,
                      fontSize: 16,
                      textAlign: "center"
                    }}
                    dropdownStyle={{ padding: 0, margin: 0, width: 100 }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderBottomWidth: 0.8,
                        borderBottomColor: GRAY
                      }}
                    >
                      <Alarm
                        size={20}
                        style={{
                          backgroundColor: "transparent",
                          marginRight: 2
                        }}
                        color="black"
                      />
                      <TextComponent
                        isLight
                        textStyle={{
                          color: "black",
                          textAlign: "center"
                        }}
                      >
                        {reminderTime}
                      </TextComponent>
                    </View>
                  </ModalDropdown>
                </View>
              ) : null}
            </View>
            <View style={eachRow}>
              <TextComponent isExtraLight style={headerText}>
                Description
              </TextComponent>
              <TextComponent isLight textStyle={contentText}>
                {description}
              </TextComponent>
            </View>
            {attachment ? (
              <View style={{ margin: 10 }}>
                <TextComponent isExtraLight style={headerText}>
                  Attachment
                </TextComponent>
                {this.renderAttachment(attachment)}
              </View>
            ) : null}
            <HoursPicker
              isPickerVisible={pickerVisible}
              onVisibilityChange={pickerVisible =>
                this.setState({ pickerVisible })
              }
              initialTime={reminderTime}
              onSelect={value => {
                _updateReminderTime(item.id, value);
              }}
            />
          </ScrollView>
          <View style={{ flexDirection: "row" }}>
            <ActionButton
              text={"Not done"}
              color={RADICAL_RED}
              onPress={() => this.completeTask(false)}
            />
            <ActionButton
              text={"Done"}
              color={GREEN}
              onPress={() => this.completeTask(true)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: WILD_SAND
          }}
        >
          <Spinner
            style={{ margin: 5 }}
            isVisible={true}
            size={50}
            type={"Bounce"}
            color={RADICAL_RED}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WILD_SAND },
  contentContainer: { margin: 16, paddingBottom: 30 },
  eachRow: { marginTop: 10, marginBottom: 10 },
  headerText: { color: GRAY, fontSize: 16 },
  contentText: { color: BLACK, fontSize: 16 }
});
const mapStateToProps = ({ TodoReducer }) => {
  let { isLoading, isError, isSuccess, todos, laterTodos } = TodoReducer;

  return {
    todos,
    laterTodos,
    isLoading,
    isError,
    isSuccess
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _completeTodo: id => dispatch(completeTodo(id)),
  _incompleteTodo: id => dispatch(incompleteTodo(id)),
  _updateReminderTime: (todoId, reminderTime) =>
    dispatch(updateReminderTime(todoId, reminderTime))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
