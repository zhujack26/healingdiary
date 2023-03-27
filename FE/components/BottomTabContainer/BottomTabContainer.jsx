import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useTabMenu } from "../../context/BottomTabContext";
import { GlobalColors } from "./../../constants/color";

const BottomTabContainer = ({ children }) => {
  const { opened } = useTabMenu();
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);
  return (
    <View style={styles.container}>
      {children}
      {opened && (
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ["transparent", GlobalColors.colors.black500],
              }),
            },
          ]}
        />
      )}
    </View>
  );
};

export default BottomTabContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.2,
  },
});
