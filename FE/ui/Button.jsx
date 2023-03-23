import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "../constants/color";

const Button = ({ children, onPress, selected }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, selected]}>
          <Text style={[styles.buttonText, selected]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    marginLeft: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  button: {
    width: 85,
    height: 30,
    borderRadius: 16,
    backgroundColor: GlobalColors.colors.white500,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  buttonText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.gray500,
    fontSize: 13,
    textAlign: "center",
  },
  selectedText: {
    color: GlobalColors.colors.white500,
  },
});
