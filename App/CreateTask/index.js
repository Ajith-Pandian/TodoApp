import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ScrollView,
  Platform
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";
import * as Mime from "react-native-mime-types";
import { TextInputLayout } from "rn-textinputlayout";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";

import { Close, Calendar, Time, Attach } from "../Components/Icons";
import SimpleTabBar from "../Components/SimpleTabBar";
import DisplayMessage from "../Components/DisplayMessage";
import { GRAY, RED, ACCENT_COLOR_1 } from "../Constants";
import BackgroundContainer from "../Components/BackgroundContainer";
import { getFileNameFromPath } from "../Utils";
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
          style={{
            backgroundColor: "transparent",
            marginLeft: 5,
            marginRight: 5
          }}
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
    isError ? this.setError(errorMessage) : this.clearError(type);
  };
  setError = errorMessage => {
    this.setState({ isError: true, errorMessage });
  };
  clearError = type => {
    this.setState({ isError: false, errorMessage: "" });
  };
  render() {
    let { type } = this.props;
    let { isError, errorMessage } = this.state;
    const isTitle = type === InputComponent.TITLE;
    const color = isError ? RED : GRAY;
    return (
      <TextInputLayout
        style={{ width: WIDTH - 50, marginBottom: 5 }}
        labelText={type.charAt(0).toUpperCase() + type.slice(1)}
        labelFontSize={14}
        hintColor={color}
        errorColor={color}
        focusColor={color}
        checkValid={content => {
          this.setState({ [type]: content });
          return !(content && content.length > 0);
        }}
      >
        <TextInputComponent
          isLight
          style={{ fontSize: isTitle ? 18 : 16, height: 40 }}
          placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
          onChangeText={text => this.props.onSuccess(this.state[type])}
        />
      </TextInputLayout>
    );
  }
}
class ContactComponent extends Component {
  static TO = "To";
  state = {
    isError: false,
    errorMessage: "Select contact",
    isSelf: false,
    isHighlighted: false
  };
  setError = isError => {
    this.setState({ isError });
  };
  setSelf = (isSelf, isHighlighted, fromProps) => {
    let { contact, ownContact, onSuccess } = this.props;
    this.setState({ isSelf, isHighlighted }, () => {
      onSuccess(isHighlighted ? (isSelf ? ownContact : contact) : null);
    });
  };

  componentWillReceiveProps(nextProps) {
    let { contact, ownContact, onSuccess } = nextProps;
    let { isHighlighted, isFirstTime } = this.state;
    let isSelf = contact && contact.name === ownContact.name;
    this.setState({ isSelf });
    //this.setSelf(isSelf, isHighlighted);
  }

  toggleIsSelf = () => {
    let isSelf = !this.state.isSelf;
    let isHighlighted = !this.state.isHighlighted;
    this.setSelf(isSelf, isHighlighted);
  };
  render() {
    let { type, contact } = this.props;
    let { isSelf, isError, errorMessage } = this.state;
    let { badge } = styles;
    const maxlimit = 30;
    let contactName = contact ? contact.name : null;
    let nameLength;
    if (contactName)
      if (contactName.length < 12) nameLength = contactName.length;
      else {
        nameLength = 12;
        contactName = `${contactName.substring(0, nameLength)}...`;
      }

    return (
      <View style={{ height: isError ? 70 : 50, marginBottom: 10 }}>
        <TextComponent isLight>To</TextComponent>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 40,
            borderBottomWidth: 0.5,
            width: WIDTH - 50,
            alignItems: "center",
            borderBottomColor: isError ? RED : GRAY
          }}
        >
          <TouchableOpacity onPress={() => this.props.onContactClick()}>
            {!isSelf && contact ? (
              <View style={[badge, { backgroundColor: GRAY }]}>
                <TextComponent
                  isLight
                  maxLength={12}
                  numberOfLines={1}
                  textStyle={{
                    fontSize: 16,
                    textAlign: "center",
                    textAlignVertical: "center",
                    color: "white"
                  }}
                >
                  {contactName}
                </TextComponent>
              </View>
            ) : (
              <TextComponent
                isLight
                textStyle={{
                  marginLeft: 2,
                  textAlign: "left",
                  textAlignVertical: "center"
                }}
                numberOfLines={1}
              >
                Select Contacts
              </TextComponent>
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "transparent"
            }}
          >
            <TextComponent
              isLight
              style={{ marginLeft: 10, marginRight: 10, fontSize: 16 }}
            >
              or
            </TextComponent>
            <TouchableOpacity onPress={() => this.toggleIsSelf()}>
              <View
                style={[
                  badge,
                  { backgroundColor: isSelf ? GRAY : "transparent" }
                ]}
              >
                <TextComponent
                  isLight
                  textStyle={[
                    {
                      fontSize: 16,
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: isSelf ? "white" : GRAY
                    }
                  ]}
                  numberOfLines={1}
                >
                  Self
                </TextComponent>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
const mapStateToPropsContacts = ({ UserReducer }) => {
  let { name, phoneNum: number } = UserReducer;
  return {
    ownContact: {
      name,
      number
    }
  };
};
const ContactWrapper = connect(mapStateToPropsContacts, null, null, {
  withRef: true
})(ContactComponent);

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
    const maxlimit = 30;
    return (
      <View
        style={{
          height: isError ? 70 : 50,
          marginTop: 10,
          marginBottom: 5
        }}
      >
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
            isLight
            textStyle={{
              marginLeft: type === ClickableComponent.TO ? 2 : 10,
              textAlign: "left",
              textAlignVertical: "center"
            }}
            numberOfLines={1}
          >
            {text.length > maxlimit
              ? text.substring(0, maxlimit - 3) + "..."
              : text}
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
    this.state = {
      title: "",
      description: "",
      pickerVisible: false,
      mode: "date",
      contactCallback: false
    };
  }

  openFilePicker = () => {
    const docType =
      Platform.OS === "ios"
        ? DocumentPickerUtil.images()
        : DocumentPickerUtil.allFiles();
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        console.log(res);
        if (res) {
          let { fileName, uri } = res;
          let type = Mime.lookup(fileName);
          let attachment = { uri, name: fileName, type };
          this.setState({ attachment });
        }
      }
    );
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
        this.openFilePicker();
        break;
      default:
        console.log(`Item ${type} clicked`);
    }
  };
  componentWillReceiveProps(nextProps) {
    let { isSuccess, navigation } = nextProps;
    if (isSuccess && this.submitted) navigation.goBack();
  }
  validateAndCreate = () => {
    console.log(this.state);
    let {
      contact,
      selectedContact,
      title,
      description,
      date,
      time,
      contactCallback
    } = this.state;
    selectedContact = contactCallback ? selectedContact : contact;
    this.contactRef.getWrappedInstance().setError(!selectedContact);
    this.titleRef.validate();
    this.descriptionRef.validate();
    this.dateRef.setError(!date);
    this.timeRef.setError(!time);
    if (date && time && title && description && selectedContact) {
      this.submitted = true;
      this.syncDateTimeAndCreate();
    }
    // else {
    //   DisplayMessage("Please fill all fields");
    // }
  };

  syncDateTimeAndCreate = () => {
    let {
      date,
      time,
      title,
      description,
      attachment,
      contact,
      selectedContact,
      contactCallback
    } = this.state;
    selectedContact = contactCallback ? selectedContact : contact;
    let { _createTodo, ownNumber } = this.props;
    let dateString = date.toString();
    let momentDate = moment(dateString, "ddd MMM D YYYY HH:mm:ss ZZ");
    momentDate.set({ h: time.getHours(), m: time.getMinutes() });

    date = momentDate.toDate();
    this.setState({ date });

    if (moment().diff(momentDate) < 0) {
      let formattedDate = momentDate.format("YYYY-MM-DD HH:mm:ssZ");
      let todoToBeCreated = {
        title,
        description,
        receiver: selectedContact.number,
        due_date: formattedDate,
        attachment
      };
      //FIXME:remove on production
      console.log(todoToBeCreated);
      _createTodo(todoToBeCreated);
    } else {
      DisplayMessage("Please select future time");
    }
  };
  render() {
    let { goBack } = this.props.navigation;
    let { pickerVisible, mode, contact, date, time, attachment } = this.state;
    let visibleDateOrtime =
      mode === ClickableComponent.DATE && date
        ? date
        : mode === ClickableComponent.TIME && time ? time : new Date();
    return (
      <BackgroundContainer style={{ flex: 1 }} isTop={true}>
        <SimpleTabBar text={"New Task"} onBackPress={() => goBack(null)} />
        <ScrollView contentContainerStyle={{}}>
          <View style={{ alignItems: "center", marginVertical: 25 }}>
            <ContactWrapper
              contact={contact}
              type={ContactComponent.TO}
              ref={ref => (this.contactRef = ref)}
              onContactClick={() => this.handleClick(ContactComponent.TO)}
              onSuccess={selectedContact =>
                this.setState({
                  contactCallback: true,
                  contact: selectedContact,
                  selectedContact
                })
              }
            />
            <InputComponent
              type={InputComponent.TITLE}
              ref={ref => (this.titleRef = ref)}
              onSuccess={title => this.setState({ title })}
            />
            <InputComponent
              type={InputComponent.DESCRIPTION}
              ref={ref => (this.descriptionRef = ref)}
              onSuccess={description => this.setState({ description })}
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
              text={attachment ? attachment.name : "Attachment"}
              type={ClickableComponent.ATTACH}
              onClick={() => this.handleClick(ClickableComponent.ATTACH)}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.validateAndCreate();
            }}
          >
            <TextComponent isLight textStyle={{ color: "white" }}>
              Done
            </TextComponent>
          </TouchableOpacity>
        </ScrollView>
        <DateTimePicker
          isVisible={pickerVisible}
          onConfirm={selectedDate => {
            console.log(selectedDate);
            this.setState({ pickerVisible: false, [mode]: selectedDate });
          }}
          onCancel={() =>
            this.setState({
              pickerVisible: false
            })
          }
          mode={mode}
          date={visibleDateOrtime}
          is24Hour={false}
          titleIOS={"Pick " + mode}
          minimumDate={new Date()}
        />
      </BackgroundContainer>
    );
  }
}
const WIDTH = Dimensions.get("window").width;
const V_BUTTON_PADDING = 7;
const H_BUTTON_PADDING = 5 * V_BUTTON_PADDING;
const styles = StyleSheet.create({
  clickableComp: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    height: 40,
    borderBottomWidth: 0.5,
    width: WIDTH - 50,
    alignItems: "center"
  },
  inputComp: {
    height: 40,
    borderBottomWidth: 0.5,
    width: WIDTH - 50,
    marginTop: 5,
    marginBottom: 5
  },
  button: {
    alignSelf: "center",
    backgroundColor: ACCENT_COLOR_1,
    borderRadius: 2,
    margin: 30,
    marginTop: 60,
    paddingLeft: H_BUTTON_PADDING,
    paddingRight: H_BUTTON_PADDING,
    paddingTop: V_BUTTON_PADDING,
    paddingBottom: V_BUTTON_PADDING
  },
  badge: {
    margin: 2,
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 2,
    borderColor: "#808080"
  }
});

const mapStateToProps = ({ TodoReducer, UserReducer }) => {
  let { isLoading, isError, isSuccess } = TodoReducer;
  let { name: ownName, phoneNum: ownNumber } = UserReducer;
  return {
    isLoading,
    isError,
    isSuccess,
    ownName,
    ownNumber
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _createTodo: todo => {
    dispatch(createTodo(todo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
