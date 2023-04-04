import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "../constants/color";

const ConfirmButton = ({ children, onPress, selected, disabled }) => {
  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
        disabled={disabled}
      >
        <View style={[styles.button, selected]}>
          <Text style={[styles.buttonText, selected]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  container: {
    marginLeft: 4,
  },
  pressed: {
    opacity: 0.75,
  },

  disabled: {
    opacity: 0.3,
  },

  button: {
    width: 65,
    height: 25,
    borderRadius: 16,
    backgroundColor: GlobalColors.colors.primary500,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  buttonText: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    color: GlobalColors.colors.white500,
    fontSize: 13,
    textAlign: "center",
  },

  selectedText: {
    color: GlobalColors.colors.primary500,
  },
});
