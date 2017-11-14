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
import { APP_COLOR, ACCENT_COLOR_1 } from "../Constants";
const getNumStringArray = num => {
  return Array(num)
    .fill(0)
    .map(Number.call, Number)
    .map(num => (num < 10 ? "0" + num.toString() : num.toString()));
};
class Section extends Component {
  render() {
    let {
      section,
      sectionHeaderText,
      sectionModal,
      sectionText,
      sectionDropDown,
      optionsText
    } = styles;
    let { title, values, defaultIndex } = this.props;
    defaultIndex = defaultIndex ? defaultIndex : 0;
    return (
      <View style={section}>
        <Text style={sectionHeaderText}>{title}</Text>
        <ModalDropdown
          defaultValue={values[defaultIndex]}
          defaultIndex={defaultIndex}
          showsVerticalScrollIndicator={false}
          options={values}
          onSelect={(index, value) => this.props.onSelectValue(value)}
          style={sectionModal}
          textStyle={sectionText}
          dropdownTextStyle={optionsText}
          dropdownStyle={sectionDropDown}
        />
      </View>
    );
  }
}
export default class HoursPicker extends Component {
  constructor(props) {
    super(props);
    const hours = getNumStringArray(24);
    const minutes = getNumStringArray(60);

    this.state = {
      hours,
      minutes,
      selectedHours: hours[0],
      selectedMinutes: minutes[0],
      initialHoursIndex: 0,
      initialMinsIndex: 0
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
  getReadableHours = () => {
    let { hours, minutes, selectedHours, selectedMinutes } = this.state;
    return selectedHours === hours[0] ||
      selectedHours === undefined ||
      selectedHours === 0
      ? `${selectedMinutes} mins`
      : `${selectedHours} h ${selectedMinutes} m`;
  };
  getTimeFromReadableHours = readableHours => {
    let initialHours, initialMins;
    let units = readableHours.split(" ");
    if (units.length === 4) {
      initialHours = units[0];
      initialMins = units[2];
    } else {
      initialMins = units[0];
    }
    return { initialHours, initialMins };
  };
  getInitialValueIndexes = initialTime => {
    let { hours, minutes } = this.state;
    let { initialHours, initialMins } = this.getTimeFromReadableHours(
      initialTime
    );
    let initialHoursIndex, initialMinsIndex;
    if (initialHours) initialHoursIndex = hours.indexOf(initialHours);
    if (initialMins) initialMinsIndex = minutes.indexOf(initialMins);
    return { initialHoursIndex, initialMinsIndex };
  };
  componentWillReceiveProps(nextProps) {
    let { initialTime } = nextProps;
    let { hours, minutes } = this.state;
    let { initialHoursIndex, initialMinsIndex } = this.getInitialValueIndexes(
      initialTime
    );
    this.setState({
      initialHoursIndex,
      initialMinsIndex,
      selectedHours: initialHoursIndex ? hours[initialHoursIndex] : 0,
      selectedMinutes: initialMinsIndex ? minutes[initialMinsIndex] : 0
    });
  }
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
    let { hours, minutes, initialHoursIndex, initialMinsIndex } = this.state;
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
                  title={"Hours"}
                  values={hours}
                  defaultIndex={initialHoursIndex}
                  onSelectValue={value => {
                    this.setState({ selectedHours: value });
                  }}
                />
                <Section
                  title={"Minutes"}
                  values={minutes}
                  defaultIndex={initialMinsIndex}
                  onSelectValue={value => {
                    this.setState({ selectedMinutes: value });
                  }}
                />
              </View>
              <TouchableOpacity
                style={okButton}
                onPress={() => {
                  let { selectedHours, selectedMinutes } = this.state;
                  onSelect({
                    hours: Number(selectedHours),
                    minutes: Number(selectedMinutes),
                    text: this.getReadableHours()
                  });
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
  section: {
    paddingTop: 10,
    width: "50%",
    alignItems: "center"
  },
  sectionHeaderText: {
    fontSize: 18
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
  sectionDropDown: { width: "40%" },
  okButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  okButton: {
    backgroundColor: ACCENT_COLOR_1,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});
