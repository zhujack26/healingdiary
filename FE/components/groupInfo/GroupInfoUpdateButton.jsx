import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";

const GroupInfoUpdateButton = ({ handleCloseModalPress, navigation }) => {
  const navigateAndCloseModal = () => {
    handleCloseModalPress();
    navigation.navigate("groupInfoUpdate");
  };

  return (
    <>
      <Pressable style={styles.buttonContainer} onPress={navigateAndCloseModal}>
        <Text style={styles.updateText}>수정</Text>
      </Pressable>
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

export default GroupInfoUpdateButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: GlobalColors.colors.gray600,
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
