import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList
} from "react-native";
import { Close } from "../Components/Icons";
import SearchBar from "../Components/SearchBar";
import LoadingItem from "../Components/LoadingItem";

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
          console.log(contact);
          let {
            recordID,
            givenName,
            familyName,
            phoneNumbers,
            thumbnailPath
          } = contact;
          return {
            id: recordID,
            name: familyName
              ? givenName + " " + familyName
              : givenName || "No Name",
            number:
              phoneNumbers && phoneNumbers[0]
                ? phoneNumbers[0].number.replace(/ |-|\(|\)/g, "")
                : undefined,
            photo: thumbnailPath
          };
        });
        contacts.sort(
          ({ name: aName }, { name: bName }) =>
            aName && bName ? aName.localeCompare(bName) : true
        );
        this.setState({ contacts, filteredContacts: contacts });
      }
    });
  };
  componentDidMount() {
    Contacts.checkPermission((err, permission) => {
      if (permission === "undefined") {
        Contacts.requestPermission((err, permission) => {
          // ...
        });
      }
      if (permission === "authorized") {
        this.getContacts();
      }
      if (permission === "denied") {
        // x.x
      }
    });
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
                    style={{
                      margin: 10,
                      width: WIDTH,
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    {item.photo ? (
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          margin: 5
                        }}
                        source={{
                          uri: item.photo
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          margin: 5,
                          backgroundColor: "black"
                        }}
                      />
                    )}
                    <View style={{ marginLeft: 10 }}>
                      <TextComponent>{item.name}</TextComponent>
                      <TextComponent>{item.number}</TextComponent>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {/*<TextComponent>No contacts</TextComponent>*/}
                <LoadingItem />
              </View>
            )}
          </View>
        </View>
      </BackgroundContainer>
    );
  }
}
