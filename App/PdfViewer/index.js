import React, { Component } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  View,
  Text
} from "react-native";

import Pdf from "react-native-pdf";
import SimpleTabBar from "../Components/SimpleTabBar";

export default class PdfViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { isError: false };
  }

  render() {
    let { isError } = this.state;
    let { navigation } = this.props;
    let { uri } = navigation.state.params;
    uri = uri ? "http://10.0.2.2:8000/" + uri : undefined;
    console.log(uri);
    let source = {
      uri,
      //  "http://gahp.net/wp-content/uploads/2017/09/sample.pdf"
      cache: true
    };
    //let source = require('./test.pdf');  // ios only
    //let source = {uri:'bundle-assets://test.pdf'};

    //let source = {uri:'file:///sdcard/test.pdf'};
    //let source = {uri:"data:application/pdf;base64,..."};

    return (
      <View style={styles.container}>
        <SimpleTabBar onBackPress={() => navigation.goBack(null)} />
        {uri && !isError ? (
          <Pdf
            source={source}
            onLoadComplete={pageCount => {
              console.log(`total page count: ${pageCount}`);
            }}
            onPageChanged={(page, pageCount) => {
              console.log(`current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
              this.setState({ isError: true });
            }}
            style={styles.pdf}
          />
        ) : (
          <Text>PDF invalid</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width
  }
});
