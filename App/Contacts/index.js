import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList
} from "react-native";
import { Close } from "../Components/Icons";
import SearchBar from "../Components/SearchBar";
import { GRAY, ACCENT_COLOR_1 } from "../Constants";
import BackgroundContainer from "../Components/BackgroundContainer";
import {
  TextComponent,
  TextInputComponent
} from "../Components/TextComponents";
import Contacts from "react-native-contacts";

const WIDTH = Dimensions.get("window").width;

export default class ContactsScreen extends Component {
  constructor() {
    super();
    this.state = { contacts: [], filteredContacts: [] };
  }
  getContacts = () => {
    Contacts.getAll((err, contacts) => {
      if (err === "denied") {
        console.log(err);
      } else {
        contacts = contacts.map((contact, index) => {
          let { recordID, givenName, familyName, phoneNumbers } = contact;
          return {
            id: recordID,
            name: familyName ? givenName + " " + familyName : givenName,
            number: phoneNumbers[0].number
          };
        });
        contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({ contacts, filteredContacts: contacts });
      }
    });
  };
  componentDidMount() {
    this.getContacts();
  }
  goBackWithContact = contact => {
    const { navigation } = this.props;
    let { onContactSelected } = navigation.state.params;
    navigation.goBack();
    onContactSelected(contact);
  };
  filterContacts = text => {
    text = text.toLowerCase();
    let { contacts } = this.state;
    filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(text)
    );
    this.setState({ filteredContacts });
  };
  render() {
    let { goBack, state } = this.props.navigation;

    const { filteredContacts } = this.state;

    return (
      <BackgroundContainer style={{ flex: 1 }} isTop={true}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: WIDTH
            }}
          >
            <TextComponent
              textStyle={{
                alignSelf: "center",
                fontSize: 26,
                margin: 20,
                textAlign: "center"
              }}
            >
              Contacts
            </TextComponent>
            <TouchableOpacity
              onPress={() => goBack()}
              style={{ margin: 20, position: "absolute", right: 0 }}
            >
              <Close
                size={30}
                style={{ backgroundColor: "transparent" }}
                color={GRAY}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <SearchBar
              onChangeText={text => this.filterContacts(text)}
              onDone={() => console.log("search done")}
            />
            {filteredContacts && filteredContacts.length > 0 ? (
              <FlatList
                keyExtractor={item => item.id}
                data={filteredContacts}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      width: "100%",
                      backgroundColor: "#CED0CE"
                    }}
                  />
                )}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => this.goBackWithContact(item)}
                    style={{ margin: 10, width: WIDTH }}
                  >
                    <TextComponent>{item.name}</TextComponent>
                    <TextComponent>{item.number}</TextComponent>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View>
                <TextComponent>No contacts</TextComponent>
              </View>
            )}
          </View>
        </View>
      </BackgroundContainer>
    );
  }
}
