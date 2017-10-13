import React, { Component } from "react";
import Swiper from "./Swiper";
import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import RoundButton from "../Components/RoundButton";
import TaskItem from "./TaskItem";
export default class SwipeDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: ["1", "2", "3", "4", "5", "6"],
      swipedAllCards: false,
      swipeDirection: "",
      isSwipingBack: false,
      cardIndex: 0,
      height: Math.round(Dimensions.get("window").height * 0.80633802816)
    };
  }

  renderCard = card => {
    return <TaskItem />;
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false);
        });
      });
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    );
  };

  jumpTo = () => {
    console.log("Card Tapped");
  };

  render() {
    return (
      <View
        style={styles.container}
        onLayout={event => {
          let { y, height } = event.nativeEvent.layout;
          height = height - y;
          this.setState({ height });
        }}
      >
        <Swiper
          ref={swiper => {
            this.swiper = swiper;
          }}
          style={{
            height: this.state.height
          }}
          onSwiped={this.onSwiped}
          onTapCard={this.jumpTo}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          animateOverlayLabelsOpacity
          animateCardOpacity
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "80%",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row"
              }}
            >
              <RoundButton
                size={40}
                padding={15}
                icon={RoundButton.CLOSE}
                onPress={() => {
                  this.swiper.swipeLeft();
                }}
              />
              <RoundButton
                size={40}
                padding={15}
                style={{ backgroundColor: "green" }}
                icon={RoundButton.CHECKMARK}
                onPress={() => {
                  this.swiper.swipeRight();
                }}
              />
            </View>
          </View>
        </Swiper>
      </View>
    );
  }
}
const WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    width: WIDTH,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "powderblue"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent"
  }
});
