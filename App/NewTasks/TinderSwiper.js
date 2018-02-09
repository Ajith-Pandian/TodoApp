import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import clamp from "clamp";
import Dimensions from "Dimensions";

import { Card } from "./TaskItem";
import RoundButton from "../Components/RoundButton";
import { TextComponent } from "../Components/TextComponents";
import { Close } from "../Components/Icons";
import BackgroundContainer from "../Components/BackgroundContainer";
import { GRAY, GREEN } from "../Constants";

// How far the swipe need to go for a yes/ no to fire
var SWIPE_THRESHOLD = 120;
// To get the stack effect the lower card must pick out at the bottom and appear smaller
var NEXT_CARD_POSITION_OFFSET = 10;
var NEXT_CARD_SIZE_OFFSET = 20;

export default class TinderSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      currentPosition: 0,
      currentItemPosition: 0
    };
  }

  componentWillMount() {
    let { pan, currentPosition } = this.state;

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),

      onPanResponderRelease: (e, { vx, vy }) => {
        pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(pan, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.99
          }).start(() => this.onSwipeAnimationEnd(pan.x._value > 0));
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }
  onSwipeAnimationEnd = isRight => {
    let { onSwipeLeft, onSwipeRight } = this.props;
    let { currentPosition } = this.state;
    isRight ? onSwipeRight(currentPosition) : onSwipeLeft(currentPosition);
    this._resetState();
  };

  _resetState = () => {
    this.state.pan.setValue({ x: 0, y: 0 });
    let nextPosition = this.state.currentPosition + 1;
    this.setState({ currentPosition: nextPosition });
  };

  handleButtonPress = isRight => {
    let screenwidth = Dimensions.get("window").width;
    let panlength = screenwidth + 100;
    panlength = isRight ? panlength : -panlength;
    Animated.timing(this.state.pan, {
      toValue: { x: panlength, y: 0 }
    }).start(() => this.onSwipeAnimationEnd(isRight));
  };
  componentWillUnmount() {
    this.props._clearTasks();
  }
  onClose = () => {
    this.props.onClose();
  };
  render() {
    let { pan, currentPosition } = this.state;
    let cards = this.props.newTasks;
    let [translateX, translateY] = [pan.x, pan.y];

    // card 0 animation
    let rotate = pan.x.interpolate({
      inputRange: [-240, 0, 240],
      outputRange: ["-30deg", "0deg", "30deg"]
    });

    let animatedCardStyles = {
      transform: [{ translateX }, { translateY }, { rotate }]
    };

    let yupOpacity = pan.x.interpolate({
      inputRange: [0, SWIPE_THRESHOLD],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    let animatedYupStyles = { opacity: yupOpacity };

    let nopeOpacity = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    let animatedNopeStyles = { opacity: nopeOpacity };

    let card0AnimatedStyles = {
      animatedCardStyles: animatedCardStyles,
      animatedNopeStyles: animatedNopeStyles,
      animatedYupStyles: animatedYupStyles
    };

    // card 1 animation
    let card1BottomTranslation = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      outputRange: [0, -NEXT_CARD_POSITION_OFFSET, 0],
      extrapolate: "clamp"
    });
    let card1SideTranslation = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      outputRange: [0, NEXT_CARD_SIZE_OFFSET, 0],
      extrapolate: "clamp"
    });
    let card1TopTranslation = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      outputRange: [0, NEXT_CARD_POSITION_OFFSET + NEXT_CARD_SIZE_OFFSET, 0],
      extrapolate: "clamp"
    });
    let card1TranslationStyles = {
      top: card1TopTranslation,
      bottom: card1BottomTranslation,
      right: card1SideTranslation,
      left: card1SideTranslation
    };
    let card1AnimatedStyles = {
      animatedCardContainerStyles: card1TranslationStyles
    };

    // card 2 animation
    let card2BottomTranslation = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      outputRange: [
        -NEXT_CARD_POSITION_OFFSET,
        -NEXT_CARD_POSITION_OFFSET * 2,
        -NEXT_CARD_POSITION_OFFSET
      ],
      extrapolate: "clamp"
    });
    let card2SideTranslation = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      outputRange: [
        NEXT_CARD_SIZE_OFFSET,
        NEXT_CARD_SIZE_OFFSET * 2,
        NEXT_CARD_SIZE_OFFSET
      ],
      extrapolate: "clamp"
    });
    let card2TopTranslation = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      outputRange: [
        NEXT_CARD_POSITION_OFFSET + NEXT_CARD_SIZE_OFFSET,
        (NEXT_CARD_POSITION_OFFSET + NEXT_CARD_SIZE_OFFSET) * 2,
        NEXT_CARD_POSITION_OFFSET + NEXT_CARD_SIZE_OFFSET
      ],
      extrapolate: "clamp"
    });
    let card2TranslationStyles = {
      top: card2TopTranslation,
      bottom: card2BottomTranslation,
      right: card2SideTranslation,
      left: card2SideTranslation
    };
    let card2AnimatedStyles = {
      animatedCardContainerStyles: card2TranslationStyles
    };

    let card3AnimatedStyles = {
      animatedCardContainerStyles: {
        top: (NEXT_CARD_POSITION_OFFSET + NEXT_CARD_SIZE_OFFSET) * 2,
        bottom: -NEXT_CARD_POSITION_OFFSET * 2,
        right: NEXT_CARD_SIZE_OFFSET * 2,
        left: NEXT_CARD_SIZE_OFFSET * 2
      }
    };
    const totalTasks = cards.length;
    let task0 = currentPosition <= totalTasks ? cards[currentPosition] : null;
    let task1 =
      currentPosition + 1 <= totalTasks ? cards[currentPosition + 1] : null;
    let task2 =
      currentPosition + 2 <= totalTasks ? cards[currentPosition + 2] : null;
    let task3 =
      currentPosition + 3 <= totalTasks ? cards[currentPosition + 3] : null;

    let { isLoading, isSuccess, isError, newTasks } = this.props;
    return (
      <BackgroundContainer style={styles.bodyContainer} isTop={true}>
        {newTasks && newTasks.length > 0 && task0 ? (
          <View style={styles.responsiveContainer}>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <View style={{ alignItems: "center" }}>
                  <RoundButton
                    size={45}
                    padding={15}
                    icon={RoundButton.CLOSE}
                    onPress={() => this.handleButtonPress(false)}
                  />
                  <TextComponent>Reject</TextComponent>
                </View>
                <View style={{ alignItems: "center" }}>
                  <RoundButton
                    size={45}
                    padding={15}
                    style={{ backgroundColor: GREEN }}
                    icon={RoundButton.CHECKMARK}
                    onPress={() => this.handleButtonPress(true)}
                  />
                  <TextComponent>Accept</TextComponent>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.onClose();
              }}
              style={{ position: "absolute", top: 25, right: 25 }}
            >
              <Close
                size={40}
                style={{ backgroundColor: "transparent" }}
                color={GRAY}
              />
            </TouchableOpacity>
            <View style={{ position: "absolute", left: 0, top: 100, right: 0 }}>
              <TextComponent
                textStyle={{
                  fontSize: 22,
                  textAlign: "left",
                  margin: 20
                }}
              >
                New Tasks!!
              </TextComponent>
              <View
                style={{ width: "100%", height: 0.5, backgroundColor: GRAY }}
              />
            </View>
            <View style={styles.cardsContainer}>
              {task3 ? (
                <Card key={task3.id} task={task3} {...card3AnimatedStyles} />
              ) : null}
              {task2 ? (
                <Card key={task2.id} task={task2} {...card2AnimatedStyles} />
              ) : null}
              {task1 ? (
                <Card key={task1.id} task={task1} {...card1AnimatedStyles} />
              ) : null}
              {task0 ? (
                <Card
                  key={task0.id}
                  task={task0}
                  {...card0AnimatedStyles}
                  panResponder={this._panResponder.panHandlers}
                />
              ) : null}
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TextComponent>
              {isError ? "Error" : isLoading ? "Loading...." : "No New Tasks"}
            </TextComponent>
            <TouchableOpacity
              onPress={() => this.onClose()}
              style={{ position: "absolute", top: 25, right: 25 }}
            >
              <Close
                size={40}
                style={{ backgroundColor: "transparent" }}
                color={GRAY}
              />
            </TouchableOpacity>
          </View>
        )}
      </BackgroundContainer>
    );
  }
}

var styles = StyleSheet.create({
  // main container
  bodyContainer: {
    flex: 1
  },
  // we keep the bottom button sections at height 100
  // the card expands to take up all the rest of the space
  responsiveContainer: {
    flex: 1,
    paddingBottom: 100
  },
  // cards
  cardsContainer: {
    flex: 1
  },
  // buttons
  buttonsContainer: {
    height: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20
  },
  buttonContainer: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 5
  }
});
