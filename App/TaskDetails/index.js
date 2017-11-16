import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";
import * as Mime from "react-native-mime-types";
import SimpleTabBar from "../Components/SimpleTabBar";
import { Alarm, Bell } from "../Components/Icons";
import { TextComponent } from "../Components/TextComponents";
import DisplayMessage from "../Components/DisplayMessage";
import HoursPicker from "../Components/HoursPicker";
import { GRAY, RADICAL_RED, GREEN, WILD_SAND } from "../Constants";
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
        <TextComponent textStyle={{ color: "#FFF", fontSize: 18 }}>
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
    this.state = { pickerVisible: false, submitted: false };
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
    let id = navigation.state.params.item.id;

    id ? (isCompleted ? _completeTodo(id) : _incompleteTodo(id)) : "";
    this.setState({ submitted: true });
  };
  componentWillReceiveProps(nextProps) {
    let { submitted } = this.state;
    if (submitted) {
      let { isSuccess, isError, navigation } = nextProps;
      if (isSuccess) {
        DisplayMessage("Submitted");
        navigation.goBack();
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
      todos,
      navigation,
      _compeleteTodo,
      _incompleteTodo,
      _updateReminderTime
    } = this.props;
    const todoId = navigation.state.params.id;
    const itemIndex = todos.findIndex(item => item.id === todoId);
    let item = todos[itemIndex];
    let {
      title,
      description,
      createdBy,
      dueDate,
      attachment,
      reminderTime
    } = item;
    let { visibleDate, visibleTime, meridiem } = this.getTimeAndDate(dueDate);
    const { height: heightOfDeviceScreen } = Dimensions.get("window");
    let { pickerVisible } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: WILD_SAND }}>
        <SimpleTabBar onBackPress={() => navigation.goBack(null)} />
        <ScrollView
          contentContainerStyle={{
            margin: 16,
            minHeight: this.height || heightOfDeviceScreen
          }}
          onLayout={e => {
            const { nativeEvent: { layout: { height } } } = e;
            this.height = height;
            this.forceUpdate();
          }}
        >
          <View style={{ margin: 10 }}>
            <TextComponent>Title</TextComponent>
            <TextComponent textStyle={{ color: "black" }}>
              {title}
            </TextComponent>
          </View>
          <View style={{ margin: 10 }}>
            <TextComponent>By</TextComponent>
            <TextComponent textStyle={{ color: "black" }}>
              {createdBy}
            </TextComponent>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <View style={{ margin: 10 }}>
              <TextComponent>Due date</TextComponent>
              <TextComponent textStyle={{ color: "black" }}>
                {`${visibleDate} | ${visibleTime} ${meridiem}`}
              </TextComponent>
            </View>
            <View>
              <TextComponent>Reminder</TextComponent>
              <TouchableOpacity
                onPress={() => this.setState({ pickerVisible: true })}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 0.8,
                  borderBottomColor: GRAY
                }}
              >
                <Alarm
                  size={20}
                  style={{ margin: 5 }}
                  style={{
                    backgroundColor: "transparent"
                  }}
                  color="black"
                />
                <TextComponent textStyle={{ color: "black", margin: 5 }}>
                  {reminderTime}
                </TextComponent>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <TextComponent>Description</TextComponent>
            <TextComponent textStyle={{ color: "black" }}>
              {description}
            </TextComponent>
          </View>
          {attachment ? (
            <View style={{ margin: 10 }}>
              <TextComponent>Attachment</TextComponent>
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
              _updateReminderTime(item.id, value.text);
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
  }
}

const mapStateToProps = ({ TodoReducer }) => {
  let { isLoading, isError, isSuccess, todos } = TodoReducer;

  return {
    todos,
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
