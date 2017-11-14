import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import SimpleTabBar from "../Components/SimpleTabBar";
import { Alarm } from "../Components/Icons";
import { TextComponent } from "../Components/TextComponents";
import HoursPicker from "../Components/HoursPicker";

class DropDownMenu extends Component {
  constructor() {
    super();
    this.state = {
      pickerVisible: false
    };
  }
  render() {
    let { pickerVisible } = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ pickerVisible: true })}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Alarm
              size={20}
              style={{ backgroundColor: "transparent" }}
              color={"black"}
            />
            <TextComponent textStyle={{ color: "black" }}>
              {options[selectedIndex].text}
            </TextComponent>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default class TaskDetails extends Component {
  state = { pickerVisible: false, time: "15 mins" };
  render() {
    let { navigation } = this.props;
    const { height: heightOfDeviceScreen } = Dimensions.get("window");
    let { pickerVisible, time } = this.state;
    return (
      <View>
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
          <View style={{ margin: 5 }}>
            <TextComponent>Title</TextComponent>
            <TextComponent textStyle={{ color: "black" }}>
              This is the title
            </TextComponent>
          </View>
          <View style={{ margin: 5 }}>
            <TextComponent>By</TextComponent>
            <TextComponent textStyle={{ color: "black" }}>
              Someone
            </TextComponent>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <View style={{ margin: 5 }}>
              <TextComponent>Due date</TextComponent>
              <TextComponent textStyle={{ color: "black" }}>
                {`16 SEP | 16:15`}
              </TextComponent>
            </View>
            <View>
              <TextComponent>Reminder</TextComponent>
              <TouchableOpacity
                onPress={() => this.setState({ pickerVisible: true })}
              >
                <TextComponent>{time}</TextComponent>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ margin: 5 }}>
            <TextComponent>Description</TextComponent>
            <TextComponent textStyle={{ color: "black" }}>
              Lorem ipsum dolor sit amet, usu ut clita tempor, vis viderer
              vocibus recusabo no. An nam vide convenire. Magna disputationi ex
              sed, euismod erroribus concludaturque ei nec. Vel ei sale omittam
              gubergren, laudem tractatos pri an. Sumo diam eam ea, at mel
              soleat reprimique. No vix wisi homero, no modus graeco adolescens
              pro. Eius reque gubergren in has, ad sed alia abhorreant
              referrentur. Tota appellantur quo no. Pro ad solum gloriatur. Nec
              ad justo mediocritatem.
            </TextComponent>
          </View>
          <HoursPicker
            isPickerVisible={pickerVisible}
            onVisibilityChange={pickerVisible =>
              this.setState({ pickerVisible })
            }
            initialTime={time}
            onSelect={value => {
              this.setState({ time: value.text }, () =>
                console.log(this.state)
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
