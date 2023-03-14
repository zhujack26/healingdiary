import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState, useRef } from "react";
import { GlobalColors } from "./../constants/color";

const deviceWidth = Dimensions.get("window").width - 220;

const ProgressBar = ({ time, isPlaying, handleStopPlay, count, setCount }) => {
  const counter = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      countInterval.current = setInterval(
        () => setCount((old) => old + 1),
        1000
      );
      return () => {
        clearInterval(countInterval);
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    load(count);
    if (count >= time) {
      setCount(time);
      handleStopPlay();
      clearInterval(countInterval);
    }
  }, [count]);

  const load = (count) => {
    Animated.timing(counter, {
      toValue: count,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const width = counter.interpolate({
    inputRange: [0, time],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });
  return (
    <View>
      <View style={styles.progressBar}>
        <Animated.View
          style={{
            backgroundColor: GlobalColors.colors.primary500,
            width,
            borderRadius: 6,
          }}
        ></Animated.View>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    height: 8,
    flexDirection: "row",
    width: deviceWidth,
    backgroundColor: GlobalColors.colors.primary400,
    borderColor: GlobalColors.colors.white500,
    borderWidth: 2,
    borderRadius: 6,
  },
});
