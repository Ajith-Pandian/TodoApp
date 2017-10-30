import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ScrollView
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";

import { Close, Calendar, Time, Attach } from "../Components/Icons";
import { GRAY, RED, ACCENT_COLOR_1 } from "../Constants";
import BackgroundContainer from "../Components/BackgroundContainer";
import {
  TextComponent,
  TextInputComponent
} from "../Components/TextComponents";
import { createTodo } from "../Store/Actions/TodoActions";

const Icon = ({ name }) => {
  let icon;
  switch (name) {
    case ClickableComponent.DATE:
      icon = (
        <Calendar
          size={25}
          style={{ backgroundColor: "transparent" }}
          color={GRAY}
        />
      );
      break;
    case ClickableComponent.TIME:
      icon = (
        <Time
          size={25}
          style={{ backgroundColor: "transparent" }}
          color={GRAY}
        />
      );
      break;

    case ClickableComponent.ATTACH:
      icon = (
        <Attach
          size={25}
          style={{ backgroundColor: "transparent" }}
          color={GRAY}
        />
      );
      break;
  }
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {icon}
    </View>
  );
};
class InputComponent extends Component {
  state = { isError: false, errorMessage: "" };
  static TITLE = "title";
  static DESCRIPTION = "description";
  validate = () => {
    let { type } = this.props;
    let content = this.state[type];
    let isError = !(content && content.length > 0);
    let errorMessage = `Enter ${type}`;
    this.setState({ isError, errorMessage });
  };
  render() {
    let { type } = this.props;
    let { isError, errorMessage } = this.state;
    return (
      <View style={{ height: isError ? 70 : 50 }}>
        <TextInputComponent
          inputStyle={[
            styles.inputComp,
            { borderBottomColor: isError ? RED : GRAY }
          ]}
          multiline={false}
          placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
          underlineColorAndroid={"transparent"}
          returnKeyType={"done"}
          onChangeText={text =>
            this.setState({ [type]: text }, () => console.log(this.state))}
          onEndEditing={() => {
            this.validate();
          }}
          onFocus={() => this.setState({ isError: false })}
        />
        {isError ? (
          <View
            style={{
              height: 20,
              width: WIDTH - 100,
              backgroundColor: "transparent"
            }}
          >
            <Text style={{ color: RED }}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
class ClickableComponent extends Component {
  state = { isError: false, errorMessage: "Error" };
  static TO = "To";
  static DATE = "date";
  static TIME = "time";
  static ATTACH = "attach";
  setError = isError => {
    this.setState({ isError });
  };
  setErrorMessage = () => {
    let { type } = this.props;
    let errorMessage = "Error";
    switch (type) {
      case ClickableComponent.TO:
        errorMessage = "Select contact";
        break;
      case ClickableComponent.DATE:
        errorMessage = "Select date";
        break;
      case ClickableComponent.TIME:
        errorMessage = "Select Time";
        break;
    }
    this.setState({ errorMessage });
  };
  componentDidMount() {
    this.setErrorMessage();
  }
  render() {
    let { type, text, onClick } = this.props;
    let { isError, errorMessage } = this.state;

    return (
      <View style={{ height: isError ? 70 : 50 }}>
        <TouchableOpacity
          style={[
            styles.clickableComp,
            {
              borderBottomColor: isError ? RED : GRAY
            }
          ]}
          onPress={() => onClick()}
        >
          {type && type !== ClickableComponent.TO ? <Icon name={type} /> : null}
          <TextComponent
            textStyle={{
              marginLeft: type ? 10 : 0,
              textAlign: "left",
              textAlignVertical: "center"
            }}
          >
            {text}
          </TextComponent>
        </TouchableOpacity>
        {isError ? (
          <View
            style={{
              height: 20,
              width: WIDTH - 100,
              backgroundColor: "transparent"
            }}
          >
            <Text style={{ color: RED }}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
class CreateTask extends Component {
  constructor() {
    super();
    this.state = { pickerVisible: false, mode: "date" };
  }

  syncDateTimeAndCreate = () => {
    let { date, time, title, description, contact } = this.state;
    let { _createTodo } = this.props;
    let dateString = date.toString();
    let momentDate = moment(dateString, "ddd MMM D YYYY HH:mm:ss ZZ");
    momentDate.set({ h: time.getHours(), m: time.getMinutes() });
    let formattedDate = momentDate.format("YYYY-MM-DD HH:MM:ssZ");
    date = momentDate.toDate();
    this.setState({ date });
    _createTodo({
      title,
      description,
      receiver: contact.number,
      due_date: formattedDate
    });
  };
  handleClick = type => {
    switch (type) {
      case ClickableComponent.TO:
        this.props.navigation.navigate("Contacts", {
          onContactSelected: contact => {
            if (contact) this.setState({ contact });
          }
        });
        break;
      case ClickableComponent.DATE:
      case ClickableComponent.TIME:
        this.setState({ pickerVisible: true, mode: type });
        break;
      case ClickableComponent.ATTACH:
        console.log("Attach clicked");
        break;
      default:
        console.log(`Item ${type} clicked`);
    }
  };
  validateAndCreate = () => {
    let { contact, date, time } = this.state;
    if (!contact) this.contactRef.setError(true);
    else this.contactRef.setError(false);

    this.titleRef.validate();
    this.descriptionRef.validate();

    if (!date) this.dateRef.setError(true);
    else this.dateRef.setError(false);
    if (!time) this.timeRef.setError(true);
    else this.timeRef.setError(false);
    if (date && time) this.syncDateTimeAndCreate();
  };

  render() {
    let { goBack } = this.props.navigation;
    let { pickerVisible, mode, contact, date, time } = this.state;
    let visibleDateOrtime =
      mode === ClickableComponent.DATE && date
        ? date
        : mode === ClickableComponent.TIME && time ? time : new Date();
    return (
      <BackgroundContainer style={{ flex: 1 }} isTop={true}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={{ alignSelf: "flex-end", margin: 10, padding: 10 }}
          >
            <Close
              size={30}
              style={{ backgroundColor: "transparent" }}
              color={GRAY}
            />
          </TouchableOpacity>
          <View>
            <TextComponent textStyle={{ fontSize: 26, textAlign: "left" }}>
              New Task!
            </TextComponent>
          </View>
          <View style={{ marginTop: 30 }}>
            <ClickableComponent
              text={contact ? contact.name : ClickableComponent.TO}
              type={ClickableComponent.TO}
              ref={ref => (this.contactRef = ref)}
              onClick={() => this.handleClick(ClickableComponent.TO)}
            />
            <InputComponent
              type={InputComponent.TITLE}
              ref={ref => (this.titleRef = ref)}
            />
            <InputComponent
              type={InputComponent.DESCRIPTION}
              ref={ref => (this.descriptionRef = ref)}
            />
            <ClickableComponent
              text={date ? moment(date).format("ll") : "Date"}
              type={ClickableComponent.DATE}
              ref={ref => (this.dateRef = ref)}
              onClick={() => this.handleClick(ClickableComponent.DATE)}
            />
            <ClickableComponent
              text={time ? moment(time).format("LT") : "Time"}
              type={ClickableComponent.TIME}
              ref={ref => (this.timeRef = ref)}
              onClick={() => this.handleClick(ClickableComponent.TIME)}
            />
            <ClickableComponent
              text={"Attachment"}
              type={ClickableComponent.ATTACH}
              onClick={() => this.handleClick(ClickableComponent.ATTACH)}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Done clicked");
              this.validateAndCreate();
            }}
          >
            <TextComponent textStyle={{ color: "white" }}>Done</TextComponent>
          </TouchableOpacity>
        </ScrollView>
        <DateTimePicker
          isVisible={pickerVisible}
          onConfirm={selectedDate => {
            console.log(selectedDate);
            this.setState({ pickerVisible: false, [mode]: selectedDate });
          }}
          onCancel={() => this.setState({ pickerVisible: false })}
          mode={mode}
          date={visibleDateOrtime}
          is24Hour={false}
          titleIOS={"Pick " + mode}
        />
      </BackgroundContainer>
    );
  }
}
const WIDTH = Dimensions.get("window").width;
const V_BUTTON_PADDING = 7;
const H_BUTTON_PADDING = 3 * V_BUTTON_PADDING;
const styles = StyleSheet.create({
  clickableComp: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    height: 40,
    borderBottomWidth: 0.5,
    width: WIDTH - 100,
    alignItems: "center"
  },
  inputComp: {
    height: 40,
    borderBottomWidth: 0.5,
    width: WIDTH - 100,
    marginTop: 5,
    marginBottom: 5
  },
  button: {
    backgroundColor: ACCENT_COLOR_1,
    borderRadius: 2,
    margin: 20,
    paddingLeft: H_BUTTON_PADDING,
    paddingRight: H_BUTTON_PADDING,
    paddingTop: V_BUTTON_PADDING,
    paddingBottom: V_BUTTON_PADDING
  }
});

const mapStateToProps = ({ TodoReducer }) => {
  let { isLoading, isError, isSuccess } = TodoReducer;
  return {
    isLoading,
    isError,
    isSuccess
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _createTodo: todo => {
    dispatch(createTodo(todo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
