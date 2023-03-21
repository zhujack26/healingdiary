import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "./../../constants/color";

const GroupInfoImageUpdateButton = ({ handleCloseModalPress }) => {
  return (
    <>
      <View style={styles.buttonContainer}>
        <Text style={styles.updateText}>수정</Text>
      </View>
      <Ionicons
        name="close"
        size={32}
        color={GlobalColors.colors.black500}
        onPress={handleCloseModalPress}
        style={styles.closeIcon}
      />
    </>
  );
};

export default GroupInfoImageUpdateButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    padding: 12,
  },

  updateText: {
    fontFamily: "KoddiUDOnGothic-Bold",
    fontSize: 16,
    textAlign: "center",
  },

  closeIcon: {
    position: "absolute",
    top: -5,
    right: 15,
  },
});
