import React, { Component } from "react";
import {
  Text,
  ListView,
  FlatList,
  View,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  ToastAndroid
} from "react-native";
import PropTypes from "prop-types";
import { ACCENT_COLOR_1 } from "./Constants";

const { width } = Dimensions.get("window");
const ACTION_BLOCK_WIDTH = width / 4;

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
    width
  },
  actionBlock: {
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  actionIcon: {
    margin: 10,
    width: 25,
    height: 25,
    tintColor: "white"
  }
});

class SwipeListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0),
      exitAnim: new Animated.Value(0),
      isRight: false,
      scrollPosition: 0
    };
  }

  animateScroll = e => {
    const threshold = ACTION_BLOCK_WIDTH;
    const errorFactor = 5;
    let x = e.nativeEvent.contentOffset.x;
    this.rightSwiped = false;
    this.leftSwiped = false;
    this.setState({ scrollPosition: Math.abs(x) });
    if (x > 0) {
      //console.log("leftSwiping");

      this.leftSwiped = false;
      if (x > threshold) {
        //console.log("leftSwiped");

        this.leftSwiped = true;
      }
    }
    if (x < 0) {
      //console.log("rightSwiping");
      this.rightSwiped = false;
      if (x > threshold) {
        //console.log("rightSwiped");

        this.rightSwiped = true;
      }
    }
  };

  takeAction = () => {
    if (this.rightSwiped) {
      this.setState({ isRight: true }, () =>
        Animated.timing(this.state.anim, {
          toValue: 1,
          duration: 500
        }).start(() => {
          this.rightSwiped = false;
          //this.props.onSwipeRight();
          //this.startExitAnimation();
        })
      );
    } else if (this.leftSwiped) {
      this.setState({ isRight: false }, () =>
        Animated.timing(this.state.anim, {
          toValue: 1,
          duration: 500
        }).start(() => {
          this.leftSwiped = false;
          //this.props.onSwipeLeft();
          //this.startExitAnimation();
        })
      );
    } else {
      //this.scrollToInitialPos(true);
    }
  };
  startExitAnimation = () => {
    Animated.timing(this.state.exitAnim, {
      toValue: 1,
      duration: 200
    }).start();
  };
  scrollToInitialPos = animated => {
    if (this.scrollView)
      this.clearId = setTimeout(
        () => this.scrollView.scrollTo({ x: ACTION_BLOCK_WIDTH, animated }),
        0
      );
  };
  scrollToEnd = () => {
    if (this.scrollView)
      this.clearId = setTimeout(
        () => this.scrollView.scrollToEnd({ animated: true }),
        0
      );
  };
  componentDidMount() {
    //this.scrollToInitialPos(false);
  }

  componentWillUnmount() {
    this.clearTimeout(this.clearId);
  }
  render() {
    const { swipeEnabled, children } = this.props;
    let { anim, exitAnim, scrollPosition, isRight } = this.state;
    let scrollWidth = 0;
    scrollWidth = isRight ? -width : width;
    const translate = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, scrollWidth]
    });
    const actionWidth = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width]
    });
    const ActionColor = isRight ? "rgb(123, 204, 40)" : ACCENT_COLOR_1;
    const backgroundColor = anim.interpolate({
      inputRange: [0, 1],
      outputRange: ["white", ActionColor]
    });

    const contentHeight = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [ACTION_BLOCK_WIDTH, width]
    });

    // anim.addListener(value => {
    //   if (isRight) this.scrollToEnd();
    // });
    return (
      <Animated.ScrollView
        horizontal={true}
        directionalLockEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={this.animateScroll}
        scrollEventThrottle={16}
        scrollEnabled={swipeEnabled}
        onMomentumScrollBegin={this.takeAction}
        style={[{ flex: 1, backgroundColor }, { ...this.props.style }]}
        ref={ref => {
          if (ref) this.scrollView = ref._component;
        }}
      >
        <Animated.View style={[{ flexDirection: "row" }]}>
          <Animated.View
            style={[
              styles.actionBlock,
              {
                width: scrollPosition
              }
            ]}
          >
            <Image
              style={styles.actionIcon}
              source={require("./Resources/accept.png")}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.itemContainer
              //  { transform: [{ translateX: translate }] }
            ]}
          >
            {children}
          </Animated.View>
          <Animated.View
            style={[
              styles.actionBlock,
              {
                width: scrollPosition
              }
            ]}
          >
            <Image
              style={styles.actionIcon}
              source={require("./Resources/close.png")}
            />
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>
    );
  }
}
SwipeListRow.propTypes = {
  children: PropTypes.node.isRequired,
  onSwipeRight: PropTypes.func.isRequired,
  onSwipeLeft: PropTypes.func.isRequired,
  swipeEnabled: PropTypes.bool.isRequired
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
const Swipe = props => {
  return (
    <ListView
      dataSource={ds.cloneWithRows(dataSource)}
      automaticallyAdjustContentInsets={false}
      directionalLockEnabled={true}
      bounces={false}
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
      keyboardDismissMode={"on-drag"}
      renderRow={rowProps => {
        return (
          <SwipeListRow
            onSwipeRight={() => console.log("right swiped")}
            onSwipeLeft={() => console.log("left swiped")}
            swipeEnabled={true}
          >
            <View>
              <Text>Row</Text>
            </View>
          </SwipeListRow>
        );
      }}
    />
  );
};
export default Swipe;
