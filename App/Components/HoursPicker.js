import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  Text,
  Modal
} from "react-native";

import ModalDropdown from "react-native-modal-dropdown";
import { APP_COLOR, RADICAL_RED, PICKER_OPTIONS } from "../Constants";
const getNumStringArray = num => {
  return Array(num)
    .fill(0)
    .map(Number.call, Number)
    .map(num => (num < 10 ? "0" + num.toString() : num.toString()));
};
class Section extends Component {
  render() {
    let {
      sectionHeaderText,
      sectionModal,
      sectionText,
      sectionDropDown,
      optionsText
    } = styles;
    let { values, defaultIndex } = this.props;
    defaultIndex = defaultIndex ? defaultIndex : 0;
    return (
      <ModalDropdown
        defaultValue={values[defaultIndex]}
        defaultIndex={defaultIndex}
        showsVerticalScrollIndicator={false}
        options={values}
        onSelect={(index, value) => {
          this.props.onSelectValue(value);
        }}
        style={{
          height: 40,
          width: "100%"
        }}
        textStyle={{
          padding: 10,
          fontSize: 18,
          textAlign: "center"
        }}
        dropdownTextStyle={{
          padding: 10,
          fontSize: 18,
          textAlign: "center"
        }}
        dropdownStyle={{ width: "80%" }}
      />
    );
  }
}
export default class HoursPicker extends Component {
  constructor(props) {
    super(props);
    const { initialTime } = props;
    const options = PICKER_OPTIONS;
    const initialMinsIndex = options.findIndex(item => item === initialTime);
    this.state = {
      options,
      initialMinsIndex,
      selectedMinutes: ""
    };
  }
  showModal = () => {
    this.changeVisibility(true);
  };
  hideModal = () => {
    this.changeVisibility(false);
  };
  changeVisibility = isPickerVisible => {
    this.props.onVisibilityChange(isPickerVisible);
  };

  render() {
    let {
      modalContainer,
      centerContainer,
      headerText,
      sectionsLayout,
      okButton,
      okButtonText
    } = styles;
    let { isPickerVisible, onSelect } = this.props;
    let { options, initialMinsIndex } = this.state;
    let backgroundColor = isPickerVisible
      ? "rgba(164, 164, 164, 0.5)"
      : "transparent";
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={() => this.hideModal()}
      >
        <TouchableWithoutFeedback onPress={() => this.hideModal()}>
          <View style={[modalContainer, { backgroundColor }]}>
            <View style={centerContainer}>
              <Text style={headerText}>Choose Time</Text>
              <View style={sectionsLayout}>
                <Section
                  title={"Minutes"}
                  values={options}
                  defaultIndex={initialMinsIndex}
                  onSelectValue={value => {
                    this.setState({ selectedMinutes: value });
                  }}
                />
              </View>
              <TouchableOpacity
                style={okButton}
                onPress={() => {
                  let { selectedMinutes } = this.state;
                  onSelect(selectedMinutes);
                  this.hideModal();
                }}
              >
                <Text style={okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

class TimePicker extends Component {
  constructor() {
    super();
    this.state = { isPickerVisible: false };
  }

  render() {
    let { isPickerVisible } = this.state;
    let { container } = styles;

    return (
      <View style={container}>
        <TouchableOpacity
          onPress={() => this.setState({ isPickerVisible: true })}
        >
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <HoursPicker
          isPickerVisible={isPickerVisible}
          onVisibilityChange={isPickerVisible =>
            this.setState({ isPickerVisible })
          }
          onSelect={value => console.log(value)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  centerContainer: {
    backgroundColor: "#FFF",
    width: "80%",
    borderRadius: 10
  },
  headerText: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    backgroundColor: APP_COLOR,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#818181",
    color: "white",
    fontWeight: "700"
  },
  sectionsLayout: {
    flexDirection: "row"
  },
  sectionModal: {
    height: 40,
    width: "100%"
  },
  sectionText: {
    padding: 10,
    fontSize: 18,
    textAlign: "center"
  },
  optionsText: {
    padding: 10,
    fontSize: 18,
    textAlign: "center"
  },
  sectionDropDown: { width: "80%" },
  okButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  okButton: {
    backgroundColor: RADICAL_RED,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});
