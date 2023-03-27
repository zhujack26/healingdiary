import { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, View, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "./../constants/color";

const AddButton = ({ opened, toggleOpened }) => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };
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
      <View style={styles.box}>
        <Pressable
          onPress={() => {
            toggleOpened();
            navigation.navigate("Making");
          }}
        >
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
            <Ionicons
              name="pencil-outline"
              size={24}
              color={GlobalColors.colors.white500}
              style={styles.itemIcon}
            />
          </Animated.View>
        </Pressable>

        <Pressable>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 50],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
            <Ionicons
              name="people-outline"
              size={24}
              color={GlobalColors.colors.white500}
              style={styles.itemIcon}
            />
          </Animated.View>
        </Pressable>
        <Pressable onPress={toggleOpened} style={styles.addButton}>
          <Animated.View
            style={[
              styles.addButtonInner,

              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "45deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <Ionicons
              name="add-outline"
              size={32}
              color={GlobalColors.colors.white500}
            />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },

  box: {
    position: "relative",
    width: 60,
    height: 60,
    marginTop: -15,
  },

  addButton: {
    shadowColor: GlobalColors.colors.black500,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  addButtonInner: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalColors.colors.primary500,
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  item: {
    position: "absolute",
    top: 5,
    left: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalColors.colors.primary500,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
