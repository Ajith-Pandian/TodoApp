import React, { Component } from "react";
import {
  Text,
  ListView,
  FlatList,
  View,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet
} from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  listViewSection: {
    paddingVertical: 10,
    paddingLeft: 15,
    backgroundColor: "grey"
  },

  textListViewSection: {
    color: "blue",
    fontSize: 16,
    marginLeft: 5
  },
  swipeMessage: {
    position: "absolute",
    top: 0,
    height: 75,
    justifyContent: "center",
    alignItems: "center"
  },
  itemContainer: {
    height: 100,
    width,
    backgroundColor: "powderblue"
  }
});

const WHITE = 0;
const GREEN = 1;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class SwipeListRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: new Animated.Value(WHITE)
    };
  }

  animateScroll = e => {
    const threshold = width / 5;
    let x = e.nativeEvent.contentOffset.x;
    let swiped = null;

    x = x * -1;

    if (x > -50 && this.swiped !== WHITE) {
      swiped = WHITE;
    } else if (x < -50 && x > -threshold && this.swiped !== GREEN) {
      swiped = GREEN;
    }

    if (swiped !== null) {
      this.swiped = swiped;

      Animated.timing(this.state.color, {
        toValue: swiped,
        duration: 200
      }).start();
    }
  };

  takeAction = () => {
    if (this.swiped) {
      Animated.timing(this.state.color, {
        toValue: WHITE,
        duration: 200
      }).start();

      this.props.onSwipe();
    }
  };
  componentDidMount() {
    setTimeout(
      () => this.scrollView.scrollTo({ x: width / 5, animated: false }),
      0
    );
  }
  render() {
    const { swipeEnabled, swipeMessage, children } = this.props;
    const bgColor = this.state.color.interpolate({
      inputRange: [WHITE, GREEN],
      outputRange: ["rgb(255, 255, 255)", "rgb(123, 204, 40)"]
    });

    return (
      <View>
        <Animated.ScrollView
          horizontal={true}
          directionalLockEnabled={true}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          onScroll={this.animateScroll}
          scrollEventThrottle={16}
          scrollEnabled={swipeEnabled}
          onMomentumScrollBegin={this.takeAction}
          style={[{ flex: 1, backgroundColor: bgColor }]}
          ref={ref => {
            this.scrollView = ref._component;
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                styles.itemContainer,
                { width: width / 5, left: -width / 5 - 20 }
              ]}
            >
              <Text>{swipeMessage}</Text>
            </View>
            <View style={styles.itemContainer}>{children}</View>
            <View
              style={[
                styles.itemContainer,
                { width: width / 5, right: -width / 5 - 20 }
              ]}
            >
              <Text>{swipeMessage}</Text>
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}
SwipeListRow.propTypes = {
  children: React.PropTypes.node.isRequired,
  onSwipe: React.PropTypes.func.isRequired,
  swipeEnabled: React.PropTypes.bool.isRequired,
  swipeMessage: React.PropTypes.string.isRequired
};
let dataSource = [
  { id: 1, text: "AA" },
  { id: 2, text: "AA" },
  { id: 3, text: "AA" },
  { id: 4, text: "AA" },
  { id: 5, text: "AA" },
  { id: 6, text: "AA" }
];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
dataSource = ds.cloneWithRows(dataSource);
const Swipe = () => {
  return (
    <ListView
      dataSource={dataSource}
      automaticallyAdjustContentInsets={false}
      directionalLockEnabled
      keyboardShouldPersistTaps="never"
      keyboardDismissMode={"on-drag"}
      renderRow={item => (
        <SwipeListRow
          key={item.id}
          swipeMessage={"Delete Item"}
          onSwipe={() => console.log("right swiped")}
          swipeEnabled={true}
        >
          <View style={{ width }}>
            <Text>Row</Text>
          </View>
        </SwipeListRow>
      )}
    />
  );
};
export default Swipe;
